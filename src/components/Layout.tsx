import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "font-sans text-[32px] md:text-[40px] tracking-tight hover:opacity-70 transition-opacity font-semibold text-primary"
      : "font-sans text-[32px] md:text-[40px] tracking-tight hover:opacity-70 transition-opacity font-semibold text-secondary";
  };

  return (
    <div className="antialiased min-h-screen font-sans">
      
      {/* 
        Fixed Background: The "Cool Animation"
        This sits persistently behind the website. When the user reaches the footer 
        and natively overscrolls (rubber-bands) past the bottom of the page, this reveals itself! 
      */}
      <div className="fixed bottom-0 left-0 w-full h-[500px] -z-20 pointer-events-none bg-surface flex items-end overflow-hidden">
        <div 
          className="w-full h-full opacity-90"
          style={{
            background: "linear-gradient(to top, #0033ff 0%, #0088ff 25%, #ffcc00 60%, #ff0077 85%, transparent 100%)",
            filter: "blur(60px)",
            transform: "scale(1.1) translateY(100px)"
          }} 
        />
      </div>

      {/* Slide-out Menu */}
      <nav className={`fixed inset-y-0 left-0 w-full md:w-[400px] transform transition-transform duration-500 ease-in-out z-[60] flex flex-col pt-32 px-6 md:px-12 bg-surface border-r border-outline-variant shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
          <li><Link to="/" className={getLinkClass("/")} onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/work" className={getLinkClass("/work")} onClick={handleLinkClick}>Work</Link></li>
          <li><Link to="/about" className={getLinkClass("/about")} onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/contact" className={getLinkClass("/contact")} onClick={handleLinkClick}>Contact</Link></li>
        </ul>
      </nav>

      {/* Main Website Container (Normal flow, covers the fixed background) */}
      <div className="relative z-10 bg-surface min-h-screen flex flex-col">
        
        {/* TopAppBar */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 backdrop-blur-md border-b bg-surface/80 dark:bg-surface/80 border-outline-variant/30 shadow-md shadow-black/5 transition-all duration-300">
          <div className="flex items-center">
            <button 
              aria-label="Menu" 
              className={`flex flex-col gap-1.5 p-2 hover:opacity-80 transition-opacity duration-300 group ${isMenuOpen ? 'menu-active' : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-0.5 menu-slice-1 transition-colors bg-primary"></div>
              <div className="w-4 h-0.5 menu-slice-2 group-hover:w-6 transition-colors bg-primary"></div>
            </button>
          </div>
          <Link to="/" className="font-display text-headline-md tracking-tighter transition-colors text-primary dark:text-primary-fixed" onClick={handleLinkClick}>U. OGBUAKU</Link>
          <div className="w-10"></div>
        </header>

        {/* Page Content */}
        <main className="flex-grow pt-32 md:pt-48 relative">
          {children}
        </main>

        {/* Standard Footer - Normal Document Flow */}
        <footer className="w-full px-margin-mobile md:px-margin-desktop text-on-surface flex flex-col items-center pt-24 pb-16 mt-auto">
          {/* Footer Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-24 font-sans text-[11px] font-bold tracking-widest text-primary uppercase">
            <Link to="/" className="hover:opacity-50 transition-opacity" onClick={handleLinkClick}>Home</Link>
            <Link to="/work" className="hover:opacity-50 transition-opacity" onClick={handleLinkClick}>Work</Link>
            <Link to="/about" className="hover:opacity-50 transition-opacity" onClick={handleLinkClick}>About</Link>
            <Link to="/contact" className="hover:opacity-50 transition-opacity" onClick={handleLinkClick}>Contact</Link>
            <a href="mailto:ucogbuak@cougarnet.uh.edu" className="hover:opacity-50 transition-opacity">Email</a>
            <a href="https://linkedin.com/in/uchechukwu-ogbuaku-1a6145306/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity">LinkedIn</a>
          </div>

          <div className="flex flex-col items-center text-center w-full">
            <p className="font-sans text-[13px] font-bold tracking-widest text-primary mb-16 uppercase drop-shadow-sm">
              DESIGNED AND BUILT BY<br/>
              <a href="https://owport.vercel.app" target="_blank" rel="noreferrer" className="hover:opacity-50 hover:drop-shadow-lg transition-all duration-300 drop-shadow-md">
                OLUWADEMILADE WILLIAMS ONAOLAPO
              </a>
            </p>

            <div className="flex w-full md:w-4/5 justify-between items-center text-[10px] font-bold tracking-widest text-primary px-4 uppercase opacity-50">
              <span>© {new Date().getFullYear()}</span>
              <span>COPYRIGHT</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
