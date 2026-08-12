import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Bizleap transformed our idea into a complete digital platform. The attention to detail and design quality is unmatched.",
    name: "SARAH JENKINS",
    company: "Founder, Miraya"
  },
  {
    quote: "Working with them felt like an extension of our own team. They delivered a high-performance e-commerce experience.",
    name: "DAVID CHEN",
    company: "CEO, Pukhraj"
  },
  {
    quote: "They don't just build websites; they craft digital experiences that truly elevate the brand's perception in the market.",
    name: "ALEXANDER WRIGHT",
    company: "Director, ICW"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-black-charcoal border-t border-white-primary/5 overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-16 md:gap-8">
        
        <div className="md:w-1/3 flex flex-col justify-between">
          <div>

            <h2 className="font-display text-4xl md:text-5xl text-white-primary uppercase tracking-wider">
              Client<br />Words
            </h2>
          </div>
          
          <div className="hidden md:flex gap-4 mt-12">
            <button 
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-white-primary/20 flex items-center justify-center hover:border-gold-primary hover:text-gold-primary transition-colors text-white-primary"
              data-cursor="interactable"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-white-primary/20 flex items-center justify-center hover:border-gold-primary hover:text-gold-primary transition-colors text-white-primary"
              data-cursor="interactable"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:w-2/3 relative h-[400px] md:h-[500px] flex items-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full flex flex-col"
            >
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-white-primary uppercase tracking-wide leading-tight mb-12">
                "{testimonials[currentIndex].quote}"
              </h3>
              
              <div className="flex flex-col">
                <span className="font-sans text-sm md:text-base text-gold-primary tracking-widest uppercase mb-1">
                  {testimonials[currentIndex].name}
                </span>
                <span className="font-sans text-xs text-grey-secondary tracking-[0.2em] uppercase">
                  {testimonials[currentIndex].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex md:hidden gap-4 mt-8">
          <button 
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full border border-white-primary/20 flex items-center justify-center text-white-primary"
            data-cursor="interactable"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full border border-white-primary/20 flex items-center justify-center text-white-primary"
            data-cursor="interactable"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
