import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events, speakingPhoto } from '../data/events.ts';
import { facts, paths } from '../data/site.ts';

gsap.registerPlugin(ScrollTrigger);

export const Events = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="events" className="py-32 px-6 md:px-16 bg-transparent relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side - Title & Image */}
        <div className="col-span-1 lg:col-span-4 flex flex-col">
          <div className="sticky top-32">
            <span className="font-sans text-gold-primary text-xl font-light mb-8 block">
              <span className="text-white-primary uppercase text-xs tracking-[0.3em]">Events</span>
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-white-primary tracking-wide uppercase leading-none mb-12">
              Public{' '}<br />
              <span className="text-gold-primary">Speaking</span>
            </h2>
            <div className="relative group overflow-hidden rounded-xl border border-white-primary/10">
              <img src={speakingPhoto.src} alt={speakingPhoto.alt} width={speakingPhoto.width} height={speakingPhoto.height} loading="lazy" decoding="async" className="w-full h-auto aspect-[4/5] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Event List */}
        <div ref={contentRef} className="col-span-1 lg:col-span-8 flex flex-col gap-8 lg:pl-12 lg:pt-[4.5rem]">
          <p className="font-sans text-white-primary text-xl md:text-2xl font-medium leading-snug mb-12 max-w-2xl">
            At 21, I've had the privilege of speaking at {facts.institutionsSpoken}+ <span className="text-gold-primary">prestigious institutions</span>. My mission is to democratize access to <span className="text-gold-primary">high-level marketing strategies</span> and help the next generation of entrepreneurs build brands that <span className="text-gold-primary italic">thrive.</span>
          </p>

          {events.map((event) => (
            <div key={event.id} className="group relative border-t border-white-primary/10 pt-8 pb-4 hover:border-gold-primary transition-colors duration-500">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                <div className="md:w-1/3">
                  <span className="inline-block font-sans text-[10px] text-gold-primary uppercase tracking-widest mb-2 border border-gold-primary/30 px-3 py-1 rounded-full">
                    {event.role}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl text-white-primary group-hover:text-gold-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                </div>

                <div className="md:w-2/3 md:pl-8 md:pt-9">
                  <h4 className="font-sans text-lg text-white-primary mb-3 font-medium">
                    {event.topic}
                  </h4>
                  <p className="font-sans text-sm text-grey-secondary leading-relaxed font-light">
                    {event.desc}
                  </p>
                </div>
                
              </div>
            </div>
          ))}

          <div className="pt-4">
            <a href={paths.speaking} className="font-sans text-xs font-bold uppercase tracking-widest text-gold-primary hover:text-white-primary transition-colors duration-300" data-cursor="interactable">
              All speaking engagements &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
