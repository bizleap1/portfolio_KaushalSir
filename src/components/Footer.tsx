export const Footer = () => {
  return (
    <footer className="bg-black-deep relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-10 flex flex-col items-center">
        <h2 
          className="font-display text-[7vw] sm:text-4xl md:text-[6vw] lg:text-[80px] leading-none text-white-primary tracking-widest mb-10 text-center cursor-default transition-colors duration-500 hover:text-gold-primary"
        >
          KAUSHAL BANGINWAR
        </h2>

        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 mb-10">
          {[
            { name: 'About', href: '#about' },
            { name: 'My Work', href: '#work' },
            { name: 'Case Study', href: '#work' },
            { name: 'Events', href: '#events' },
            { name: 'Ventures', href: '#ventures' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-sans text-xs font-medium uppercase tracking-widest text-grey-secondary hover:text-gold-primary transition-colors duration-300"
              data-cursor="interactable"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 mb-16">
          {[
            { 
              label: 'Instagram', 
              link: 'https://www.instagram.com/kaushalbanginwar.in/?hl=en',
              icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            },
            { 
              label: 'LinkedIn', 
              link: 'https://www.linkedin.com/in/kaushalbanginwar/',
              icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            },
            { 
              label: 'Email', 
              link: 'mailto:kaushalbanginwar@gmail.com',
              icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            }
          ].map((social) => (
            <a
              key={social.label}
              href={social.link}
              className="text-grey-muted hover:text-gold-primary transition-all duration-300 hover:scale-110"
              data-cursor="interactable"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="w-full flex justify-end items-center pt-8 border-t border-white-primary/5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-sans text-[10px] text-grey-muted tracking-widest uppercase hover:text-gold-primary transition-colors duration-300"
            data-cursor="interactable"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};
