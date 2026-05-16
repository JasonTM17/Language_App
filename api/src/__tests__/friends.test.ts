import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Friends Routes', () => {
  let tokenA: string;
  let tokenB: string;
  let userBId: string;

  beforeAll(async () => {
    const resA = await request(app)
      .post('/api/auth/register')
      .send({ email: `friends_a_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Friend A' });
    tokenA = resA.body.token;

    const ts = Date.now() + 1;
    const resB = await request(app)
      .post('/api/auth/register')
      .send({ email: `friends_b_${ts}@test.com`, password: 'TestPass123!', name: 'Friend B' });
    tokenB = resB.body.token;
    userBId = resB.body.user.id;
  });

  describe('GET /api/friends', () => {
    it('should return friends list', async () => {
      const res = await request(app)
        .get('/api/friends')
        .set('Authorization', `Bearer ${tokenA}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('friends');
      expect(res.body.friends).toBeInstanceOf(Array);
      expect(res.body).toHaveProperty('total');
    });

    it('should return empty friends list for new user', async () => {
      const res = await request(app)
        .get('/api/friends')
        .set('Authorization', `Bearer ${tokenA}`);

      expect(res.status).toBe(200);
      expect(res.body.total).toBe(0);
      expect(res.body.friends.length).toBe(0);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/friends');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/friends/add', () => {
    it('should send a friend request to another user', async () => {
      const res = await request(app)
        .post('/api/friends/add')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ userId: userBId });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('friendship');
      expect(res.body.friendship).toHaveProperty('id');
      expect(res.body.friendship.status).toBe('pending');
    });

    it('should return 400 when sending duplicate friend request', async () => {
      const res = await request(app)
        .post('/api/friends/add')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ userId: userBId });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when trying to friend yourself', async () => {
      // Get own user id from profile
      const profileRes = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${tokenA}`);
      const selfId = profileRes.body.user?.id || profileRes.body.id;

      const res = await request(app)
        .post('/api/friends/add')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ userId: selfId });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app)
        .post('/api/friends/add')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ userId: 'nonexistent-user-id' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/friends/:id/accept', () => {
    let friendshipId: string;

    beforeAll(async () => {
      // Create a new request from B to A for accept/reject tests
      const ts = Date.now() + 2;
      const resC = await request(app)
        .post('/api/auth/register')
        .send({ email: `friends_c_${ts}@test.com`, password: 'TestPass123!', name: 'Friend C' });
      const tokenC = resC.body.token;
      const userCId = resC.body.user.id;

      const ts2 = Date.now() + 3;
      const resD = await request(app)
        .post('/api/auth/register')
        .send({ email: `friends_d_${ts2}@test.com`, password: 'TestPass123!', name: 'Friend D' });
      const tokenD = resD.body.token;

      // C sends request to D
      const addRes = await request(app)
        .post('/api/friends/add')
        .set('Authorization', `Bearer ${tokenC}`)
        .send({ userId: resD.body.user.id });
      friendshipId = addRes.body.friendship?.id;
    });

    it('should return 404 for non-existent friendship id', async () => {
      const res = await request(app)
        .post('/api/friends/nonexistent-friendship-id/accept')
        .set('Authorization', `Bearer ${tokenB}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 404 when accepting a request not addressed to you', async () => {
      // tokenA tries to accept a request that was sent to tokenB
      const res = await request(app)
        .post(`/api/friends/${friendshipId}/accept`)
        .set('Authorization', `Bearer ${tokenA}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/friends/:id/reject', () => {
    it('should return 404 for non-existent friendship id', async () => {
      const res = await request(app)
        .post('/api/friends/nonexistent-id/reject')
        .set('Authorization', `Bearer ${tokenB}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/friends/search', () => {
    it('should return users matching search query', async () => {
      const res = await request(app)
        .get('/api/friends/search?q=Friend')
        .set('Authorization', `Bearer ${tokenA}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('users');
      expect(res.body.users).toBeInstanceOf(Array);
    });

    it('should return 400 for query shorter than 2 characters', async () => {
      const res = await request(app)
        .get('/api/friends/search?q=a')
        .set('Authorization', `Bearer ${tokenA}`);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/friends/search?q=test');
      expect(res.status).toBe(401);
    });
  });
});
