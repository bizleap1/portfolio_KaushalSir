import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '../data/timeline.ts';
import { facts, paths, person } from '../data/site.ts';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !topSectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const leftElements = Array.from(topSectionRef.current!.querySelector('.left-col')!.children);
      const rightElements = Array.from(topSectionRef.current!.querySelector('.right-col')!.children);

      gsap.fromTo(
        [...leftElements, ...rightElements],
        { 
          opacity: 0, 
          y: 100, 
          rotationX: -15,
          rotationY: 5,
          transformPerspective: 1000,
          scale: 0.9 
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          stagger: 0.1,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: topSectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Crazy Reveal for Journey Title
      gsap.fromTo(
        '.journey-line',
        { y: 150, rotationZ: 10, opacity: 0, scale: 0.8 },
        {
          y: 0,
          rotationZ: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.journey-title',
            start: 'top 85%',
          },
        }
      );

      // Timeline items animation - individual triggers
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item: any) => {
        
        gsap.fromTo(
          item.querySelector('.timeline-dot'),
          { scale: 0, opacity: 0, backgroundColor: '#000', rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            backgroundColor: '#C49100', // gold
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );

        gsap.fromTo(
          item.querySelector('.timeline-content'),
          { opacity: 0, x: () => (item.classList.contains('md:justify-start') ? -50 : 50), filter: 'blur(10px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="pt-32 pb-16 bg-transparent relative overflow-hidden">
      
      {/* Top About Section */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 mb-40 lg:mb-56 relative">
        <div ref={topSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Title & Quote */}
          <div className="col-span-1 lg:col-span-6 flex flex-col left-col">
            <span className="font-sans text-gold-primary text-xl font-light mb-8 block origin-left">
              <span className="text-white-primary uppercase text-xs tracking-[0.3em]">About {person.name}</span>
            </span>
            <h2 className="font-display text-5xl md:text-7xl xl:text-[90px] text-white-primary tracking-wide uppercase leading-[0.95] mb-12 origin-left">
              Beyond the{' '}<br />
              <span className="text-gold-primary">Entrepreneurial{' '}<br />Surface.</span>
            </h2>
            
            <div className="border-l-2 border-gold-primary pl-10 py-2 relative hidden lg:block mt-8 max-w-lg origin-left">
              <span className="absolute left-2 -top-1 text-7xl text-gold-primary opacity-20 font-serif leading-none">“</span>
              <p className="font-sans text-white-primary text-lg lg:text-xl font-light leading-relaxed relative z-10 pt-2">
                I didn't just build businesses. I built a philosophy. My mission is to help the next generation of entrepreneurs build brands that don't just survive, but <span className="italic text-gold-primary">thrive.</span>
              </p>
            </div>
          </div>

          {/* Right: Story & Stats */}
          <div className="col-span-1 lg:col-span-6 flex flex-col lg:pt-14 right-col">
            <div className="space-y-8 font-sans text-base md:text-lg text-grey-secondary leading-relaxed font-light mb-16 max-w-xl origin-left">
              <p className="text-sm md:text-base text-grey-secondary leading-relaxed">
                <strong className="font-medium text-white-primary">{person.name}</strong> is the {person.jobTitleInline} of {person.company}, a full-service digital marketing and technology agency in {person.city}, {person.region}. He started in network marketing at {facts.networkStartAge}, founded {person.company} in {facts.foundedYear}, and now leads a {facts.teamSize}+ member team that has worked with {facts.brands}+ brands.{' '}
                <a href={paths.about} className="text-gold-primary underline underline-offset-4 decoration-gold-primary/40 hover:decoration-gold-primary" data-cursor="interactable">Read the full profile</a>.
              </p>
              <p className="text-white-primary text-xl md:text-2xl font-medium leading-snug">
                At 15, while others worried about exams, I was building a 2,000-person network. That was my first lesson: <span className="text-gold-primary">execution is everything.</span>
              </p>
              <p>
                Growing up in a business family taught me that true marketing isn't about tricks or hacks. It's about understanding people, telling authentic stories, and delivering measurable results.
              </p>
            </div>

            {/* Stats */}
            <div className="pt-12 border-t border-white-primary/10 max-w-2xl origin-left">
              <p className="font-sans text-sm md:text-base text-gold-primary mb-10 italic opacity-90 text-center md:text-left">
                From a {facts.networkStartAge}-year-old with a dream to leading a {facts.teamSize}+ person agency.
              </p>
              <div className="grid grid-cols-3 divide-x divide-white-primary/10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:pr-8 px-2 md:px-0">
                  <span className="font-display text-4xl md:text-6xl text-white-primary mb-2 md:mb-3">{facts.teamSize}+</span>
                  <span className="font-sans text-[9px] md:text-xs text-grey-secondary uppercase tracking-[0.1em] md:tracking-[0.2em] max-w-[80px] md:max-w-none">Team Members</span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:px-8 px-2">
                  <span className="font-display text-4xl md:text-6xl text-white-primary mb-2 md:mb-3">{facts.brands}+</span>
                  <span className="font-sans text-[9px] md:text-xs text-grey-secondary uppercase tracking-[0.1em] md:tracking-[0.2em] max-w-[80px] md:max-w-none">Brands</span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-8 px-2">
                  <span className="font-display text-4xl md:text-6xl text-white-primary mb-2 md:mb-3">10k+</span>
                  <span className="font-sans text-[9px] md:text-xs text-grey-secondary uppercase tracking-[0.1em] md:tracking-[0.2em] max-w-[80px] md:max-w-none">Students Mentored</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Connector */}
        <div className="hidden md:block absolute left-1/2 -bottom-24 lg:-bottom-32 w-[1px] h-16 lg:h-24 bg-gradient-to-b from-white-primary/0 via-gold-primary/30 to-white-primary/0 -translate-x-1/2"></div>
      </div>

      {/* Bottom Section: Timeline */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 pb-32 relative">
        <div className="flex flex-col items-center text-center mb-24">
          <h3 className="font-display text-5xl md:text-7xl text-white-primary uppercase tracking-wide journey-title">
            <div className="overflow-hidden pb-2">
              <div className="journey-line inline-block origin-bottom">The Journey</div>
            </div>
            <div className="overflow-hidden">
              <div className="journey-line inline-block origin-bottom text-gold-primary">How We Got Here</div>
            </div>
          </h3>
        </div>
        
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Center Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white-primary/10 -translate-x-1/2"></div>
          
          <div className="space-y-16 md:space-y-24 relative">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`timeline-item relative group flex flex-col md:flex-row w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                  
                  {/* Timeline dot (Mobile left, Desktop center) */}
                  <div className="timeline-dot absolute left-0 md:left-1/2 top-0 md:top-2 w-4 h-4 rounded-full bg-black-secondary border-2 border-gold-primary shadow-[0_0_15px_rgba(196,145,0,0.5)] transition-colors duration-500 group-hover:bg-gold-primary md:-ml-2 z-10"></div>
                  
                  {/* Content Box */}
                  <div className={`timeline-content w-full md:w-1/2 pl-10 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-20 md:text-right' : 'md:pl-12 lg:pl-20 md:text-left'}`}>
                    <span className="inline-block py-1 px-3 bg-gold-primary/10 text-gold-primary font-sans text-xs tracking-widest mb-4 rounded-sm">
                      {item.year}
                    </span>
                    <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-white-primary mb-4 tracking-wide leading-none group-hover:text-gold-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm md:text-base text-grey-secondary leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};
