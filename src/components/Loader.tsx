import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black-deep"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onComplete}
    >
      <div className="relative overflow-hidden mb-8">
        {/* Decorative intro text — deliberately NOT a heading (the page's only <h1> lives in the Hero). */}
        <motion.p
          className="font-display text-5xl md:text-8xl tracking-widest text-gold-primary uppercase"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          K.B's Portfolio
        </motion.p>
      </div>
      
      <div className="w-64 h-[1px] bg-white-primary/20 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-gold-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};
