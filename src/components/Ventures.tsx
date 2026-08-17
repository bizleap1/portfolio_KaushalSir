import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ventures = [
  {
    id: 1,
    title: 'Bizleap',
    type: 'Digital Marketing Agency',
    desc: 'A specialized team of 35+ professionals scaling brands across diverse sectors.',
    image: '/bizleap_bg.png'
  },
  {
    id: 2,
    title: 'Banginwar Marketing',
    type: 'Agriculture Business',
    desc: 'Modernizing agriculture through strategic retail and agritech marketing.',
    image: '/banginwar_bg.png'
  },
  {
    id: 3,
    title: 'AAI',
    type: 'AI Software & Product',
    desc: 'Building next-gen AI tools designed for marketing precision and automation.',
    image: '/aai_bg.png'
  },
  {
    id: 4,
    title: 'Asaawad by vijaye',
    type: 'Restaurant Venture',
    desc: 'Redefining gourmet experiences through premium storytelling and hospitality.',
    image: '/asaawad_bg.png'
  },
  {
    id: 5,
    title: 'Modicare',
    type: 'Franchised Business Network',
    desc: 'Leading a massive distribution network of 2,000+ individuals, focused on self-growth and sales operations.',
    image: '/modicare_bg.png'
  }
];

export const Ventures = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.venture-title-anim',
        { opacity: 0, y: 150, rotationZ: 10, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotationZ: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, y: 100, rotationX: 15, scale: 0.9, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="ventures" className="py-32 px-6 md:px-16 bg-transparent relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center mb-24 w-full">
          <div className="overflow-hidden pb-2">
            <span className="venture-title-anim font-sans text-gold-primary text-xl font-light mb-8 inline-block origin-bottom">
              <span className="text-white-primary uppercase text-xs tracking-[0.3em]">Ventures</span>
            </span>
          </div>
          <div className="overflow-hidden pb-4">
            <h2 className="venture-title-anim font-display text-5xl md:text-7xl xl:text-[90px] text-white-primary tracking-wide uppercase leading-none origin-bottom inline-block">
              Current <span className="text-gold-primary">Ecosystem</span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto perspective-1000 auto-rows-[minmax(300px,auto)]">
          {ventures.map((venture, index) => {
            
            // Bento Grid Layout Logic
            let layoutClasses = "";
            if (index === 0) layoutClasses = "md:col-span-2 lg:col-span-2 lg:row-span-2"; // Hero Card
            else if (index === 1) layoutClasses = "md:col-span-1 lg:col-span-1"; 
            else if (index === 2) layoutClasses = "md:col-span-1 lg:col-span-1"; 
            else if (index === 3) layoutClasses = "md:col-span-1 lg:col-span-1"; 
            else if (index === 4) layoutClasses = "md:col-span-1 lg:col-span-2"; // Bottom Wide Card

            return (
              <div key={venture.id} className={`group relative bg-black-secondary border border-white-primary/10 p-8 md:p-12 hover:border-gold-primary/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(196,145,0,0.1)] flex flex-col justify-between overflow-hidden ${layoutClasses}`}>
                
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-black-deep">
                  <img src={venture.image} alt={venture.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-deep/40 to-transparent transition-opacity duration-700 group-hover:opacity-40"></div>
                </div>

                <div className="relative z-10 transform transition-transform duration-700 group-hover:translate-y-[-4px]">
                  <span className="font-sans text-[10px] md:text-xs text-gold-primary uppercase tracking-widest mb-6 inline-block transform transition-transform duration-500 group-hover:translate-x-2">
                    {venture.type}
                  </span>
                  
                  <h3 className={`font-display text-white-primary mb-6 leading-none group-hover:text-gold-primary transition-colors duration-500 ${index === 0 ? 'text-5xl md:text-7xl lg:text-[80px]' : 'text-3xl md:text-4xl'}`}>
                    {venture.title}
                  </h3>
                </div>
                
                <div className={`relative z-10 mt-auto transform transition-transform duration-700 group-hover:translate-y-[-4px] ${index === 0 ? 'max-w-xl' : ''}`}>
                  <p className={`font-sans text-white-primary leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity duration-500 ${index === 0 ? 'text-base md:text-lg' : 'text-sm'}`}>
                    {venture.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
