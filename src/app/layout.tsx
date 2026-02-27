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
    icon: '/images/focura-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.PLAUSIBLE_DOMAIN;
  const shouldLoadPlausible =
    process.env.NODE_ENV === 'production' && Boolean(plausibleDomain);

  return (
    <html lang='en'>
      <body>
        {shouldLoadPlausible ? (
          <Script
            defer
            data-domain={plausibleDomain as string}
            src='https://plausible.io/js/script.js'
            strategy='afterInteractive'
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
