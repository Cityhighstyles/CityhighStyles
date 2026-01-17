export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  images: string[];
  featured: boolean;
  inStock: boolean;
  details: {
    fabric: string;
    care: string;
  };
  fit: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
