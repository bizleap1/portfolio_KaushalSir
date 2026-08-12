import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Marquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Basic continuous marquee
      const tl = gsap.to(textRef.current, {
        x: '-50%',
        ease: 'none',
        duration: 20,
        repeat: -1,
      });

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Adjust timeScale based on scroll velocity
          const velocity = self.getVelocity();
          const targetTimeScale = 1 + Math.abs(velocity / 1000);
          
          gsap.to(tl, {
            timeScale: targetTimeScale,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(tl, { timeScale: 1, duration: 1, ease: 'power2.out' });
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = [
    { text: "DESIGN", type: "outline" },
    { text: "DEVELOP", type: "gold" },
    { text: "DELIVER", type: "outline" },
    { text: "SCALE", type: "white" },
  ];

  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <section ref={containerRef} className="py-24 bg-black-deep overflow-hidden flex items-center border-y border-white-primary/10">
      <div 
        ref={textRef} 
        className="flex whitespace-nowrap will-change-transform"
      >
        {repeatedWords.map((word, i) => (
          <span
            key={i}
            className={`font-display text-[10vw] lg:text-[8vw] uppercase tracking-wider mx-8 select-none
              ${word.type === 'outline' ? 'text-outline-charcoal hover:text-outline' : ''}
              ${word.type === 'gold' ? 'text-gold-primary' : ''}
              ${word.type === 'white' ? 'text-white-primary' : ''}
            `}
          >
            {word.text}
          </span>
        ))}
      </div>
    </section>
  );
};
