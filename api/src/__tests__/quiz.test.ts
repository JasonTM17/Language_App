import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Quiz Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `quiz_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Quiz Tester' });
    token = res.body.token;
  });

  describe('GET /api/quiz/lesson/:lessonId', () => {
    it('should return quizzes for a lesson', async () => {
      const res = await request(app)
        .get('/api/quiz/lesson/some-lesson-id')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.quizzes).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/quiz/lesson/some-id');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/quiz/:id/attempt', () => {
    it('should return 404 for non-existent quiz', async () => {
      const res = await request(app)
        .post('/api/quiz/nonexistent-id/attempt')
        .set('Authorization', `Bearer ${token}`)
        .send({ answer: 'hello' });

      expect(res.status).toBe(404);
    });

    it('should reject missing answer', async () => {
      const res = await request(app)
        .post('/api/quiz/some-id/attempt')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.status).toBe(400);
    });

    it('should reject empty answer', async () => {
      const res = await request(app)
        .post('/api/quiz/some-id/attempt')
        .set('Authorization', `Bearer ${token}`)
        .send({ answer: '' });

      expect(res.status).toBe(400);
    });
  });
});
