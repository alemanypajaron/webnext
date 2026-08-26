import { Toaster } from 'react-hot-toast';
import AdminNav from '@/components/admin/AdminNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Administración',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
  },
  manifest: '/manifest-admin.json',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Toaster position="top-right" />
      <AdminNav />
      <main className="pb-8">{children}</main>
    </div>
  );
}

