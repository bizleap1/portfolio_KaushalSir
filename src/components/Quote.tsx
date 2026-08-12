import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Quote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-black-deep relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        <motion.div 
          className="w-full bg-gold-primary rounded-3xl p-12 md:p-24 lg:p-32 flex flex-col items-center justify-center text-center overflow-hidden relative"
          style={{ y }}
        >
          {/* Subtle animated quote mark */}
          <div className="absolute top-8 left-12 opacity-10 font-accent italic text-[200px] leading-none text-black-deep pointer-events-none select-none">
            "
          </div>
          
          <h2 className="font-accent italic text-3xl md:text-5xl lg:text-7xl text-black-deep font-semibold max-w-4xl leading-[1.2] relative z-10">
            "Great digital products don't just look good.<br />
            They make businesses move."
          </h2>
          
          <span className="mt-12 font-sans text-xs uppercase tracking-[0.3em] text-black-charcoal font-bold relative z-10">
            Bizleap
          </span>
        </motion.div>

      </div>
    </section>
  );
};
