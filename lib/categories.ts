import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'tees',
    title: 'Tees',
    description: 'Everyday essentials. Clean fits, bold graphics, premium cotton.',
  },
  {
    slug: 'hoodies',
    title: 'Hoodies',
    description: 'Premium heavyweight hoodies built for comfort and style.',
  },
  {
    slug: 'polo',
    title: 'Polo Shirts',
    description: 'Smart casual classics for every occasion.',
  },
  {
    slug: 'jeans',
    title: 'Denim Jeans',
    description: 'Durable, stylish jeans with a perfect modern fit.',
  },
  {
    slug: 'cargo',
    title: 'Cargo & Utility',
    description: 'Functional fashion with utility pockets and relaxed fits.',
  },
  {
    slug: 'singlets',
    title: 'Singlets',
    description: 'Lightweight and breathable everyday basics.',
  },
  {
    slug: 'english',
    title: 'Corporate & English Wears',
    description: 'Sharp, clean looks for formal and office settings.',
  },
  {
    slug: 'wears',
    title: 'Two-Piece Sets',
    description: 'Matching sets designed for effortless drip.',
  },
  {
    slug: 'chinos',
    title: 'Chinos',
    description: 'Smart casual trousers with a slim modern cut.',
  },
  {
    slug: 'underwear',
    title: 'Underwear',
    description: 'Comfort-first essentials for everyday wear.',
  },
  {
    slug: 'more',
    title: 'Accessories',
    description: 'Caps and extra essentials to complete your fit.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
