import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Title mask reveal
      gsap.fromTo(
        titleRef.current,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      // Rows stagger reveal
      gsap.fromTo(
        rowsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="py-32 px-6 md:px-12 bg-black-deep min-h-screen">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="flex flex-col gap-6">
            <span className="font-sans text-gold-primary text-xl font-light"><span className="text-white-primary uppercase text-xs tracking-[0.3em]">What We Do</span></span>
            <div className="overflow-hidden py-2">
              <h2 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-8xl text-white-primary tracking-wide uppercase max-w-4xl leading-[0.9]">
                From Idea<br />
                To Digital <span className="text-gold-primary">Reality.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-white-primary/10">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { rowsRef.current[i] = el; }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 px-6 md:px-12 border-b border-white-primary/10 cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-gold-primary"
              data-cursor="interactable"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 relative z-10">
                <span className="font-sans text-xs md:text-sm text-grey-secondary group-hover:text-black-deep transition-colors duration-500 tracking-[0.2em]">
                  {service.id} —
                </span>
                <h3 className="font-display text-4xl md:text-6xl text-white-primary group-hover:text-black-deep transition-colors duration-500 tracking-wide uppercase">
                  {service.title}
                </h3>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 mt-6 md:mt-0 relative z-10 w-full md:w-auto">
                <p className="font-sans text-xs md:text-sm text-grey-muted group-hover:text-black-deep/80 transition-colors duration-500 max-w-xs leading-relaxed">
                  {service.description}
                </p>
                
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white-primary/20 group-hover:border-black-deep transition-all duration-500 shrink-0">
                  <svg className="w-5 h-5 text-white-primary group-hover:text-black-deep transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
