import { Product } from '@/types';
import { getFileContent, listFiles, createOrUpdateFile, deleteFile } from './github';

const PRODUCTS_DIR = 'data/products';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const files = await listFiles(PRODUCTS_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));

    const products = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await getFileContent(`${PRODUCTS_DIR}/${file}`);
        if (content) {
          return JSON.parse(content) as Product;
        }
        return null;
      })
    );

    return products.filter((p): p is Product => p !== null);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const content = await getFileContent(`${PRODUCTS_DIR}/${slug}.json`);
    if (content) {
      return JSON.parse(content) as Product;
    }
    return null;
  } catch (error) {
    console.error(`Error loading product ${slug}:`, error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.category === category);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.featured).slice(0, limit);
}

export async function saveProduct(product: Product): Promise<void> {
  const path = `${PRODUCTS_DIR}/${product.slug}.json`;
  const content = JSON.stringify(product, null, 2);
  const message = `Update product: ${product.name}`;

  await createOrUpdateFile(path, content, message);
}

export async function deleteProduct(slug: string): Promise<void> {
  const path = `${PRODUCTS_DIR}/${slug}.json`;
  const message = `Delete product: ${slug}`;

  await deleteFile(path, message);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatPrice(price: number): string {
  return '₦' + price.toLocaleString('en-NG');
}
