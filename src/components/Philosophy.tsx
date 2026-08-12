import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Philosophy = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    const goldWords = textRef.current.querySelectorAll('.gold-word');

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(words, 
        { y: '110%' },
        {
          y: '0%',
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      // Gold transition
      gsap.to(goldWords, {
        color: '#D8A928',
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-6 md:px-12 bg-black-secondary border-t border-white-primary/10 min-h-screen flex items-center">
      <div className="max-w-[1920px] mx-auto w-full">
        
        <div ref={textRef} className="flex flex-col gap-4">
          <div className="overflow-hidden">
            <h2 className="word inline-block font-display text-[10vw] md:text-[8vw] lg:text-[10vw] leading-[0.85] text-white-primary uppercase tracking-tight">
              Design With
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="word inline-block font-display text-[10vw] md:text-[8vw] lg:text-[10vw] leading-[0.85] text-white-primary uppercase tracking-tight">
              <span className="gold-word transition-colors duration-300">Purpose.</span>
            </h2>
          </div>
          <div className="overflow-hidden mt-8 md:mt-12">
            <h2 className="word inline-block font-display text-[10vw] md:text-[8vw] lg:text-[10vw] leading-[0.85] text-white-primary uppercase tracking-tight">
              Build For
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="word inline-block font-display text-[10vw] md:text-[8vw] lg:text-[10vw] leading-[0.85] text-white-primary uppercase tracking-tight">
              <span className="gold-word transition-colors duration-300">Performance.</span>
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};
