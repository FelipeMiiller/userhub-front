import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from 'src/components/providers';
import { GlobalDialog } from '@/components/dialogs/global-dialog';

import { Metadata } from 'next';

import { staticMetadata } from 'src/config/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = staticMetadata;
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <GlobalDialog />
        </Providers>
      </body>
    </html>
  );
}
