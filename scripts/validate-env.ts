#!/usr/bin/env node

import { validateEnvironment, getSiteConfig } from '../lib/config'

console.log('🔍 Validating environment configuration...')

try {
  // Validate required environment variables
  validateEnvironment()
  console.log('✅ Required environment variables are set')

  // Check site configuration
  const siteConfig = getSiteConfig()
  console.log(`🌐 Site URL: ${siteConfig.url}`)
  console.log(`🏭 Environment: ${siteConfig.isProduction ? 'Production' : 'Development'}`)

  console.log('✅ Supabase configuration is valid')

  console.log('\n🎉 Environment validation passed!')
  console.log('\nNext steps:')
  console.log('1. Ensure your Supabase project is configured')
  console.log('2. Run the database schema in Supabase SQL Editor')
  console.log('3. Configure OAuth providers if needed')
  console.log('4. Deploy your application')

} catch (error) {
  console.error('❌ Environment validation failed:')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
} 