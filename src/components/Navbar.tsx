import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'My Work', href: '#work' },
    { name: 'Case Study', href: '#work' },
    { name: 'Events', href: '#events' },
    { name: 'Ventures', href: '#ventures' }
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-12 ${
          isScrolled || isMobileMenuOpen ? 'py-6 bg-black-deep/95 backdrop-blur-md border-b border-white-primary/10' : 'py-8 bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
      >
        <div className="w-8 hidden lg:block" />

        <nav className="hidden lg:flex items-center justify-center gap-14 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group relative font-sans text-sm font-bold uppercase tracking-[0.2em] text-white-primary/90 hover:text-gold-primary transition-colors"
              data-cursor="interactable"
            >
              {item.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-gold-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="w-8 hidden lg:block" />

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5 z-[60]" 
          data-cursor="interactable"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`w-full h-[1.5px] bg-white-primary transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <div className={`h-[1.5px] bg-white-primary transition-all duration-300 ${isMobileMenuOpen ? 'w-full -rotate-45 -translate-y-[4px]' : 'w-2/3'}`} />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black-deep/98 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="font-display text-3xl uppercase tracking-widest text-white-primary hover:text-gold-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
