import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';
import LoginForm from '@/components/admin/LoginForm';

export default async function AdminPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
