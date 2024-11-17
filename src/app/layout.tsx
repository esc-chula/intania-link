import '~/styles/globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { type Metadata } from 'next';

import { env } from '~/env';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
    </html>
  );
};

export default RootLayout;
