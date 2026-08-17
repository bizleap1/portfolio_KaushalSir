import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic zoom-out and fade-in effect on scroll
      gsap.fromTo(
        videoRef.current,
        { scale: 1.1, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden bg-black-deep">
      {/* Overlay to give it a cinematic, contrast-heavy feel */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none mix-blend-multiply"></div>
      
      {/* Top & Bottom Cinematic Black Bars (Letterbox effect) */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-black z-20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-black z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"></div>

      <video
        ref={videoRef}
        src="/the walk.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>
    </section>
  );
};
