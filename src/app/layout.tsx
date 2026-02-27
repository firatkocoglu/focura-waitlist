import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const baseUrl = 'https://focura.firatkocoglu.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Focura | iOS Focus & Execution App Waitlist',
  description:
    'Join the Focura iOS waitlist. Build focused work sessions, track intentional time, and turn effort into measurable progress.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Focura | iOS Focus & Execution App Waitlist',
    description:
      'A minimalist focus and execution app designed to eliminate distraction and increase daily output.',
    url: baseUrl,
    siteName: 'Focura',
    images: ['/images/focura-og.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focura | iOS Focus & Execution App Waitlist',
    description:
      'Join the waitlist and get launch updates for Focura on iOS.',
    images: ['/images/focura-og.jpg'],
  },
  icons: {
    icon: '/images/focura.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const shouldLoadGa = process.env.NODE_ENV === 'production' && Boolean(gaMeasurementId);

  return (
    <html lang='en'>
      <body>
        {shouldLoadGa ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy='afterInteractive'
            />
            <Script id='ga4-init' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
