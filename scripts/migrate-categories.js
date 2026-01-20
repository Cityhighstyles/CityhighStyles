/**
 * Migration Script: Create Initial Category JSON Files
 * 
 * Run this once to create the initial category JSON files in GitHub.
 * After running, you can delete this file.
 * 
 * Execute: node scripts/migrate-categories.js
 */

const categories = [
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

// Output instructions
console.log('='.repeat(60));
console.log('CATEGORY MIGRATION GUIDE');
console.log('='.repeat(60));
console.log('\nCreate these JSON files in your GitHub repo:');
console.log('Path: data/categories/\n');

categories.forEach(category => {
  console.log(`\n--- File: ${category.slug}.json ---`);
  console.log(JSON.stringify(category, null, 2));
  console.log('---\n');
});

console.log('\n' + '='.repeat(60));
console.log('After creating these files in GitHub:');
console.log('1. Commit them to your repo');
console.log('2. Categories will be loaded from GitHub');
console.log('3. You can edit them via the admin panel');
console.log('='.repeat(60));
