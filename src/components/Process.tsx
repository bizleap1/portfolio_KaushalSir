import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { id: "01", title: "DISCOVER", description: "Understand goals, audience and business requirements." },
  { id: "02", title: "STRATEGIZE", description: "Plan architecture, UX and the digital direction." },
  { id: "03", title: "DESIGN", description: "Build visual systems and user experiences." },
  { id: "04", title: "DEVELOP", description: "Turn concepts into high-performance digital products." },
  { id: "05", title: "TEST", description: "Optimize responsiveness, functionality and speed." },
  { id: "06", title: "DELIVER", description: "Launch and support the final experience." },
];

export const Process = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate line filling up
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });

      // Animate nodes and text
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        const node = item.querySelector('.process-node');
        const text = item.querySelector('.process-text');
        
        gsap.to(node, {
          backgroundColor: '#D8A928',
          borderColor: '#D8A928',
          scrollTrigger: {
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          }
        });

        gsap.fromTo(text, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="process" className="py-32 px-6 md:px-12 bg-black-deep">
      <div className="max-w-[1920px] mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24">

          <h2 className="font-display text-4xl md:text-6xl text-white-primary uppercase tracking-wider">
            How We Work
          </h2>
        </div>

        <div className="relative w-full max-w-2xl mx-auto pl-12 md:pl-0">
          {/* Background Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white-primary/10 md:-translate-x-1/2" />
          
          {/* Animated Fill Line */}
          <div 
            ref={lineRef}
            className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gold-primary origin-top scale-y-0 md:-translate-x-1/2 z-0" 
          />

          <div className="flex flex-col gap-24 relative z-10">
            {stages.map((stage, i) => (
              <div 
                key={stage.id}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`flex flex-col md:flex-row items-start md:items-center w-full ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
              >
                {/* Desktop alternating layout needs some specific grid/flex trickery. 
                    Let's use absolute positioning for the node on desktop to keep it centered. */}
                
                {/* Node */}
                <div className="process-node absolute left-0 md:left-1/2 w-12 h-12 rounded-full border-2 border-white-primary/20 bg-black-deep flex items-center justify-center transform md:-translate-x-1/2 transition-colors duration-300">
                  <span className="font-display text-lg text-white-primary">{stage.id}</span>
                </div>

                {/* Text Content */}
                <div className={`process-text w-full md:w-[40%] flex flex-col ${i % 2 === 0 ? 'md:text-right md:pr-16 md:items-end' : 'md:text-left md:pl-16 md:ml-auto md:items-start'}`}>
                  <h3 className="font-display text-2xl md:text-3xl text-white-primary uppercase tracking-wide mb-2 mt-1 md:mt-0">
                    {stage.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-grey-secondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
