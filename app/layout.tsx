import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://openagentprotocol.org'),
  title: {
    default: 'Open Agent Protocol',
    template: '%s · Open Agent Protocol',
  },
  description:
    'An open standard for verifiable, accountable, interoperable AI agent communication. Identity, discovery, invocation, governance, accountability.',
  openGraph: {
    title: 'Open Agent Protocol',
    description:
      'An open standard for verifiable, accountable, interoperable AI agent communication.',
    type: 'website',
    siteName: 'Open Agent Protocol',
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
