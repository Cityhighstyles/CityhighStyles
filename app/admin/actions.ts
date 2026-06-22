'use server';

import { Product } from '@/types';
import { saveProduct, deleteProduct as deleteProductFromSupabase } from '@/lib/products';
import { generateSlug } from '@/lib/utils';
import { uploadImage } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = generateSlug(name);
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const category = formData.get('category') as string;
    const tags = (formData.get('tags') as string).split(',').map(t => t.trim());
    const sizes = (formData.get('sizes') as string).split(',').map(s => s.trim());
    const colors = (formData.get('colors') as string).split(',').map(c => c.trim());
    const fabric = formData.get('fabric') as string;
    const care = formData.get('care') as string;
    const fit = formData.get('fit') as string;
    const featured = formData.get('featured') === 'true';
    const inStock = formData.get('inStock') === 'true';

    const product: Product = {
      id: Date.now().toString(),
      slug,
      name,
      description,
      price,
      category,
      tags,
      sizes,
      colors,
      images: [],
      featured,
      inStock,
      details: { fabric, care },
      fit,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Handle image uploads to Supabase
    const imageFiles = formData.getAll('images') as File[];
    const uploadedImages: string[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file.size > 0) {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const fileName = `image-${Date.now()}-${i + 1}.jpg`;
        const imagePath = await uploadImage(`products/${slug}`, fileName, base64);
        uploadedImages.push(imagePath);
      }
    }

    product.images = uploadedImages;

    await saveProduct(product);
    revalidatePath('/');
    revalidatePath(`/category/${category}`);
    revalidatePath('/products');

    return { success: true, slug };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function updateProduct(slug: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const category = formData.get('category') as string;
    const tags = (formData.get('tags') as string).split(',').map(t => t.trim());
    const sizes = (formData.get('sizes') as string).split(',').map(s => s.trim());
    const colors = (formData.get('colors') as string).split(',').map(c => c.trim());
    const fabric = formData.get('fabric') as string;
    const care = formData.get('care') as string;
    const fit = formData.get('fit') as string;
    const featured = formData.get('featured') === 'true';
    const inStock = formData.get('inStock') === 'true';
    const existingImages = JSON.parse(formData.get('existingImages') as string || '[]');

    // Handle new image uploads to Supabase
    const newImageFiles = formData.getAll('newImages') as File[];
    const uploadedNewImages: string[] = [];

    for (let i = 0; i < newImageFiles.length; i++) {
      const file = newImageFiles[i];
      if (file.size > 0) {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const fileName = `image-${Date.now()}-${i + 1}.jpg`;
        const imagePath = await uploadImage(`products/${slug}`, fileName, base64);
        uploadedNewImages.push(imagePath);
      }
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...uploadedNewImages];

    const product: Product = {
      id: formData.get('id') as string,
      slug,
      name,
      description,
      price,
      category,
      tags,
      sizes,
      colors,
      images: allImages,
      featured,
      inStock,
      details: { fabric, care },
      fit,
      createdAt: formData.get('createdAt') as string,
      updatedAt: new Date().toISOString(),
    };

    await saveProduct(product);
    revalidatePath('/');
    revalidatePath(`/product/${slug}`);
    revalidatePath(`/category/${category}`);
    revalidatePath('/products');

    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(slug: string) {
  try {
    await deleteProductFromSupabase(slug);
    revalidatePath('/');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}
