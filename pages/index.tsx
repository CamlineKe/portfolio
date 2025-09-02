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
  return (
    <>
      <Head>
        <title>Moses's Portfolio - MERN Fullstack Developer</title>
        <meta name="description" content="Professional portfolio of Moses's, a MERN fullstack developer specializing in Next.js and TypeScript. View projects, skills, and get in touch." />
        <meta name="keywords" content="Moses, Portfolio, MERN Stack, Fullstack Developer, Next.js, TypeScript, React, Node.js, MongoDB, Web Development" />
        <meta name="author" content="Moses" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Moses's Portfolio - MERN Fullstack Developer" />
        <meta property="og:description" content="Professional portfolio showcasing MERN stack expertise, Next.js projects, and TypeScript development skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://camline-portfolio.com" />
        <meta property="og:image" content="/images/avatar.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Moses's Portfolio - MERN Fullstack Developer" />
        <meta name="twitter:description" content="Professional portfolio showcasing MERN stack expertise, Next.js projects, and TypeScript development skills." />
        <meta name="twitter:image" content="/images/avatar.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        <link rel="canonical" href="https://camline-portfolio.com" />
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

