import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getCustomPassword, setCustomPassword } from '@/lib/passwordStorage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Verify current password
    const customPassword = await getCustomPassword();
    const isCurrentPasswordValid = customPassword
      ? currentPassword === customPassword || currentPassword === ADMIN_PASSWORD
      : currentPassword === ADMIN_PASSWORD;

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Set new custom password
    const success = await setCustomPassword(newPassword);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Password changed successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
