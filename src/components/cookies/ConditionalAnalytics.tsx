'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

const GA_ID = 'G-EH39D527MS';

export default function ConditionalAnalytics() {
  const pathname = usePathname();
  if (pathname?.startsWith('/administrator')) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              send_page_view: true,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
}
