import { useState, useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { WorkAndCaseStudies } from '../components/WorkAndCaseStudies';
import { Events } from '../components/Events';
import { Ventures } from '../components/Ventures';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  
  // Initialize Lenis smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Small timeout to ensure GSAP scrolltriggers are refreshed after loader disappears
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <div className={`relative transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <WorkAndCaseStudies />
          <Events />
          <Ventures />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
};
