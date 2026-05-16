import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Daily Challenge Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `challenge_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Challenge Tester' });
    token = res.body.token;
  });

  describe('GET /api/daily-challenge/today', () => {
    it('should return daily and weekly challenges', async () => {
      const res = await request(app)
        .get('/api/daily-challenge/today')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('daily');
      expect(res.body).toHaveProperty('weekly');
    });

    it('should include progress and completion status in daily challenge', async () => {
      const res = await request(app)
        .get('/api/daily-challenge/today')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.daily).toHaveProperty('progress');
      expect(res.body.daily).toHaveProperty('completed');
      expect(res.body.daily).toHaveProperty('xpReward');
      expect(typeof res.body.daily.completed).toBe('boolean');
    });

    it('should include streak multiplier in response', async () => {
      const res = await request(app)
        .get('/api/daily-challenge/today')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('streakMultiplier');
      expect(typeof res.body.streakMultiplier).toBe('number');
    });

    it('should include weekly challenge with daysRemaining', async () => {
      const res = await request(app)
        .get('/api/daily-challenge/today')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.weekly).toHaveProperty('daysRemaining');
      expect(res.body.weekly).toHaveProperty('difficulty');
      expect(res.body.weekly.difficulty).toBe('hard');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/daily-challenge/today');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/daily-challenge/claim', () => {
    it('should return claimed result for a valid challenge id', async () => {
      const res = await request(app)
        .post('/api/daily-challenge/claim')
        .set('Authorization', `Bearer ${token}`)
        .send({ challengeId: 'speed-vocab-10' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('claimed');
      expect(res.body.claimed).toBe(true);
      expect(res.body).toHaveProperty('xpEarned');
      expect(res.body).toHaveProperty('gemsEarned');
    });

    it('should return 404 for non-existent challenge id', async () => {
      const res = await request(app)
        .post('/api/daily-challenge/claim')
        .set('Authorization', `Bearer ${token}`)
        .send({ challengeId: 'nonexistent-challenge' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/daily-challenge/claim')
        .send({ challengeId: 'speed-vocab-10' });

      expect(res.status).toBe(401);
    });
  });
});
