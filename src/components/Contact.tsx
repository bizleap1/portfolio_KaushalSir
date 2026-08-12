import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.contact-title-anim',
        { opacity: 0, y: 150, rotationZ: 10, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotationZ: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="pt-32 pb-48 px-6 md:px-12 bg-black-secondary relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        <div className="flex flex-col mb-6">
          <div className="overflow-hidden pb-2">
            <span className="contact-title-anim font-sans text-gold-primary text-xl font-light inline-block origin-bottom">
              <span className="text-white-primary uppercase text-xs tracking-[0.3em]">Let's Connect</span>
            </span>
          </div>
        </div>

        {/* Large Typography */}
        <div className="mb-24 flex flex-col gap-1 lg:gap-2">
          <div className="overflow-hidden pb-2">
            <h2 className="contact-title-anim font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white-primary uppercase tracking-tight leading-none origin-bottom inline-block">
              Let's Build Something
            </h2>
          </div>
          <div className="overflow-hidden pb-2">
            <span className="contact-title-anim font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gold-primary uppercase tracking-tight leading-none origin-bottom inline-block">
              Impossible To Ignore.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          
          {/* Left Column */}
          <div className="flex flex-col items-start justify-start h-full py-2">
            <p className="font-sans text-sm md:text-base text-white-primary mb-12 md:mb-16 leading-relaxed">
              Ready to elevate your digital presence? We partner with ambitious brands to create experiences that drive real business growth.
            </p>
            
            <a href="mailto:kaushalbanginwar@gmail.com" className="group relative px-8 py-5 bg-gold-primary text-black-deep font-sans text-xs font-bold uppercase tracking-widest overflow-hidden" data-cursor="interactable">
              <span className="relative z-10 flex items-center gap-3">
                Start A Project
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
            </a>
          </div>

          {/* Right Column */}
          <div className="flex flex-col lg:items-end justify-end">
            <div className="w-full max-w-xl flex flex-col mt-16 lg:mt-0 border-t border-grey-secondary/20">
              {[
                { label: 'Email', value: 'kaushalbanginwar@gmail.com', link: 'mailto:kaushalbanginwar@gmail.com' },
                { label: 'Phone', value: '+91 812 812 1004', link: 'tel:+918128121004' },
                { label: 'Instagram', value: '@kaushalbanginwar.in', link: 'https://www.instagram.com/kaushalbanginwar.in/?hl=en' },
                { label: 'LinkedIn', value: 'Kaushal Banginwar', link: 'https://www.linkedin.com/in/kaushalbanginwar/' },
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.link} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 lg:py-8 border-b border-grey-secondary/20 hover:border-gold-primary transition-colors duration-500" 
                  data-cursor="interactable"
                >
                  <span className="font-sans text-[10px] md:text-xs text-grey-muted uppercase tracking-[0.3em] mb-2 sm:mb-0 group-hover:text-gold-primary transition-colors duration-500">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-base md:text-lg lg:text-xl text-white-primary group-hover:text-gold-primary transition-colors duration-500">
                      {item.value}
                    </span>
                    <svg className="w-4 h-4 text-white-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-primary transition-all duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
