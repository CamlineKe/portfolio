import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { useLenis } from '../hooks/useLenis';
import 'lenis/dist/lenis.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useLenis();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
