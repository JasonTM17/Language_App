import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

interface UserSettings {
  language: string;
  theme: string;
  notifications: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  soundEffects: boolean;
  autoPlay: boolean;
  fontSize: string;
}

const defaultSettings: UserSettings = {
  language: 'vi',
  theme: 'system',
  notifications: true,
  dailyReminder: true,
  reminderTime: '20:00',
  soundEffects: true,
  autoPlay: true,
  fontSize: 'medium',
};

router.get('/', authenticate, async (req, res) => {
  res.json({ settings: defaultSettings });
});

router.put('/', authenticate, async (req, res) => {
  const updates = req.body;
  const validKeys = Object.keys(defaultSettings);
  const filtered: any = {};

  for (const key of validKeys) {
    if (key in updates) {
      filtered[key] = updates[key];
    }
  }

  const merged = { ...defaultSettings, ...filtered };
  res.json({ settings: merged });
});

router.get('/preferences', authenticate, async (req, res) => {
  res.json({
    preferences: {
      studyMode: 'balanced',
      quizDifficulty: 'adaptive',
      showRomanization: true,
      showTranslation: true,
      cardFlipDirection: 'front-to-back',
      reviewOrder: 'spaced-repetition',
      maxNewCardsPerDay: 20,
      maxReviewsPerDay: 100,
    },
  });
});

router.put('/preferences', authenticate, async (req, res) => {
  const preferences = req.body;
  res.json({ preferences });
});

export default router;
