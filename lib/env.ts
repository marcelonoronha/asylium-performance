/**
 * Environment configuration utilities
 */

export function getSiteUrl(): string {
  // In production, use the environment variable
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://asylium-performance.vercel.app/'
  }
  
  // In development, use localhost
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

export function getAuthRedirectUrl(): string {
  return `${getSiteUrl()}/auth/callback`
}

export function getResetPasswordUrl(): string {
  return `${getSiteUrl()}/reset-password`
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
} 