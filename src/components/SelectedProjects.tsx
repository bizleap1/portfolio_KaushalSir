import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const SelectedProjects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal animations for cards
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        // Image parallax
        const img = card.querySelector('.project-image');
        if (img) {
          gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Entrance animation
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-32 px-6 md:px-12 bg-black-secondary border-t border-white-primary/10">
      <div className="max-w-[1920px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="flex items-start gap-4">

            <h2 className="font-display text-4xl md:text-6xl text-white-primary uppercase tracking-wider">
              Selected<br />Projects
            </h2>
          </div>
          <a href="/work" className="group flex items-center gap-4 text-xs font-sans tracking-[0.2em] uppercase text-grey-secondary hover:text-white-primary transition-colors" data-cursor="interactable">
            View All Projects
            <div className="w-12 h-[1px] bg-grey-secondary group-hover:bg-gold-primary group-hover:w-16 transition-all duration-300 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t border-r border-current w-2 h-2 rotate-45 transform translate-x-1/2" />
            </div>
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((project, i) => (
            <a
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              href={project.link}
              className={`group relative flex flex-col gap-6 ${i === 2 ? 'lg:col-span-2 lg:w-2/3 lg:mx-auto' : ''}`}
              data-cursor="project"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-black-charcoal">
                <div className="absolute inset-[-10%] z-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Subtle Gold Overlay */}
                <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-500 z-10 mix-blend-overlay" />
              </div>

              <div className="flex justify-between items-start">
                <div className="flex gap-4 md:gap-8">
                  <span className="font-display text-2xl md:text-4xl text-grey-muted group-hover:text-gold-primary transition-colors duration-300">
                    {project.id}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-display text-2xl md:text-4xl text-white-primary tracking-wide uppercase mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="font-sans text-[10px] md:text-xs text-grey-secondary uppercase tracking-widest">
                      {project.category}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="font-sans text-[10px] text-grey-muted tracking-widest hidden md:block">
                    {project.year}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white-primary/20 flex items-center justify-center group-hover:border-gold-primary group-hover:bg-gold-primary/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-white-primary group-hover:text-gold-primary transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
