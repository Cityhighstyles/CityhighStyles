import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials are missing. Using placeholders for build.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads an image to Supabase Storage
 * @param path The directory path in the bucket (e.g., 'products/slug' or 'categories')
 * @param fileName The name of the file
 * @param base64Content The base64 encoded content of the image
 * @param bucket The storage bucket name (default: 'shop')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  path: string,
  fileName: string,
  base64Content: string,
  bucket: string = 'shop'
): Promise<string> {
  try {
    // Remove data:image/jpeg;base64, prefix if it exists
    const base64Data = base64Content.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = `${path}/${fileName}`.replace(/\/+/g, '/');

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error(`Error uploading image to Supabase:`, error);
    throw error;
  }
}
