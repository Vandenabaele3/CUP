// server/routes/games.ts
import { Router } from "express";
import { pool } from "../db";

const router = Router();

/**
 * GET /api/games
 * Query params:
 *  - page (default 1)
 *  - pageSize (default 20, max 100)
 *  - q (search in title)
 *  - sort (title|difficulty|length) default "title"
 *  - dir (asc|desc) default "asc"
 */
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
        difficulty: Number(r.difficulty),
        length: Number(r.length),
        obtainLink: r.obtainlink ?? null,
      })),
    });
  } catch (e) {
    console.error("[/api/games] DB error:", e);
    res.status(500).json({ error: "Failed to load games" });
  }
});

export default router;
