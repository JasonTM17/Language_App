import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Skill Tree Routes', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `skilltree_${Date.now()}@test.com`, password: 'TestPass123!', name: 'SkillTree Tester' });
    token = res.body.token;
  });

  describe('GET /api/skill-tree/:lang', () => {
    it('should return skill tree for English', async () => {
      const res = await request(app)
        .get('/api/skill-tree/en')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('tree');
      expect(res.body.tree).toBeInstanceOf(Array);
      expect(res.body.tree.length).toBeGreaterThan(0);
      expect(res.body.language).toBe('en');
    });

    it('should return skill tree for Japanese with ?lang=ja param style', async () => {
      const res = await request(app)
        .get('/api/skill-tree/ja')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('tree');
      expect(res.body.tree).toBeInstanceOf(Array);
      expect(res.body.language).toBe('ja');
    });

    it('should include progress metadata in response', async () => {
      const res = await request(app)
        .get('/api/skill-tree/en')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('progress');
      expect(res.body.progress).toHaveProperty('total');
      expect(res.body.progress).toHaveProperty('completed');
      expect(res.body.progress).toHaveProperty('percentage');
    });

    it('should return nodes with correct dependency structure', async () => {
      const res = await request(app)
        .get('/api/skill-tree/en')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      const tree = res.body.tree;
      tree.forEach((node: any) => {
        expect(node).toHaveProperty('id');
        expect(node).toHaveProperty('dependencies');
        expect(node.dependencies).toBeInstanceOf(Array);
        expect(node).toHaveProperty('status');
        expect(node).toHaveProperty('position');
      });
    });

    it('should return 404 for unsupported language', async () => {
      const res = await request(app)
        .get('/api/skill-tree/xx')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/skill-tree/en');
      expect(res.status).toBe(401);
    });
  });
});
