import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { caseStudies } from '../data/caseStudies.ts';
import { paths } from '../data/site.ts';

gsap.registerPlugin(ScrollTrigger);

export const WorkAndCaseStudies = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animations removed for instant loading
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-32 px-6 md:px-16 bg-transparent relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        <div ref={titleRef} className="flex flex-col mb-20">
          <div className="overflow-hidden pb-2">
            <span className="work-title-anim font-sans text-gold-primary text-xl font-light mb-8 inline-block origin-bottom">
              <span className="text-white-primary uppercase text-xs tracking-[0.3em]">Work</span>
            </span>
          </div>
          <div className="overflow-hidden pb-4">
            <h2 className="work-title-anim font-display text-5xl md:text-7xl xl:text-[90px] text-white-primary tracking-wide uppercase leading-[0.95] origin-bottom inline-block">
              Selected <span className="text-gold-primary">Case Studies</span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-1000">
          {caseStudies.map((study) => (
            <div key={study.id} tabIndex={0} className="cursor-pointer group relative bg-black-secondary border border-white-primary/10 overflow-hidden hover:border-gold-primary/50 focus:border-gold-primary/50 transition-all duration-700 hover:-translate-y-2 focus:-translate-y-2 hover:shadow-[0_20px_40px_rgba(196,145,0,0.1)] focus:shadow-[0_20px_40px_rgba(196,145,0,0.1)] outline-none flex flex-col justify-between h-full min-h-[450px]">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0 bg-black-deep">
                <img src={study.image} alt={`${study.title} – ${study.category} case study by Bizleap`} width={study.imageWidth} height={study.imageHeight} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-focus:opacity-70 group-hover:scale-110 group-focus:scale-110 transition-all duration-1000 ease-out mix-blend-luminosity group-hover:mix-blend-normal group-focus:mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/70 to-transparent transition-opacity duration-700 group-hover:opacity-60 group-focus:opacity-60"></div>
              </div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between transform transition-transform duration-700 group-hover:translate-y-[-8px]">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-sans text-xs text-gold-primary uppercase tracking-widest inline-block transform transition-transform duration-500 group-hover:translate-x-2">{study.category}</span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-4xl text-white-primary mb-6 leading-tight group-hover:text-gold-primary transition-colors duration-500">
                    {study.title}
                  </h3>
                  
                  <p className="font-sans text-sm md:text-base text-grey-secondary leading-relaxed font-light mb-12 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {study.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {study.tags.map((tag, i) => (
                    <span key={i} className="font-sans text-[10px] uppercase tracking-wider px-4 py-2 border border-white-primary/20 bg-black-deep/50 backdrop-blur-md text-white-primary rounded-full group-hover:border-gold-primary/40 group-hover:bg-gold-primary/10 transition-all duration-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a href={paths.caseStudies} className="font-sans text-xs font-bold uppercase tracking-widest text-gold-primary border border-gold-primary/40 px-8 py-4 hover:bg-gold-primary hover:text-black-deep transition-colors duration-500" data-cursor="interactable">
            View all case studies
          </a>
        </div>

      </div>
    </section>
  );
};
