'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

// Validation schema for login form
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient()
  
  // Validate form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data',
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    if (data.user) {
      return { success: true, user: data.user }
    }

    return {
      error: 'Login failed. Please try again.',
    }
  } catch (err) {
    console.error('Login error:', err)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function loginWithOAuth(provider: 'discord') {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return { success: true, data }
  } catch (err) {
    console.error('OAuth login error:', err)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function getCurrentUser() {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return { user: null, error: error.message }
    }

    return { user, error: null }
  } catch (err) {
    console.error('Get current user error:', err)
    return { user: null, error: 'Failed to get current user' }
  }
}

export async function resetPassword(email: string) {
  const supabase = await createClient()
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Reset password error:', err)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
