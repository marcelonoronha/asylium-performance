'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { getAuthRedirectUrl } from '@/lib/env'

// Validation schema for register form
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type RegisterFormData = z.infer<typeof registerSchema>

export async function registerWithEmail(formData: FormData) {
  const supabase = await createClient()
  
  // Validate form data
  const validatedFields = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data',
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    // Step 1: Create user in auth.users
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          name: name,
        },
      },
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    if (data.user) {
      // Step 2: Insert user data into custom users table
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          full_name: name,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (insertError) {
        console.error('Error inserting user data:', insertError)
        // Don't fail the registration if this fails, just log it
        // The user is still created in auth.users
      }

      return { success: true, user: data.user }
    }

    return {
      error: 'Registration failed. Please try again.',
    }
  } catch (err) {
    console.error('Registration error:', err)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function registerWithOAuth(provider: 'discord') {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthRedirectUrl(),
      },
    })

    if (error) {
      return {
        error: error.message,
      }
    }

    return { success: true, data }
  } catch (err) {
    console.error('OAuth registration error:', err)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
} 