import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Common styles for nav items to reduce repetition
  const navItemStyles = "px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105";
  const coloredNavItemStyles = "bg-white text-gray-900 hover:shadow-2xl";
  const transparentNavItemStyles = "bg-black/90 backdrop-blur-sm text-white hover:bg-white/10";

  return (
    <nav className="bg-black text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
            Persona Journa
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/home" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              Home
            </Link>
            <Link to="/diary" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              Diary
            </Link>
            <Link to="/travel" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              Travel
            </Link>
            <Link to="/work" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              Work
            </Link>
            <Link to="/memories" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              Memories
            </Link>
            <Link to="/apj" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              APJ
            </Link>
            <Link to="/about" className={`${navItemStyles} ${transparentNavItemStyles}`}>
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`${navItemStyles} ${coloredNavItemStyles} ml-2`}
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col space-y-3 py-4 px-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl">
            <Link 
              to="/home"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/diary"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Diary
            </Link>
            <Link 
              to="/travel"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Travel
            </Link>
            <Link 
              to="/work"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Work
            </Link>
            <Link 
              to="/memories"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Memories
            </Link>
            <Link 
              to="/apj"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              APJ
            </Link>
            <Link 
              to="/about"
              className={`${navItemStyles} text-center ${transparentNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact"
              className={`${navItemStyles} text-center ${coloredNavItemStyles}`}
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}