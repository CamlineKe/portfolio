import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import ThemeToggle from '../components/ThemeToggle';
import themeStyles from '../styles/ThemeToggle.module.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <div className={themeStyles.chrome}>
          <ThemeToggle />
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
