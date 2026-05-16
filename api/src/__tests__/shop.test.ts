import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Shop Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `shop_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Shop Tester' });
    token = res.body.token;
  });

  describe('GET /api/shop', () => {
    it('should return shop items list', async () => {
      const res = await request(app)
        .get('/api/shop')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('items');
      expect(res.body.items).toBeInstanceOf(Array);
      expect(res.body.items.length).toBeGreaterThan(0);
    });

    it('should include gems balance in response', async () => {
      const res = await request(app)
        .get('/api/shop')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('gems');
      expect(typeof res.body.gems).toBe('number');
    });

    it('should include affordable flag on each item', async () => {
      const res = await request(app)
        .get('/api/shop')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      res.body.items.forEach((item: any) => {
        expect(item).toHaveProperty('affordable');
        expect(typeof item.affordable).toBe('boolean');
      });
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/shop');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/shop/purchase', () => {
    it('should return 400 with insufficient gems details when user cannot afford item', async () => {
      // streak_freeze costs 200 gems; new users start with 50 gems
      const res = await request(app)
        .post('/api/shop/purchase')
        .set('Authorization', `Bearer ${token}`)
        .send({ itemId: 'streak_freeze' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body).toHaveProperty('required');
      expect(res.body).toHaveProperty('current');
    });

    it('should return 404 for non-existent item id', async () => {
      const res = await request(app)
        .post('/api/shop/purchase')
        .set('Authorization', `Bearer ${token}`)
        .send({ itemId: 'nonexistent-item' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for invalid quantity (out of range)', async () => {
      const res = await request(app)
        .post('/api/shop/purchase')
        .set('Authorization', `Bearer ${token}`)
        .send({ itemId: 'heart_refill', quantity: 99 });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/shop/purchase')
        .send({ itemId: 'heart_refill' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/shop/history', () => {
    it('should return purchase history', async () => {
      const res = await request(app)
        .get('/api/shop/history')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('purchases');
      expect(res.body.purchases).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/shop/history');
      expect(res.status).toBe(401);
    });
  });
});
