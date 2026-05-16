import { Router } from 'express';
import { prisma } from '../database/client';

const router = Router();

router.get('/health', async (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/ready', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ready', database: 'connected', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'not ready', database: 'disconnected', timestamp: new Date().toISOString() });
  }
});

export default router;
