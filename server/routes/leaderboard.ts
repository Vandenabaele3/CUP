// server/routes/leaderboard.ts
import { Router } from "express";
import { pool } from "../db";

const router = Router();

interface LeaderRow {
  user_id: number;
  username: string;
  score: number;
}

/**
 * GET /api/leaderboard?scope=total|season|titles
 * - total  -> public."LeaderboardScores"
 * - season -> public."LeaderboardCurrentSeason"
 * - titles -> public."LeaderboardTitles" (score = number of titles, includes users with 0)
 */
router.get("/", async (req, res) => {
  const scope = String(req.query.scope ?? "total").toLowerCase();

  let sql: string;

  if (scope === "season") {
    sql = `
      SELECT user_id, username, score::bigint AS score
      FROM public."LeaderboardCurrentSeason"
    `;
  } else if (scope === "titles") {
    sql = `
      SELECT u."user_id",
             u."username",
             COALESCE(t.titles, 0)::bigint AS score
      FROM public."Users" u
      LEFT JOIN public."LeaderboardTitles" t
        ON t.user_id = u."user_id"
      WHERE COALESCE(u."Active", true) = true
    `;
  } else {
    sql = `
      SELECT user_id, username, score::bigint AS score
      FROM public."LeaderboardScores"
    `;
  }

  try {
    const { rows } = await pool.query<LeaderRow>(`${sql} ORDER BY score DESC, username ASC LIMIT 100`);

    res.json({
      items: rows.map((r: LeaderRow, i: number) => ({
        rank: i + 1,
        id: r.user_id,
        name: r.username,
        avatarUrl: null,
        score: Number(r.score),
      })),
    });
  } catch (e) {
    console.error("[/api/leaderboard] DB error:", e);
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

export default router;
