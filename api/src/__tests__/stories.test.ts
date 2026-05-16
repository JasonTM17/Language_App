import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Stories Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `stories_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Stories Tester' });
    token = res.body.token;
  });

  describe('GET /api/stories', () => {
    it('should return paginated stories without segments', async () => {
      const res = await request(app)
        .get('/api/stories')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBeInstanceOf(Array);
      // Segments should be stripped from list response
      res.body.data.forEach((story: any) => {
        expect(story).not.toHaveProperty('segments');
        expect(story).toHaveProperty('segmentCount');
      });
    });

    it('should include pagination metadata', async () => {
      const res = await request(app)
        .get('/api/stories')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('total');
    });

    it('should filter stories by language with ?lang=en', async () => {
      const res = await request(app)
        .get('/api/stories?lang=en')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      res.body.data.forEach((story: any) => {
        expect(story.language).toBe('en');
      });
    });

    it('should filter stories by language with ?lang=ja', async () => {
      const res = await request(app)
        .get('/api/stories?lang=ja')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      res.body.data.forEach((story: any) => {
        expect(story.language).toBe('ja');
      });
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/stories');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/stories/:id', () => {
    it('should return full story with segments', async () => {
      const res = await request(app)
        .get('/api/stories/en-story-cafe')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('story');
      expect(res.body.story).toHaveProperty('segments');
      expect(res.body.story.segments).toBeInstanceOf(Array);
      expect(res.body.story.segments.length).toBeGreaterThan(0);
    });

    it('should return story with correct id', async () => {
      const res = await request(app)
        .get('/api/stories/en-story-cafe')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.story.id).toBe('en-story-cafe');
      expect(res.body.story).toHaveProperty('title');
      expect(res.body.story).toHaveProperty('language');
    });

    it('should return 404 for non-existent story id', async () => {
      const res = await request(app)
        .get('/api/stories/nonexistent-story')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/stories/en-story-cafe');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/stories/:id/complete', () => {
    it('should mark story as completed and return xpEarned', async () => {
      const res = await request(app)
        .post('/api/stories/en-story-cafe/complete')
        .set('Authorization', `Bearer ${token}`)
        .send({ correctAnswers: 2, totalQuestions: 2 });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
      expect(res.body).toHaveProperty('xpEarned');
      expect(res.body).toHaveProperty('accuracy');
    });

    it('should calculate 100% accuracy when no questions provided', async () => {
      const res = await request(app)
        .post('/api/stories/en-story-lost/complete')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
      expect(res.body.accuracy).toBe(100);
    });

    it('should return 404 for non-existent story id', async () => {
      const res = await request(app)
        .post('/api/stories/nonexistent-story/complete')
        .set('Authorization', `Bearer ${token}`)
        .send({ correctAnswers: 1, totalQuestions: 1 });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
