import { ThemeProvider } from '@/components/wrappers/theme-provider';

import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/wrappers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'MeetUp',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          rel='icon'
          type='image/png'
          href='/favicon-dark.png'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-light.png'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/favicon-dark.svg'
          media='(prefers-color-scheme: dark)'
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/favicon-light.svg'
          media='(prefers-color-scheme: light)'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
