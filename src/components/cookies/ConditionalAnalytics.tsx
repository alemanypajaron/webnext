'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;

export default function ConditionalAnalytics() {
  const pathname = usePathname();
  if (!GA_ID || pathname?.startsWith('/administrator')) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
