// server/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import leaderboardRouter from "./routes/leaderboard";
import gamesRouter from "./routes/games";
import usersRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/games", gamesRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
