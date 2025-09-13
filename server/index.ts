// server/index.ts
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// gedeelde DB-pool
import { pool } from './db';

// routers
import leaderboardRouter from './routes/leaderboard';
import gamesRouter from './routes/games';

// ------------------------------------------------------------------
// App & middleware
// ------------------------------------------------------------------
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ------------------------------------------------------------------
// Health
// ------------------------------------------------------------------
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const r = await pool.query('SELECT 1 AS ok');
    res.json({ ok: true, db: r.rows?.[0]?.ok === 1 });
  } catch {
    res.status(500).json({ ok: false, error: 'db_unreachable' });
  }
});

// ------------------------------------------------------------------
// API routes
// ------------------------------------------------------------------
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/games', gamesRouter);

// ------------------------------------------------------------------
// Static files (Vite build) + SPA fallback
// Let op: process.cwd() verwacht dat je app start vanuit projectroot
// ------------------------------------------------------------------
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/')) return next();
  if (req.method !== 'GET') return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

// ------------------------------------------------------------------
// Fallbacks
// ------------------------------------------------------------------
app.use((_req, res) => res.status(404).json({ error: 'not_found' }));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'internal_error' });
});

// ------------------------------------------------------------------
// Start
// ------------------------------------------------------------------
const PORT = Number(process.env.PORT || 3001);
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Netjes afsluiten
const shutdown = async () => {
  try {
    await pool.end();
  } finally {
    server.close(() => process.exit(0));
  }
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
