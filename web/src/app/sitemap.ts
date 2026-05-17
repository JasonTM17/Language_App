import { MetadataRoute } from 'next';

const BASE_URL = 'https://web-vert-phi-72.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    '',
    '/dashboard',
    '/vocabulary',
    '/lessons',
    '/quiz',
    '/listening',
    '/reading',
    '/writing',
    '/speaking',
    '/pronunciation',
    '/grammar',
    '/flashcards',
    '/ai-tutor',
    '/leaderboard',
    '/achievements',
    '/daily-challenge',
    '/progress',
    '/skill-tree',
    '/games',
    '/stories',
    '/culture',
    '/idioms',
  ];

  return publicRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/dashboard' ? 0.9 : 0.7,
  }));
}
