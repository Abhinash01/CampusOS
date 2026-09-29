import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import { authRouter } from './routes/auth.routes.js'
import { errorHandler } from './middleware/error.middleware.js'
import { authService } from './services/auth.service.js'

const app = express()

// Security headers
app.use(helmet())

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Body and Cookie parsers
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CampusOS API',
  })
})

// Authentication Routes
app.use('/api/auth', authRouter)

// Global Error Handler
app.use(errorHandler)

// Server Initialization
async function startServer(): Promise<void> {
  await connectDB()
  await authService.seedDefaultAccounts()

  const server = app.listen(env.PORT, () => {
    console.log(`[CAMPUSOS SERVER] Running on http://localhost:${env.PORT}`)
    console.log(`[CAMPUSOS SERVER] Environment: ${env.NODE_ENV}`)
  })

  // Graceful shutdown
  const shutdown = () => {
    console.log('\n[CAMPUSOS SERVER] Gracefully shutting down...')
    server.close(() => {
      process.exit(0)
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

startServer().catch((err) => {
  console.error('[FATAL STARTUP ERROR]', err)
  process.exit(1)
})

export default app
