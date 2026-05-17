# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email: jasonbmt06@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial assessment:** Within 5 business days
- **Fix release:** Within 30 days for critical issues

## Security Measures

- JWT authentication with token rotation
- Bcrypt password hashing (cost factor 12)
- Rate limiting (100 req/15min per IP)
- Helmet.js security headers
- Input validation with Zod schemas
- SQL injection prevention via Prisma ORM
- CORS whitelist configuration
- Content Security Policy
- X-Frame-Options: DENY
- HTTPS enforced in production
