import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tools = [
  "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", 
  "PostgreSQL", "Prisma", "MongoDB", "Supabase", "Vercel", 
  "AWS", "Figma", "GSAP", "Framer Motion", "Lenis"
];

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 md:px-12 bg-black-secondary border-t border-white-primary/5">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 md:items-start">
        
        <div className="md:w-1/3">
          <h2 className="font-display text-2xl md:text-3xl text-white-primary uppercase tracking-wide">
            Tools We <span className="text-gold-primary">Build</span> With
          </h2>
        </div>

        <div 
          ref={containerRef}
          className="md:w-2/3 flex flex-wrap gap-4"
        >
          {tools.map((tool, i) => (
            <motion.div
              key={tool}
              className="px-6 py-3 border border-white-primary/10 rounded-full bg-black-charcoal hover:border-gold-primary hover:bg-gold-primary/5 transition-colors duration-300 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              data-cursor="interactable"
            >
              <span className="font-sans text-[11px] md:text-xs text-grey-secondary tracking-widest uppercase">
                {tool}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
