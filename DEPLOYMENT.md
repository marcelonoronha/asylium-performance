# Deployment Guide

## Environment Variables

### Required Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site URL Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Production Configuration

For production deployment, set the following environment variables:

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Supabase Configuration

### 1. Create Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### 2. Configure OAuth Providers

In your Supabase dashboard:

1. Go to Authentication > Providers
2. Configure Discord OAuth (if using)
3. Set redirect URLs to: `https://your-domain.com/auth/callback`

## Deployment Platforms

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically

### Other Platforms

Make sure to set the environment variables in your hosting platform's dashboard.

## URL Configuration

The application automatically handles URLs based on the environment:

- **Development**: `http://localhost:3000`
- **Production**: Uses `NEXT_PUBLIC_SITE_URL` environment variable

## Security Checklist

- [ ] Environment variables are set
- [ ] Supabase RLS policies are configured
- [ ] OAuth redirect URLs are correct
- [ ] HTTPS is enabled in production
- [ ] Database schema is created

## Troubleshooting

### Common Issues

1. **OAuth redirect errors**: Check redirect URLs in Supabase dashboard
2. **Database errors**: Ensure schema is created and RLS is configured
3. **Environment variables**: Verify all required variables are set

### Debug Mode

For debugging, you can access `/test-auth` to check authentication status. 