import React, { useState } from 'react';

/**
 * WindHeader Component
 * 
 * Cinematographic header with 3-column layout for Camping Journey Equipaments MX
 * Features responsive design, dark theme, and smooth animations
 * 
 * @author Camping Journey Team
 * @version 1.0.0
 */
const WindHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ES');
  
  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Handle language change
  const changeLanguage = (lang: string) => setCurrentLanguage(lang);

  return (
    <header 
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/public/images/header-mountains-sunset.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "120px"
      }}
    >
      {/* Main header container - 3 column grid */}
      <div 
        className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center"
        style={{
          color: "#ffffff",
          fontFamily: "'Montserrat', sans-serif"
        }}
      >
        {/* Left Column - Navigation Menu */}
        <nav className="w-full md:w-1/3 order-3 md:order-1">
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center text-white mb-4"
            onClick={toggleMenu}
            style={{ transition: "all 0.3s ease" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span className="ml-2">Menu</span>
          </button>
          
          {/* Desktop menu */}
          <ul 
            className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-8 flex-col md:flex-row`}
            style={{ transition: "all 0.5s ease" }}
          >
            {['Itens', 'Pronta Entrega', 'Novidades', 'Wild News', 'Nossa História', 'Comunidade'].map((item, index) => (
              <li key={index} className="mb-3 md:mb-0">
                <a 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative text-white hover:text-yellow-300 transition-colors duration-300"
                  style={{
                    position: "relative",
                    textDecoration: "none",
                    padding: "0.25rem 0"
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.borderBottom = "2px solid #FBBF24";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.borderBottom = "2px solid transparent";
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Center Column - Logo and Slogan */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
          {/* Logo */}
          <div 
            className="rounded-full bg-black bg-opacity-50 p-3 mb-3"
            style={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.2)"
            }}
          >
            <img 
              src="/public/images/logo-camping-journey.png" 
              alt="Camping Journey Equipament" 
              className="w-full h-auto"
              style={{ maxWidth: "90px" }}
            />
          </div>
          
          {/* Slogan */}
          <h2 
            className="text-center text-white text-sm md:text-base"
            style={{
              fontWeight: "300",
              letterSpacing: "1px",
              maxWidth: "220px",
              lineHeight: "1.4"
            }}
          >
            Equipamentos para explorar o México com estilo
          </h2>
        </div>
        
        {/* Right Column - Controls and Assistant */}
        <div className="w-full md:w-1/3 flex justify-end items-center order-2 md:order-3 mb-6 md:mb-0">
          {/* Language Dropdown */}
          <div className="relative mr-6">
            <select
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              className="appearance-none bg-transparent text-white border border-white border-opacity-30 rounded-full px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              style={{
                fontSize: "0.875rem",
                transition: "all 0.3s ease"
              }}
            >
              <option value="PT" style={{ backgroundColor: "#1a1a1a" }}>PT</option>
              <option value="EN" style={{ backgroundColor: "#1a1a1a" }}>EN</option>
              <option value="ES" style={{ backgroundColor: "#1a1a1a" }}>ES</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          {/* Vic Assistant */}
          <div className="relative group">
            <button 
              className="rounded-full bg-yellow-500 p-2 hover:bg-yellow-400 transition-colors duration-300"
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Vic Assistant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            
            {/* Tooltip */}
            <div 
              className="absolute right-0 w-32 px-2 py-1 mt-2 bg-black bg-opacity-80 rounded text-white text-xs text-center opacity-0 group-hover:opacity-100"
              style={{
                transition: "opacity 0.3s ease",
                transform: "translateY(10px)",
                pointerEvents: "none"
              }}
            >
              Vic Assistant
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WindHeader;
