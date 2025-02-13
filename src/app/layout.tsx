import '~/styles/globals.css';

import { type Metadata } from 'next';
import Script from 'next/script';
import { PublicEnvScript } from 'next-runtime-env';

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
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            env.NEXT_PUBLIC_GTM_ID ?? ''
          }`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${env.NEXT_PUBLIC_GTM_ID ?? ''}');
          `}
        </Script>
        <PublicEnvScript />
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
