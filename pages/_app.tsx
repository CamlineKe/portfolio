import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Moses's Portfolio - MERN Fullstack Developer | Next.js & TypeScript Expert" />
        <meta name="keywords" content="Moses, Portfolio, MERN, Fullstack Developer, Next.js, TypeScript, React, Node.js, MongoDB" />
        <meta name="author" content="Moses" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Moses's Portfolio" />
        <meta property="og:description" content="MERN Fullstack Developer | Next.js & TypeScript Expert" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/avatar.jpg" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Moses's Portfolio" />
        <meta name="twitter:description" content="MERN Fullstack Developer | Next.js & TypeScript Expert" />
        <meta name="twitter:image" content="/images/avatar.jpg" />

        <link rel="icon" href="/favicon.ico" />
        <title>Moses&apos;s Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

