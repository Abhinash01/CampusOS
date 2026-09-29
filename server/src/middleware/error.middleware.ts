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
    const primaryMessage = issues[0]?.message || 'Validation failed'
    res.status(400).json({
      success: false,
      error: primaryMessage,
      message: primaryMessage,
      details: issues,
    })
    return
  }

  // Never expose raw stack traces or internal database errors to client
  const fallbackMessage = 'An unexpected server error occurred. Please try again later.'
  res.status(500).json({
    success: false,
    error: fallbackMessage,
    message: fallbackMessage,
  })
}
