import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Notifications Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `notifications_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Notifications Tester' });
    token = res.body.token;
  });

  describe('GET /api/notifications', () => {
    it('should return paginated notifications', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should include pagination metadata', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('total');
    });

    it('should include unreadCount in response', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('unreadCount');
      expect(typeof res.body.unreadCount).toBe('number');
    });

    it('should return notifications with required fields', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      res.body.data.forEach((notification: any) => {
        expect(notification).toHaveProperty('id');
        expect(notification).toHaveProperty('type');
        expect(notification).toHaveProperty('title');
        expect(notification).toHaveProperty('message');
        expect(notification).toHaveProperty('read');
      });
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/notifications');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/notifications/:id/read', () => {
    it('should mark a notification as read and return success', async () => {
      const res = await request(app)
        .post('/api/notifications/1/read')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success).toBe(true);
    });

    it('should require authentication', async () => {
      const res = await request(app).post('/api/notifications/1/read');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/notifications/read-all', () => {
    it('should mark all notifications as read and return success', async () => {
      const res = await request(app)
        .post('/api/notifications/read-all')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success).toBe(true);
    });

    it('should require authentication', async () => {
      const res = await request(app).post('/api/notifications/read-all');
      expect(res.status).toBe(401);
    });
  });
});
