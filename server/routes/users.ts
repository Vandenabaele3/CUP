// server/routes/users.ts
import { Router } from "express";
import { pool } from "../db";

const router = Router();

/**
 * GET /api/users/:id
 * Retourneert basisprofielinfo voor een user.
 * NB: sommige kolommen bestaan mogelijk (nog) niet in jouw DB.
 * We aliasen ze naar NULL zodat de query altijd werkt.
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT
        u."user_id",
        u."username",
        NULL::text  AS email,
        NULL::text  AS name,
        NULL::text  AS "lastName",
        NULL::text  AS profilepicturelink,
        NULL::int   AS age,
        NULL::text  AS gender,
        NULL::text  AS location,
        NULL::text  AS address,
        NULL::text  AS phone,
        NULL::text  AS joined
      FROM public."Users" u
      WHERE u."user_id" = $1
      LIMIT 1
      `,
      [id]
    );

    const row = rows[0];
    if (!row) return res.status(404).json({ error: "User not found" });

    res.json({
      userId: row.user_id,
      username: row.username,
      email: row.email,
      name: row.name,
      lastName: row.lastName,
      profilepicturelink: row.profilepicturelink,
      age: row.age,
      gender: row.gender,
      location: row.location,
      address: row.address,
      phone: row.phone,
      joined: row.joined,
    });
  } catch (e) {
    console.error("[/api/users/:id] DB error:", e);
    res.status(500).json({ error: "Failed to load user" });
  }
});

export default router;
