import { Toaster } from 'react-hot-toast';
import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Panel de Administración | Alemán y Pajarón',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <AdminNav />
      <main>{children}</main>
    </div>
  );
}

