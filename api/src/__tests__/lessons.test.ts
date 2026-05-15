import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Lessons Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `lessons_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Lesson Tester' });
    token = res.body.token;
  });

  describe('GET /api/lessons', () => {
    it('should list lessons', async () => {
      const res = await request(app)
        .get('/api/lessons')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.lessons).toBeInstanceOf(Array);
    });

    it('should filter by language code', async () => {
      const res = await request(app)
        .get('/api/lessons?languageCode=en')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.lessons).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/lessons');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/lessons/:id', () => {
    it('should return 404 for non-existent lesson', async () => {
      const res = await request(app)
        .get('/api/lessons/nonexistent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/lessons/:id/complete', () => {
    it('should return 404 for non-existent lesson', async () => {
      const res = await request(app)
        .post('/api/lessons/nonexistent-id/complete')
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 85, timeSpent: 120 });

      expect(res.status).toBe(404);
    });

    it('should reject invalid score', async () => {
      const res = await request(app)
        .post('/api/lessons/some-id/complete')
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 150 });

      expect(res.status).toBe(400);
    });
  });
});
