import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });   
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Who We Are' },
    { path: '/services', label: 'Our Services' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className={`text-2xl font-bold tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              DigiOra<span className={scrolled ? 'text-red-600' : 'text-red-500'}>Media</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map(({ path, label }) => (
                <button
                  key={path}
                  onClick={() => handleNavClick(path)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${isActive(path)
                    ? scrolled ? 'text-red-600' : 'text-white'
                    : scrolled ? 'text-gray-700 hover:text-red-600' : 'text-gray-100 hover:text-white'
                    }`}
                >
                  {label}
                  {isActive(path) && (
                    <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${scrolled ? 'bg-red-600' : 'bg-white'
                      }`}></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none transition-colors ${scrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-gray-200'
                }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${isActive(path)
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;