import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Vocabulary Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `vocab_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Vocab Tester' });
    token = res.body.token;
  });

  describe('GET /api/vocabulary', () => {
    it('should return paginated vocabulary list', async () => {
      const res = await request(app)
        .get('/api/vocabulary')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should return pagination metadata with correct shape', async () => {
      const res = await request(app)
        .get('/api/vocabulary')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('limit');
      expect(res.body.pagination).toHaveProperty('total');
      expect(res.body.pagination).toHaveProperty('totalPages');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/vocabulary');
      expect(res.status).toBe(401);
    });

    it('should filter due cards when ?due=true', async () => {
      const res = await request(app)
        .get('/api/vocabulary?due=true')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('due');
      expect(typeof res.body.due).toBe('number');
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/vocabulary/:id/review', () => {
    it('should return 404 for non-existent vocabulary id', async () => {
      const res = await request(app)
        .post('/api/vocabulary/nonexistent-vocab-id/review')
        .set('Authorization', `Bearer ${token}`)
        .send({ quality: 4 });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for invalid quality value (out of range)', async () => {
      const res = await request(app)
        .post('/api/vocabulary/some-id/review')
        .set('Authorization', `Bearer ${token}`)
        .send({ quality: 10 });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for invalid body type', async () => {
      const res = await request(app)
        .post('/api/vocabulary/some-id/review')
        .set('Authorization', `Bearer ${token}`)
        .send({ quality: 'not-a-number' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/vocabulary/some-id/review')
        .send({ quality: 4 });

      expect(res.status).toBe(401);
    });
  });
});
