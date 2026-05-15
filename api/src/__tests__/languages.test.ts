import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Languages Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@linguaflow.app', password: 'user123' });
    token = res.body.token;
  });

  describe('GET /api/languages', () => {
    it('should return list of languages', async () => {
      const res = await request(app)
        .get('/api/languages')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.languages).toBeDefined();
      expect(res.body.languages.length).toBe(4);
    });

    it('should include English, Japanese, Chinese, Korean', async () => {
      const res = await request(app)
        .get('/api/languages')
        .set('Authorization', `Bearer ${token}`);

      const codes = res.body.languages.map((l: any) => l.code);
      expect(codes).toContain('en');
      expect(codes).toContain('ja');
      expect(codes).toContain('zh');
      expect(codes).toContain('ko');
    });
  });

  describe('GET /api/languages/:code', () => {
    it('should return a specific language with levels', async () => {
      const res = await request(app)
        .get('/api/languages/en')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.language).toBeDefined();
      expect(res.body.language.code).toBe('en');
      expect(res.body.language.name).toBe('English');
    });

    it('should return 404 for unknown language', async () => {
      const res = await request(app)
        .get('/api/languages/xx')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});
