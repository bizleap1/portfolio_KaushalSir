import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedProject = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Image expands to fullscreen on scroll
      gsap.to(imageContainerRef.current, {
        width: '100%',
        borderRadius: '0px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: true,
        },
      });

      // Image shrinks back
      gsap.to(imageContainerRef.current, {
        width: '65%',
        borderRadius: '16px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-48 bg-black-charcoal overflow-hidden min-h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        
        {/* Expanding Image */}
        <div 
          ref={imageContainerRef}
          className="absolute z-0 w-[65%] h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl pointer-events-auto shadow-2xl"
          data-cursor="project"
        >
          <img 
            src="https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?q=80&w=2069&auto=format&fit=crop" 
            alt="Featured Project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black-deep/20" />
        </div>

        {/* Text Overlay (appears when centered) */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 flex justify-end pointer-events-none">
          <div className="bg-black-deep/90 backdrop-blur-md p-8 md:p-12 w-full max-w-lg border border-white-primary/10 pointer-events-auto shadow-2xl transform translate-y-12">
            <span className="font-sans text-[10px] text-gold-primary tracking-[0.3em] uppercase mb-4 block">
              Featured Project
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white-primary tracking-wide uppercase mb-2">
              PUKHRAJ
            </h2>
            <p className="font-sans text-xs text-grey-secondary tracking-widest uppercase mb-8">
              STERLING SILVER E-COMMERCE
            </p>

            <div className="flex flex-col gap-3 mb-10">
              <span className="font-sans text-[10px] text-grey-muted uppercase tracking-[0.2em]">Services:</span>
              <ul className="font-sans text-sm text-white-primary space-y-2">
                <li>UX/UI Design</li>
                <li>Full Stack Development</li>
                <li>E-Commerce Architecture</li>
                <li>Brand Experience</li>
              </ul>
            </div>

            <a href="/work/pukhraj" className="group flex items-center gap-4 text-xs font-sans tracking-[0.2em] uppercase text-white-primary hover:text-gold-primary transition-colors">
              View Case Study
              <div className="w-12 h-[1px] bg-white-primary group-hover:bg-gold-primary group-hover:w-16 transition-all duration-300 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t border-r border-current w-2 h-2 rotate-45 transform translate-x-1/2" />
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
