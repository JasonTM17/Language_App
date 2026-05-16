import { Request, Response, NextFunction } from 'express';

export function requestTimeout(ms: number = 30000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({ error: 'Yêu cầu đã hết thời gian', code: 'REQUEST_TIMEOUT' });
      }
    }, ms);
    res.on('finish', () => clearTimeout(timer));
    res.on('close', () => clearTimeout(timer));
    next();
  };
}
