'use server'

import { createClient } from '@/utils/supabase/server'

export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data, error: null }
  } catch (err) {
    console.error('Get user profile error:', err)
    return { user: null, error: 'Failed to get user profile' }
  }
}

export async function updateUserProfile(userId: string, updates: {
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data, error: null }
  } catch (err) {
    console.error('Update user profile error:', err)
    return { user: null, error: 'Failed to update user profile' }
  }
} 