import { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

const Counter = ({ num, suffix }: { num: number, suffix: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(0, num, {
        duration: 4, 
        delay: 1.5,
        ease: "linear",
        onUpdate(value) {
          node.textContent = Math.floor(value).toString();
        }
      });
      return () => controls.stop();
    }
  }, [num]);

  return (
    <span className="flex items-start">
      <span ref={nodeRef}>0</span>
      <span className="text-[0.6em] font-sans font-light opacity-90 mt-1 ml-0.5">{suffix}</span>
    </span>
  );
};
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    gsap.to(textRef.current, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(imageRef.current, {
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const stats = [
    { num: 3, suffix: '+', label: 'YEARS\nEXPERIENCE' },
    { num: 40, suffix: '+', label: 'PROJECTS\nCOMPLETED' },
    { num: 60, suffix: '+', label: 'HAPPY\nCLIENTS' },
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black-deep pt-12">
      
      {/* Background Giant Text - Left Aligned to match foreground */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden w-full max-w-[1920px] mx-auto px-6 md:px-16 z-0">
        <h1 
          ref={textRef}
          className="font-display font-normal opacity-90 whitespace-nowrap select-none leading-none tracking-normal relative -left-4 transform scale-y-[1.3] origin-center"
          style={{ 
            fontSize: 'clamp(15rem, 33vw, 45rem)',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png"), linear-gradient(180deg, #E0AE2B 0%, #D6A11F 35%, #8B6105 75%, #050505 100%)', 
            backgroundBlendMode: 'overlay, normal', 
            backgroundSize: '200px, auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          BIZLEAP
        </h1>
      </div>

      {/* Hero Visual Layer (Portrait) */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-end z-10 pointer-events-none">
        <motion.img
          ref={imageRef}
          src="/portrait-transparent.png"
          alt="Kaushal Portrait"
          className="w-full max-w-[800px] md:max-w-[1200px] lg:max-w-[1600px] h-[102vh] object-contain object-bottom transform origin-bottom mix-blend-lighten scale-[1.08]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
        />
      </div>

      <div className="relative z-20 w-full max-w-[1920px] mx-auto px-6 md:px-16 h-full flex flex-col justify-end md:justify-center pb-12 md:pb-0">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center w-full h-full relative pt-24 md:pt-0">
          
          {/* Left Content */}
          <div className="flex flex-col max-w-sm md:max-w-md lg:max-w-lg mb-12 md:mb-0 relative w-full -top-24 sm:-top-16 md:top-28">
            <motion.div 
              className="relative z-30 ml-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            >
              <span className="font-script text-[35px] md:text-[45px] lg:text-[55px] text-gold-primary tracking-normal block rotate-[-4deg] origin-left drop-shadow-lg" style={{ WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>
                Hello, We're
              </span>
            </motion.div>
            
            <div className="flex flex-col -mt-4 md:-mt-8 mb-4 md:mb-6">
              <motion.h2 
                className="font-display font-normal text-[65px] md:text-[90px] lg:text-[110px] leading-[0.85] text-white-primary tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
              >
                BIZLEAP
              </motion.h2>
              <motion.h2 
                className="font-display font-normal text-[65px] md:text-[90px] lg:text-[110px] leading-[0.85] text-white-primary tracking-tight uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
              >
                INC
              </motion.h2>
            </div>

            <motion.h3 
              className="font-sans text-[11px] md:text-[14px] lg:text-[16px] font-bold text-gold-primary mb-3 md:mb-5 leading-snug tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              WEB DESIGN &<br />DIGITAL PRODUCT STUDIO
            </motion.h3>

            <motion.p 
              className="font-sans text-[10px] md:text-[12px] text-white-primary max-w-[280px] md:max-w-[320px] mb-8 md:mb-12 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              We create premium websites, e-commerce stores, SaaS products, and digital experiences that help ambitious brands grow, engage, and lead in the digital world.
            </motion.p>

          </div>

          {/* Right Stats Stack */}
          <div className="flex flex-col gap-0 md:min-w-[180px] relative mt-16 md:mt-0 top-12 md:top-[140px]">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className={`flex items-center justify-between gap-5 py-5 ${i !== 0 ? 'border-t border-white-primary/10' : ''}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.5 + (i * 0.1) }}
              >
                <span className="font-display font-normal text-[30px] md:text-[40px] lg:text-[45px] text-white-primary tracking-normal leading-none">
                  <Counter num={stat.num} suffix={stat.suffix} />
                </span>
                <span className="font-sans text-[6px] md:text-[7px] lg:text-[8px] text-gold-primary uppercase tracking-[0.2em] whitespace-pre-line leading-[1.6]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
