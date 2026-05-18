import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import LoginForm from "@/components/admin/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  const authenticated = await isAuthenticated();

  const baseMetadata = {
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      siteName: "GLOWÈ COLLECTION",
      type: "website",
      images: [
        {
          url: "/admin.png", // put this in /public
          width: 1200,
          height: 630,
          alt: "GLOWÈ COLLECTION Admin Dashboard",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/admin.png"],
    },
  };

  if (!authenticated) {
    return {
      title: "Admin Login | GLOWÈ COLLECTION",
      description: "Login to access the GLOWÈ COLLECTION admin dashboard",
      ...baseMetadata,
      openGraph: {
        ...baseMetadata.openGraph,
        title: "Admin Login | GLOWÈ COLLECTION",
        description: "Login to access the GLOWÈ COLLECTION admin dashboard",
        url: "/admin",
      },
      twitter: {
        ...baseMetadata.twitter,
        title: "Admin Login | GLOWÈ COLLECTION",
        description: "Login to access the GLOWÈ COLLECTION admin dashboard",
      },
    };
  }

  return {
    title: "Admin Dashboard | GLOWÈ COLLECTION",
    description: "Manage products, prices, images, orders and store content",
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Admin Dashboard | GLOWÈ COLLECTION",
      description: "Manage products, prices, images, orders and store content",
      url: "/admin",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Admin Dashboard | GLOWÈ COLLECTION",
      description: "Manage products, prices, images, orders and store content",
    },
  };
}

export default async function AdminPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}