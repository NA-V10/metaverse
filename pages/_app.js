import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <>
      <Head>
        <title>Metaversus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
        <Toaster position="top-center" />
      </SessionContextProvider>
    </>
  );
};

export default MyApp;