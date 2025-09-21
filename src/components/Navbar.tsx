import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Documentation", path: "/docs" },
    { name: "Download", path: "/download" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[70%] md:w-[70%] z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl px-8 py-2 items-center justify-center animate-fade-in">
        <div className="flex gap-16">
          {links.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-6 py-1 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg border border-white/30 backdrop-blur-md"
                    : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md"
                }`
              }
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Navbar */}
      
      <div className="md:hidden relative">
        <div className={`transition-all duration-500 ease-in-out ${
          isOpen 
            ? "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4" 
            : "flex justify-center"
        }`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isOpen
                ? "p-3 rounded-xl bg-white/20 text-white mb-4 w-full flex items-center justify-center"
                : "p-4 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 text-white shadow-lg hover:bg-white/25"
            }`}
          >
            <div className="relative">
              <FiMenu 
                size={24} 
                className={`transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}
              />
              <FiX 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}
              />
            </div>
          </button>

          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="flex flex-col gap-3">
              {links.map((link, index) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-center ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg border border-white/30 backdrop-blur-md"
                        : "text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md"
                    }`
                  }
                  style={{ 
                    animationDelay: `${(index + 1) * 100}ms`,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-20px)'
                  }}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl animate-pulse" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

