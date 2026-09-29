import mongoose from 'mongoose'
import { env } from './env.js'

let isConnected = false

export async function connectDB(): Promise<boolean> {
  if (isConnected) return true

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
    })
    isConnected = true
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`)
    return true
  } catch (error) {
    console.warn(`[DATABASE] Notice: Could not connect to MongoDB at ${env.MONGODB_URI}.`)
    console.warn('[DATABASE] Operating in development in-memory data store mode.')
    isConnected = false
    return false
  }
}

export function isDbConnected(): boolean {
  return isConnected
}
