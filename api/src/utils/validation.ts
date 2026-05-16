export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Mật khẩu không được quá 128 ký tự' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; message?: string } {
  if (!name || name.trim().length < 2) {
    return { valid: false, message: 'Tên phải có ít nhất 2 ký tự' };
  }
  if (name.trim().length > 50) {
    return { valid: false, message: 'Tên không được quá 50 ký tự' };
  }
  return { valid: true };
}

export function validatePagination(page?: string | number, limit?: string | number) {
  const p = Math.max(1, parseInt(String(page || '1'), 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(String(limit || '20'), 10) || 20));
  return { page: p, limit: l, offset: (p - 1) * l };
}

export function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

export function isValidLanguageCode(code: string): boolean {
  return ['en', 'ja', 'zh', 'ko'].includes(code);
}

export function isValidDifficulty(difficulty: string): boolean {
  return ['easy', 'medium', 'hard'].includes(difficulty.toLowerCase());
}
