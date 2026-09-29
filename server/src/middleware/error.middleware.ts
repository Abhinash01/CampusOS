import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[SERVER ERROR]', err.name, err.message)

  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
    res.status(400).json({
      error: 'Validation failed',
      details: issues,
    })
    return
  }

  // Never expose raw stack traces or internal database errors to client
  res.status(500).json({
    error: 'An unexpected server error occurred. Please try again later.',
  })
}
