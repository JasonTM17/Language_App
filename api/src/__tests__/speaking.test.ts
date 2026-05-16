import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Speaking Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `speaking_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Speaking Tester' });
    token = res.body.token;
  });

  describe('GET /api/speaking', () => {
    it('should return paginated exercises for default language (en)', async () => {
      const res = await request(app)
        .get('/api/speaking')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body).toHaveProperty('language');
    });

    it('should filter exercises by language with ?lang=ja', async () => {
      const res = await request(app)
        .get('/api/speaking?lang=ja')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.language).toBe('ja');
      res.body.data.forEach((ex: any) => {
        expect(ex.language).toBe('ja');
      });
    });

    it('should return empty data for unknown language', async () => {
      const res = await request(app)
        .get('/api/speaking?lang=xx')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBe(0);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/speaking');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/speaking/:id', () => {
    it('should return a specific exercise by id', async () => {
      const res = await request(app)
        .get('/api/speaking/en-s1')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('exercise');
      expect(res.body.exercise.id).toBe('en-s1');
      expect(res.body.exercise).toHaveProperty('prompt');
    });

    it('should return 404 for non-existent exercise id', async () => {
      const res = await request(app)
        .get('/api/speaking/nonexistent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/speaking/en-s1');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/speaking/submit', () => {
    it('should return a score result for valid submission', async () => {
      const res = await request(app)
        .post('/api/speaking/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'en-s1', audioScore: 80, duration: 5 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result).toHaveProperty('score');
      expect(res.body.result).toHaveProperty('passed');
      expect(res.body.result).toHaveProperty('xpEarned');
    });

    it('should return passed=true when score >= 60', async () => {
      const res = await request(app)
        .post('/api/speaking/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'en-s1', audioScore: 75 });

      expect(res.status).toBe(200);
      expect(res.body.result.passed).toBe(true);
      expect(res.body.result.score).toBe(75);
    });

    it('should return passed=false when score < 60', async () => {
      const res = await request(app)
        .post('/api/speaking/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'en-s1', audioScore: 40 });

      expect(res.status).toBe(200);
      expect(res.body.result.passed).toBe(false);
    });

    it('should return 404 for non-existent exercise', async () => {
      const res = await request(app)
        .post('/api/speaking/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'nonexistent-id', audioScore: 80 });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when exerciseId is missing', async () => {
      const res = await request(app)
        .post('/api/speaking/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ audioScore: 80 });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
