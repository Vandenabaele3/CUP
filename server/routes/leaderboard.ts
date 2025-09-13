// server/routes/leaderboard.ts
import { Router } from "express";
import { pool } from "../db";

const router = Router();

/**
 * GET /api/leaderboard
 * ?scope = scores | season | titles
 *
 * Response (scores/season):
 *   { items: [{ rank, id, name, score, gamesCount?, seasonYear?, avatarUrl }] }
 *
 * Response (titles):
 *   { items: [{ rank, id, name, score, avatarUrl }] }  // score = aantal titels
 */
router.get("/", async (req, res) => {
  try {
    const scope = String(req.query.scope ?? "scores").toLowerCase();

    if (scope === "titles") {
      // Winnaars per seizoen (ties tellen mee)
      const sql = `
        WITH ranked AS (
          SELECT
            user_id,
            username,
            season_year,
            score,
            RANK() OVER (PARTITION BY season_year ORDER BY score DESC) AS r
          FROM "LeaderboardSeasonScores"
        )
        SELECT user_id AS id, username AS name, COUNT(*)::int AS titles
        FROM ranked
        WHERE r = 1
        GROUP BY user_id, username
        ORDER BY titles DESC, name ASC
      `;
      const { rows } = await pool.query(sql);
      const items = rows.map((r: any, i: number) => ({
        rank: i + 1,
        id: Number(r.id),
        name: r.name,
        score: Number(r.titles), // score = titels
        avatarUrl: null,
      }));
      return res.json({ items });
    }

    if (scope === "season") {
      // Alleen het huidige seizoen (sept–aug)
      const sql = `
        WITH cur AS (
          SELECT (EXTRACT(year FROM CURRENT_DATE)::int +
                  CASE WHEN EXTRACT(month FROM CURRENT_DATE) >= 9 THEN 0 ELSE -1 END) AS y
        )
        SELECT s.user_id, s.username, s.season_year, s.score, s.games_count
        FROM "LeaderboardSeasonScores" s
        JOIN cur c ON s.season_year = c.y
        ORDER BY s.score DESC, s.username ASC
      `;
      const { rows } = await pool.query(sql);
      const items = rows.map((r: any, i: number) => ({
        rank: i + 1,
        id: Number(r.user_id),
        name: r.username,
        score: Number(r.score),
        gamesCount: Number(r.games_count),
        seasonYear: Number(r.season_year),
        avatarUrl: null,
      }));
      return res.json({ items });
    }

    // Default: totaalscore
    const { rows } = await pool.query(`
      SELECT user_id, username, score, games_count
      FROM "LeaderboardScores"
      ORDER BY score DESC, username ASC
    `);
    const items = rows.map((r: any, i: number) => ({
      rank: i + 1,
      id: Number(r.user_id),
      name: r.username,
      score: Number(r.score),
      gamesCount: Number(r.games_count),
      avatarUrl: null,
    }));
    return res.json({ items });
  } catch (e) {
    console.error("[/api/leaderboard] DB error:", e);
    return res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

/**
 * GET /api/leaderboard/game-points?days=NN
 * Per-game punten voor de grafiek.
 * Vorm: { items: [{ userId, username, date:'YYYY-MM-DD', value }] }
 * Default window = 3650 dagen (~10 jaar), max 3650.
 */
router.get("/game-points", async (req, res) => {
  try {
    const raw = req.query.days ? parseInt(String(req.query.days), 10) : NaN;
    const days = Number.isFinite(raw) ? Math.max(1, Math.min(raw, 3650)) : 3650;

    const sql = `
      SELECT user_id, username, game_date::date AS d, value
      FROM "LeaderboardGamePoints"
      WHERE game_date >= (CURRENT_DATE - INTERVAL '${days} days')
      ORDER BY d ASC, user_id ASC
    `;
    const { rows } = await pool.query(sql);

    const items = rows.map((r: any) => {
      const dateStr =
        r.d instanceof Date ? r.d.toISOString().slice(0, 10) : String(r.d).slice(0, 10);
      return {
        userId: Number(r.user_id),
        username: r.username,
        date: dateStr,
        value: Number(r.value),
      };
    });

    res.json({ items });
  } catch (e) {
    console.error("[/api/leaderboard/game-points] DB error:", e);
    res.status(500).json({ error: "Failed to load game points" });
  }
});

export default router;
