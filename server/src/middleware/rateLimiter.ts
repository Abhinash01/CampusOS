import rateLimit from 'express-rate-limit'

// Rate limiter for authentication endpoints: 15 minutes, maximum 50 requests
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
})
