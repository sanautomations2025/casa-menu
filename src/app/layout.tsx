// src/app/layout.tsx
import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css'; // ← remove if not using Bootstrap
import './globals.css'; // ← your custom styles if any

export const metadata: Metadata = {
  title: 'Casa Cafe Menu',
  description: 'Digital QR Menu - Casa Cafe, Bengaluru | Fresh Juices, Mojitos, Cold Coffee, Shakes & More',
  keywords: 'casa cafe, firenza, bengaluru cafe, qr menu, digital menu, offers',

  // === Favicon setup ===
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },               // classic .ico
      { url: '/icon0.svg', sizes: 'any', type: 'image/svg+xml' }, // your SVG favicon
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // === Link preview / social sharing (OG + Twitter) ===
  openGraph: {
    title: 'Casa Cafe Menu',
    description: 'Scan to view our premium menu – Fresh juices, mojitos, shakes, burgers, desserts & evening specials.',
    url: 'https://your-vercel-domain.vercel.app', // ← CHANGE TO YOUR REAL VERCEL URL
    siteName: 'Casa Cafe',
    images: [
      {
        url: '/og-image-white.jpg', // white logo version (good for light backgrounds)
        width: 1200,
        height: 630,
        alt: 'Casa Cafe Menu – Fresh & Premium',
      },
      {
        url: '/og-image-black.jpg', // golden logo on black (good for dark mode shares)
        width: 1200,
        height: 630,
        alt: 'Casa Cafe – Exclusively for Firenze',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Casa Cafe Menu',
    description: 'Digital QR Menu – Casa Cafe, Bengaluru',
    images: ['/og-image-white.jpg'], // can use white or black depending on preference
  },

  // Mobile/QR scan optimization
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Light theme color for browser bar */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body className="bg-white text-dark">
        {children}
      </body>
    </html>
  );
}