// Navbar.tsx
'use client'; // kalau lu pakai Next.js 13+ dengan app router

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const navigateWindow = (url: string) => {
    window.location.href = url;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (e: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <nav ref={navbarRef} className="fixed left-0 w-full z-50 top-0">
      <div className="container mx-auto px-2 sm:px-4 backdrop-blur-md bg-white/15 shadow-md rounded-b-2xl">
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-shrink-0">
            <img src="/img/logo.png" alt="Logo" className="w-32 sm:w-48" />
          </div>

          <div className="flex justify-center space-x-4 lg:space-x-10 mx-auto">
            <a
              href="#hero"
              className="hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-sm lg:text-base"
            >
              HOME
            </a>
            <a
              href="#about"
              className="hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-sm lg:text-base"
            >
              ABOUT
            </a>
            <a
              href="#contact"
              className="hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-sm lg:text-base"
            >
              CONTACT
            </a>
          </div>

          <div className="relative">
            <div className="absolute h-10 w-28 sm:w-40 bg-black flex justify-center items-center rounded-full border-2 border-black text-black transform translate-x-1 translate-y-1">
              <p>Login</p>
            </div>
            <button
              className="relative h-10 w-28 sm:w-40 bg-yellow-400 flex justify-center items-center rounded-full border-2 border-black text-black active:transform active:translate-x-1 active:translate-y-1"
              onClick={() => navigateWindow('/login')}
            >
              <p>Login</p>
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <div
            className={`flex items-center justify-between pt-10 ${isMenuOpen ? 'bg-white' : ''}`}
          >
            <img src="/img/logo.png" alt="Logo" className="w-32" />
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`py-4 ${isMenuOpen ? '' : 'hidden'} bg-white rounded-b-2xl shadow-md px-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3">
              <a
                href="#hero"
                className="hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                HOME
              </a>
              <a
                href="#about"
                className="hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                className="hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
