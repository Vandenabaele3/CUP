// server/routes/games.ts
import { Router } from "express";
import { pool } from "../db";

const router = Router();

/* =========================================================================
 * GET /api/games
 * Query:
 *  - page     (default 1)
 *  - pageSize (default 20, max 100)
 *  - q        (search in title)
 *  - sort     (title|difficulty|length) default "title"
 *  - dir      (asc|desc) default "asc"
 * =========================================================================*/
router.get("/", async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const pageSizeRaw = Math.min(
    Math.max(parseInt(String(req.query.pageSize ?? "20"), 10) || 20, 1),
    100
  );
  const q = (String(req.query.q ?? "") || "").trim();

  const sort = String(req.query.sort ?? "title").toLowerCase();
  const dir = String(req.query.dir ?? "asc").toLowerCase();

  const sortMap: Record<string, string> = {
    title: `"title"`,
    difficulty: `"difficulty"`,
    length: `"length"`,
  };
  const sortCol = sortMap[sort] ?? `"title"`;
  const sortDir = dir === "desc" ? "DESC" : "ASC";

  const offset = (page - 1) * pageSizeRaw;

  const whereClauses: string[] = [];
  const params: any[] = [];
  if (q) {
    params.push(`%${q}%`);
    whereClauses.push(`"title" ILIKE $${params.length}`);
  }
  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

  try {
    // total count
    const countSql = `SELECT COUNT(*)::int AS count FROM public."Game" ${whereSql}`;
    const { rows: countRows } = await pool.query<{ count: number }>(countSql, params);
    const total = countRows[0]?.count ?? 0;

    // page of items
    const listParams = [...params, pageSizeRaw, offset];
    const listSql = `
      SELECT
        "game_id",
        "title",
        "difficulty",
        "length",
        "obtainlink"
      FROM public."Game"
      ${whereSql}
      ORDER BY ${sortCol} ${sortDir}, "game_id" ASC
      LIMIT $${listParams.length - 1} OFFSET $${listParams.length}
    `;
    const { rows } = await pool.query(listSql, listParams);

    res.json({
      page,
      pageSize: pageSizeRaw,
      total,
      items: rows.map((r: any) => ({
        id: r.game_id,
        title: r.title,
        difficulty: r.difficulty != null ? Number(r.difficulty) : null,
        length: r.length != null ? Number(r.length) : null,
        obtainLink: r.obtainlink ?? null,
      })),
    });
  } catch (e) {
    console.error("[/api/games] DB error:", e);
    res.status(500).json({ error: "Failed to load games" });
  }
});

/* =========================================================================
 * GET /api/games/recent?limit=5[&view=ExactViewName]
 * Laatste N afgeronde games (Speler, Titel, Datum, Score).
 *
 * We gebruiken een bestaande *completed games*-view in schema public.
 * Kolommen die we autodetecteren:
 *   - username       (verplicht)
 *   - user_id        (optioneel ? null)
 *   - title|game_title (verplicht)
 *   - completed_at|completed_date|completion_date (verplicht)
 *   - score|value    (optioneel ? null)
 * =========================================================================*/
router.get("/recent", async (req, res) => {
  const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? "5"), 10) || 5, 1), 50);
  const preferredView = (req.query.view ? String(req.query.view) : "").trim();

  // Jouw views eerst; dan generieke fallbacks
  const CANDIDATES = preferredView
    ? [preferredView]
    : [
        "AllCompletedGames",
        "completedgames",
        "AllCompletedEndings",
        // fallbacks
        "LeaderboardCompletedGames",
        "CompletedGames",
        "CompletedGamesView",
        "GameCompletions",
      ];

  try {
    // 1) Vind eerste bestaande view in public
    let found: { schema: string; name: string } | null = null;
    for (const cand of CANDIDATES) {
      const { rows } = await pool.query(
        `SELECT table_schema, table_name
           FROM information_schema.views
          WHERE table_schema = 'public' AND table_name = $1`,
        [cand]
      );
      if (rows.length) {
        found = { schema: rows[0].table_schema, name: rows[0].table_name };
        break;
      }
    }
    if (!found) {
      return res.status(400).json({ error: "completed_view_not_found", tried: CANDIDATES });
    }

    const fqView = `"${found.schema}"."${found.name}"`;

    // 2) Lees kolommen en kies aliassen
    const { rows: cols } = await pool.query(
      `SELECT column_name FROM information_schema.columns
         WHERE table_schema = $1 AND table_name = $2`,
      [found.schema, found.name]
    );
    const col = new Set<string>(cols.map((c: any) => c.column_name));

    // verplicht: username
    if (!col.has("username")) {
      return res.status(400).json({
        error: "completed_view_missing_columns",
        view: found,
        message: "username column is required",
        available: Array.from(col),
      });
    }

    // user_id (optioneel)
    const userIdCol = col.has("user_id") ? `"user_id"` : null;

    // title
    const titleCol =
      col.has("title") ? `"title"` :
      col.has("game_title") ? `"game_title"` : null;

    // completed date
    const completedCol =
      col.has("completed_at") ? `"completed_at"` :
      col.has("completed_date") ? `"completed_date"` :
      col.has("completion_date") ? `"completion_date"` : null;

    if (!titleCol || !completedCol) {
      return res.status(400).json({
        error: "completed_view_missing_columns",
        view: found,
        requiredAnyOf: {
          title_or_game_title: true,
          completed_at_or_completed_date_or_completion_date: true,
        },
        available: Array.from(col),
      });
    }

    // score (optioneel)
    const scoreCol =
      col.has("score") ? `"score"` :
      col.has("value") ? `"value"` : null;

    // 3) Query met veilige fallbacks naar NULL
    const sql = `
      SELECT
        ${userIdCol ?? "NULL"}           AS user_id,
        "username"                       AS username,
        ${titleCol}                      AS game_title,
        (${completedCol}::date)          AS completed_date,
        ${scoreCol ?? "NULL"}            AS score
      FROM ${fqView}
      WHERE ${completedCol} IS NOT NULL
      ORDER BY ${completedCol} DESC, ${titleCol} ASC
      LIMIT $1
    `;
    const { rows: items } = await pool.query(sql, [limit]);

    res.json({
      items: items.map((r: any) => ({
        userId: r.user_id != null ? Number(r.user_id) : null,
        username: r.username,
        gameTitle: r.game_title,
        completedDate: r.completed_date, // 'YYYY-MM-DD'
        score: r.score != null ? Number(r.score) : null,
      })),
    });
  } catch (e) {
    console.error("[/api/games/recent] DB error:", e);
    res.status(500).json({ error: "Failed to load recent completed games" });
  }
});

export default router;
