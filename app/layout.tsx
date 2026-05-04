import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://openagentprotocol.eu'),
  title: {
    default: 'Open Agent Protocol',
    template: '%s · Open Agent Protocol',
  },
  description:
    'An open standard for verifiable, accountable, interoperable AI agent communication. Identity, discovery, invocation, governance, accountability.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Open Agent Protocol',
    description:
      'An open standard for verifiable, accountable, interoperable AI agent communication.',
    type: 'website',
    siteName: 'Open Agent Protocol',
    images: [
      {
        url: '/oap-social-preview.png',
        width: 1280,
        height: 640,
        alt: 'Open Agent Protocol: 24 RFCs, 10 papers, 23 schemas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Agent Protocol',
    description:
      'An open standard for verifiable, accountable, interoperable AI agent communication.',
    images: ['/oap-social-preview.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-ink-900 text-white antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
