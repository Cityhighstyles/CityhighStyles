'use server';

import { cookies } from 'next/headers';
import { supabase } from './supabase';

const SESSION_COOKIE = 'admin_session';

export async function authenticateAdmin(password: string): Promise<boolean> {
  try {
    // We assume the admin email is set in env or we use a fixed one if standard for the app
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cityhighstyles.com';

    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: password,
    });

    if (error) {
      console.error('Supabase auth error:', error.message);
      return false;
    }

    if (data.session) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: data.session.expires_in,
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return false;

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return false;

    // Additional check if needed: e.g., user.email === process.env.ADMIN_EMAIL
    return true;
  } catch (error) {
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  await supabase.auth.signOut();
}
