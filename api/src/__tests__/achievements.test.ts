import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

// Achievements route does not use authenticate middleware — it reads req.user?.id
// so requests without a token still return 200 (with unlocked: false for all items)
describe('Achievements Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `achievements_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Achievement Tester' });
    token = res.body.token;
  });

  describe('GET /api/achievements', () => {
    it('should return paginated achievements list', async () => {
      const res = await request(app)
        .get('/api/achievements')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should include pagination metadata', async () => {
      const res = await request(app)
        .get('/api/achievements')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('total');
    });

    it('should include user progress (unlocked status) on each achievement', async () => {
      const res = await request(app)
        .get('/api/achievements')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      res.body.data.forEach((achievement: any) => {
        expect(achievement).toHaveProperty('unlocked');
        expect(typeof achievement.unlocked).toBe('boolean');
      });
    });

    it('should return achievements with valid category values', async () => {
      const validCategories = ['streak', 'lessons', 'vocabulary', 'quiz', 'social', 'special', 'xp', 'level'];
      const res = await request(app)
        .get('/api/achievements')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      res.body.data.forEach((achievement: any) => {
        expect(achievement).toHaveProperty('category');
        expect(validCategories).toContain(achievement.category);
      });
    });

    it('should return achievements even without authentication token', async () => {
      const res = await request(app).get('/api/achievements');
      // Route does not require auth — returns achievements with unlocked: false
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /api/achievements/me', () => {
    it('should return 401 without authentication', async () => {
      const res = await request(app).get('/api/achievements/me');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
    });

    it('should return paginated user achievements when authenticated', async () => {
      const res = await request(app)
        .get('/api/achievements/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body).toHaveProperty('pagination');
    });
  });
});
