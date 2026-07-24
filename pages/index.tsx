import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const siteUrl = 'https://moses-maina-portfolio.vercel.app';
  const title = 'Moses Maina | Systems-Driven Software Engineer';
  const description = 'Portfolio of Moses Maina, a systems-driven software engineer building reliable custom software, scalable products, and secure production-ready systems.';
  const socialImage = `${siteUrl}/images/avatar.png`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Moses Maina, Systems-Driven Software Engineer, Custom Software, Full-Stack Engineering, Backend Engineering, Product Engineering, TypeScript, Node.js, React, PostgreSQL" />
        <meta name="author" content="Moses Maina" />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content="Portrait of Moses Maina" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:image:alt" content="Portrait of Moses Maina" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href={siteUrl} />
      </Head>

      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Home;
