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
      siteName: "CityHighStyles",
      type: "website",
      images: [
        {
          url: "/admin.png", // put this in /public
          width: 1200,
          height: 630,
          alt: "CityHighStyles Admin Dashboard",
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
      title: "Admin Login | CityHighStyles",
      description: "Login to access the CityHighStyles admin dashboard",
      ...baseMetadata,
      openGraph: {
        ...baseMetadata.openGraph,
        title: "Admin Login | CityHighStyles",
        description: "Login to access the CityHighStyles admin dashboard",
        url: "/admin",
      },
      twitter: {
        ...baseMetadata.twitter,
        title: "Admin Login | CityHighStyles",
        description: "Login to access the CityHighStyles admin dashboard",
      },
    };
  }

  return {
    title: "Admin Dashboard | CityHighStyles",
    description: "Manage products, prices, images, orders and store content",
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Admin Dashboard | CityHighStyles",
      description: "Manage products, prices, images, orders and store content",
      url: "/admin",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Admin Dashboard | CityHighStyles",
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