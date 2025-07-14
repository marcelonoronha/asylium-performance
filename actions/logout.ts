'use server'

import { createClient } from '@/utils/supabase/server'

export async function logout() {
  const supabase = await createClient()
  
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return {
        error: error.message,
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Logout error:', err)
    return {
      error: 'An unexpected error occurred during logout.',
    }
  }
} 