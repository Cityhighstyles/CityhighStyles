/**
 * Business Configuration
 * Centralized location for all hardcoded business details
 */

export const businessConfig = {
  // Business Identity
  name: "GLOWÈ COLLECTION",
  tagline: "Luxury fashion for bold and confident women",
  description: "Your destination for luxury fashion for bold and confident women",

  // Contact Information
  contact: {
    email: "info@cityhighstyles.com",
    phone: "+1 (555) 123-4567",
    whatsapp: "+1 (555) 123-4567",
    address: {
      street: "123 Fashion Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
  },

  // Business Hours
  hours: {
    weekdays: "9:00 AM - 9:00 PM",
    saturday: "10:00 AM - 8:00 PM",
    sunday: "10:00 AM - 6:00 PM",
    timezone: "EST",
  },

  // Social Media & Web
  social: {
    instagram: "https://instagram.com/cityhighstyles",
    facebook: "https://facebook.com/cityhighstyles",
    twitter: "https://twitter.com/cityhighstyles",
    youtube: "https://youtube.com/@cityhighstyles",
    tiktok: "https://tiktok.com/@cityhighstyles",
  },

  // Branding
  branding: {
    logo: "/logo.png",
    favicon: "/favicon.ico",
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#FF6B6B",
    },
  },

  // Policies & Legal
  policies: {
    returnPolicy: "30 days money-back guarantee",
    shippingPolicy: "Free shipping on orders over $50",
    warrantyPolicy: "1-year warranty on all products",
  },

  // Payment & Shipping
  payment: {
    acceptedMethods: ["Credit Card", "Debit Card", "PayPal", "Apple Pay", "Google Pay"],
    currency: "USD",
  },

  // Store Information
  store: {
    founded: 2020,
    employees: 50,
    locations: 3,
  },

  // SEO & Meta
  seo: {
    title: "GLOWÈ COLLECTION - Luxury Fashion",
    description: "Shop luxury fashion for bold and confident women at GLOWÈ COLLECTION.",
    keywords: ["fashion", "clothing", "premium", "style"],
  },
} as const;

// Type for TypeScript support
export type BusinessConfig = typeof businessConfig;
