import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'tees',
    title: 'Tees & Shirts',
    description: 'Everyday essentials. Clean fits, bold graphics, premium cotton.',
    image: 'https://cityhighstyles.github.io/public/category/tees.jpg'
  },
  {
    slug: 'hoodies',
    title: 'Hoodies & Sweatshirts',
    description: 'Premium heavyweight hoodies built for comfort and style.',
    image: 'https://cityhighstyles.github.io/public/category/hoodies.jpg'
  },
  {
    slug: 'jeans',
    title: 'Jeans & Trousers',
    description: 'Durable, stylish jeans and trousers with a perfect modern fit.',
    image: 'https://cityhighstyles.github.io/public/category/jeans.jpg'
  },
  {
    slug: 'shorts',
    title: 'Shorts',
    description: 'Casual and utility shorts for everyday comfort.',
    image: 'https://cityhighstyles.github.io/public/category/shorts.jpg'
  },
  {
    slug: 'wears',
    title: 'Two-Piece Sets',
    description: 'Matching sets designed for effortless drip.',
    image: 'https://cityhighstyles.github.io/public/category/sets.jpg'
  },
  {
    slug: 'underwear',
    title: 'Underwear',
    description: 'Comfort-first essentials for everyday wear.',
    image: 'https://cityhighstyles.github.io/public/category/underwear.jpg'
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    description: 'Caps and extra essentials to complete your fit.',
    image: 'https://cityhighstyles.github.io/public/category/accessories.jpg'
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
