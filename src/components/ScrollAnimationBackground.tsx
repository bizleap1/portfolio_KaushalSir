import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;

const currentFrame = (index: number) => 
  `/ezgif-6c2a44c725b2317f-jpg/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export const ScrollAnimationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const container = containerRef.current;
    
    if (!canvas || !context || !container) return;

    const img = new Image();
    img.src = currentFrame(0);

    const render = () => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (img.complete) {
        render();
      }
    };

    handleResize();

    img.onload = render;

    // Preload all frames
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const preloadImg = new Image();
      preloadImg.src = currentFrame(i);
      images.push(preloadImg);
    }

    const playhead = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      }
    });

    tl.to(playhead, {
      frame: frameCount - 1,
      ease: 'none',
      onUpdate: () => {
        const currentFrameIndex = Math.floor(playhead.frame);
        if (images[currentFrameIndex] && images[currentFrameIndex].complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const currentImg = images[currentFrameIndex];
            
            const hRatio = canvas.width / currentImg.width;
            const vRatio = canvas.height / currentImg.height;
            const ratio = Math.max(hRatio, vRatio);
            
            const centerShift_x = (canvas.width - currentImg.width * ratio) / 2;
            const centerShift_y = (canvas.height - currentImg.height * ratio) / 2;  

            context.drawImage(
                currentImg,
                0, 0, currentImg.width, currentImg.height,
                centerShift_x, centerShift_y, currentImg.width * ratio, currentImg.height * ratio
            );
        }
      }
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full object-cover mix-blend-screen opacity-60" />
    </div>
  );
};
