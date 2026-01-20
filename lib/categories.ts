import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'tees',
    title: 'Tees & Shirts',
    description: 'Everyday essentials. Clean fits, bold graphics, premium cotton.'
  },
  {
    slug: 'hoodies',
    title: 'Hoodies & Sweatshirts',
    description: 'Premium heavyweight hoodies built for comfort and style.'
  },
  {
    slug: 'jeans',
    title: 'Jeans & Trousers',
    description: 'Durable, stylish jeans and trousers with a perfect modern fit.'
  },
  {
    slug: 'shorts',
    title: 'Shorts',
    description: 'Casual and utility shorts for everyday comfort.'
  },
  {
    slug: 'wears',
    title: 'Two-Piece Sets',
    description: 'Matching sets designed for effortless drip.'
  },
  {
    slug: 'underwear',
    title: 'Underwear',
    description: 'Comfort-first essentials for everyday wear.'
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    description: 'Caps and extra essentials to complete your fit.'
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
