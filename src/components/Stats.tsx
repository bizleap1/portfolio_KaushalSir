import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Stats = () => {
  const containerRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const stats = [
    { value: 100, suffix: '+', label: 'WEBSITES BUILT' },
    { value: 20, suffix: '+', label: 'ACTIVE CLIENTS' },
    { value: 10, suffix: 'X', label: 'MULTIPLE INDUSTRIES' },
    { value: 100, suffix: '%', label: 'COMMITMENT TO DELIVERY' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el, i) => {
        if (!el) return;
        
        const targetValue = stats[i].value;
        
        gsap.fromTo(el, 
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-6 md:px-12 bg-black-deep flex items-center min-h-screen">
      <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
        
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center">
            <div className="font-display text-7xl md:text-8xl lg:text-9xl text-gold-primary tracking-wide mb-4 flex items-baseline">
              <span ref={(el) => { numbersRef.current[i] = el; }}>0</span>
              <span>{stat.suffix}</span>
            </div>
            <span className="font-sans text-xs md:text-sm text-white-primary uppercase tracking-[0.3em]">
              {stat.label}
            </span>
          </div>
        ))}

      </div>
    </section>
  );
};
