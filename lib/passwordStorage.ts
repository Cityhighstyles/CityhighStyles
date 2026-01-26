'use server';

import { getFileContent, createOrUpdateFile } from './github';

const PASSWORD_FILE_PATH = 'data/admin-password.json';

interface PasswordData {
  customPassword: string | null;
  lastUpdated: string | null;
}

export async function getCustomPassword(): Promise<string | null> {
  try {
    const content = await getFileContent(PASSWORD_FILE_PATH);
    if (!content) {
      return null;
    }
    
    const data: PasswordData = JSON.parse(content);
    return data.customPassword;
  } catch (error) {
    console.error('Error reading custom password:', error);
    return null;
  }
}

export async function setCustomPassword(newPassword: string): Promise<boolean> {
  try {
    const data: PasswordData = {
      customPassword: newPassword,
      lastUpdated: new Date().toISOString(),
    };

    await createOrUpdateFile(
      PASSWORD_FILE_PATH,
      JSON.stringify(data, null, 2),
      'Update admin password'
    );

    return true;
  } catch (error) {
    console.error('Error setting custom password:', error);
    return false;
  }
}

export async function clearCustomPassword(): Promise<boolean> {
  try {
    const data: PasswordData = {
      customPassword: null,
      lastUpdated: new Date().toISOString(),
    };

    await createOrUpdateFile(
      PASSWORD_FILE_PATH,
      JSON.stringify(data, null, 2),
      'Clear custom admin password'
    );

    return true;
  } catch (error) {
    console.error('Error clearing custom password:', error);
    return false;
  }
}
