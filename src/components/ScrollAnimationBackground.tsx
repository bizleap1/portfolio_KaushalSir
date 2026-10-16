import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed background animation.
 *
 * Performance notes (this component used to fire 240 image requests / ~9.5 MB on page load):
 *  - frames are now 120 optimised WebP files (public/frames, ~2.4 MB in total)
 *  - only frame 1 is fetched immediately; the rest stream in AFTER the page has loaded, in small batches,
 *    during browser idle time
 *  - phones, data-saver and 2G connections load every 2nd frame (60 files, ~1.2 MB)
 *  - users with "reduce motion" enabled just get the still first frame
 *  - while a frame is still downloading, the closest earlier frame is drawn, so scrubbing never shows a blank canvas
 */
const FRAME_COUNT = 120;
const BATCH_SIZE = 6;

const frameUrl = (index: number) => `/frames/frame-${(index + 1).toString().padStart(3, '0')}.webp`;

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

export const ScrollAnimationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const container = containerRef.current;

    if (!canvas || !context || !container) return;

    const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const slowLink = !!connection && (connection.saveData === true || /(^|-)2g$/.test(connection.effectiveType ?? ''));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = window.innerWidth < 768 || slowLink ? 2 : 1;

    const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT).fill(undefined);
    let lastDrawn = 0;
    let cancelled = false;
    const timers: number[] = [];

    const draw = (img: HTMLImageElement) => {
      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (canvas.width - img.naturalWidth * ratio) / 2;
      const centerShiftY = (canvas.height - img.naturalHeight * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.naturalWidth, img.naturalHeight,
        centerShiftX, centerShiftY, img.naturalWidth * ratio, img.naturalHeight * ratio
      );
    };

    /** Draws the requested frame, or the closest earlier frame that has finished loading. */
    const drawFrame = (index: number) => {
      for (let i = index; i >= 0; i--) {
        const img = frames[i];
        if (img && img.complete && img.naturalWidth > 0) {
          lastDrawn = i;
          draw(img);
          return;
        }
      }
    };

    const load = (index: number) => {
      if (frames[index]) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = frameUrl(index);
      frames[index] = img;
    };

    // Frame 1 is the only image requested up-front.
    load(0);
    const first = frames[0]!;
    first.onload = () => drawFrame(lastDrawn);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(lastDrawn);
    };
    handleResize();

    // Stream the remaining frames in once the page itself has finished loading.
    if (!reduceMotion) {
      const queue: number[] = [];
      for (let i = step; i < FRAME_COUNT; i += step) queue.push(i);
      if (queue[queue.length - 1] !== FRAME_COUNT - 1) queue.push(FRAME_COUNT - 1);

      const pump = () => {
        if (cancelled) return;
        queue.splice(0, BATCH_SIZE).forEach(load);
        if (queue.length > 0) {
          const next = () => pump();
          if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(next, { timeout: 1500 });
          } else {
            timers.push(window.setTimeout(next, 120));
          }
        }
      };

      const start = () => {
        if (!cancelled) timers.push(window.setTimeout(pump, 400));
      };

      if (document.readyState === 'complete') start();
      else window.addEventListener('load', start, { once: true });
    }

    const playhead = { frame: 0 };

    const tl = reduceMotion
      ? null
      : gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1, // Smooth scrubbing
          },
        });

    tl?.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      onUpdate: () => {
        drawFrame(Math.floor(playhead.frame));
      },
    });

    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('resize', handleResize);
      tl?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full object-cover mix-blend-screen opacity-60" />
    </div>
  );
};
