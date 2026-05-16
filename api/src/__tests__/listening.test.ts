import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Listening Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `listening_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Listening Tester' });
    token = res.body.token;
  });

  describe('GET /api/listening', () => {
    it('should return paginated exercises without answers', async () => {
      const res = await request(app)
        .get('/api/listening')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBeInstanceOf(Array);
      // Answers must be stripped from list response
      res.body.data.forEach((ex: any) => {
        expect(ex).not.toHaveProperty('answer');
        expect(ex).not.toHaveProperty('transcript');
      });
    });

    it('should filter exercises by type with ?type=dictation', async () => {
      const res = await request(app)
        .get('/api/listening?type=dictation')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      res.body.data.forEach((ex: any) => {
        expect(ex.type).toBe('dictation');
      });
    });

    it('should filter by language with ?lang=ja', async () => {
      const res = await request(app)
        .get('/api/listening?lang=ja')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.language).toBe('ja');
      expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/listening');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/listening/:id', () => {
    it('should return exercise without answer field', async () => {
      const res = await request(app)
        .get('/api/listening/en-l1')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('exercise');
      expect(res.body.exercise).not.toHaveProperty('answer');
      expect(res.body.exercise.id).toBe('en-l1');
    });

    it('should return 404 for non-existent exercise id', async () => {
      const res = await request(app)
        .get('/api/listening/nonexistent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/listening/en-l1');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/listening/submit', () => {
    it('should return correct=true for the right answer', async () => {
      const res = await request(app)
        .post('/api/listening/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'en-l1', answer: 'Hello, how are you?' });

      expect(res.status).toBe(200);
      expect(res.body.correct).toBe(true);
      expect(res.body).toHaveProperty('xpEarned');
      expect(res.body).toHaveProperty('correctAnswer');
    });

    it('should return correct=false for a wrong answer', async () => {
      const res = await request(app)
        .post('/api/listening/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'en-l1', answer: 'Hello, who are you?' });

      expect(res.status).toBe(200);
      expect(res.body.correct).toBe(false);
      expect(res.body).toHaveProperty('correctAnswer');
      expect(res.body).toHaveProperty('feedback');
    });

    it('should return 404 for non-existent exercise', async () => {
      const res = await request(app)
        .post('/api/listening/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'nonexistent-id', answer: 'anything' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when answer is missing', async () => {
      const res = await request(app)
        .post('/api/listening/submit')
        .set('Authorization', `Bearer ${token}`)
        .send({ exerciseId: 'en-l1' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
