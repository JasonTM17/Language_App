import { Request, Response, NextFunction } from 'express';

export function cacheControl(maxAge: number = 60) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', `public, max-age=${maxAge}`);
    }
    next();
  };
}
