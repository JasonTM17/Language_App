import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Progress Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `progress_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Progress Tester' });
    token = res.body.token;
  });

  describe('GET /api/progress/dashboard', () => {
    it('should return dashboard stats', async () => {
      const res = await request(app)
        .get('/api/progress/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.stats).toBeDefined();
      expect(res.body.stats.xp).toBeDefined();
      expect(res.body.stats.level).toBeDefined();
      expect(res.body.stats.streak).toBeDefined();
      expect(res.body.stats.completedLessons).toBeDefined();
      expect(res.body.stats.quizAccuracy).toBeDefined();
      expect(res.body.enrollments).toBeInstanceOf(Array);
      expect(res.body.recentProgress).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/progress/dashboard');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/progress/streak', () => {
    it('should return streak info', async () => {
      const res = await request(app)
        .get('/api/progress/streak')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.streak).toBeDefined();
      expect(typeof res.body.streak).toBe('number');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/progress/streak');
      expect(res.status).toBe(401);
    });
  });
});
