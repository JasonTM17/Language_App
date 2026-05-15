import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Chat Routes', () => {
  let token: string;
  let sessionId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: `chat_${Date.now()}@test.com`, password: 'TestPass123!', name: 'Chat Tester' });
    token = res.body.token;
  });

  describe('POST /api/chat/start', () => {
    it('should start a new chat session', async () => {
      const res = await request(app)
        .post('/api/chat/start')
        .set('Authorization', `Bearer ${token}`)
        .send({ language: 'en', role: 'teacher' });

      expect(res.status).toBe(200);
      expect(res.body.session).toBeDefined();
      expect(res.body.session.language).toBe('en');
      expect(res.body.session.role).toBe('teacher');
      sessionId = res.body.session.id;
    });

    it('should use defaults when no params provided', async () => {
      const res = await request(app)
        .post('/api/chat/start')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.status).toBe(200);
      expect(res.body.session.language).toBe('en');
      expect(res.body.session.role).toBe('teacher');
    });

    it('should reject invalid language', async () => {
      const res = await request(app)
        .post('/api/chat/start')
        .set('Authorization', `Bearer ${token}`)
        .send({ language: 'invalid' });

      expect(res.status).toBe(400);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/chat/start')
        .send({ language: 'en' });

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/chat/:sessionId/message', () => {
    it('should send a message and get AI response', async () => {
      const res = await request(app)
        .post(`/api/chat/${sessionId}/message`)
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Hello, how are you?' });

      expect(res.status).toBe(200);
      expect(res.body.response).toBeDefined();
      expect(res.body.response.content).toBeDefined();
      expect(res.body.messages).toBeInstanceOf(Array);
      expect(res.body.messages.length).toBeGreaterThanOrEqual(2);
    });

    it('should reject empty message', async () => {
      const res = await request(app)
        .post(`/api/chat/${sessionId}/message`)
        .set('Authorization', `Bearer ${token}`)
        .send({ message: '' });

      expect(res.status).toBe(400);
    });

    it('should return 404 for invalid session', async () => {
      const res = await request(app)
        .post('/api/chat/nonexistent-id/message')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Hello' });

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/chat/sessions', () => {
    it('should list user chat sessions', async () => {
      const res = await request(app)
        .get('/api/chat/sessions')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.sessions).toBeInstanceOf(Array);
      expect(res.body.sessions.length).toBeGreaterThanOrEqual(1);
    });
  });
});
