import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const slug = formData.get('slug') as string;
    if (!file || !slug) {
      return NextResponse.json({ error: 'Missing file or slug' }, { status: 400 });
    }
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const fileName = `category-${Date.now()}.jpg`;
    const url = await uploadImage('category', fileName, base64);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading category image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
