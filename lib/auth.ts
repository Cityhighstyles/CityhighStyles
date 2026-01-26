'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCustomPassword } from './passwordStorage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE = 'admin_session';

export async function authenticateAdmin(password: string): Promise<boolean> {
  // Check custom password first, then fall back to env password
  const customPassword = await getCustomPassword();
  
  const isValid = customPassword 
    ? password === customPassword || password === ADMIN_PASSWORD
    : password === ADMIN_PASSWORD;
  
  if (isValid) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return true;
  }
  return false;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === 'authenticated';
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/admin');
}
