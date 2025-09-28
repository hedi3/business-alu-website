"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      <nav className="bg-[#1e51a2] px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo_.jpg" // Assurez-vous que ce chemin est correct
              alt="Business Alu logo"
              width={120}
              height={40}
              priority
              className="mr-3"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-200 rounded-lg lg:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icône Hamburger (visible quand le menu est fermé) */}
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              {/* Icône Croix (visible quand le menu est ouvert) */}
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link href="/" className={`block py-2 pr-4 pl-3 rounded lg:p-0 transition-colors ${pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className={`block py-2 pr-4 pl-3 rounded lg:p-0 transition-colors ${pathname === '/services' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/realisations" className={`block py-2 pr-4 pl-3 rounded lg:p-0 transition-colors ${pathname === '/realisations' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/apropos" className={`block py-2 pr-4 pl-3 rounded lg:p-0 transition-colors ${pathname === '/apropos' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`block py-2 pr-4 pl-3 rounded lg:p-0 transition-colors ${pathname === '/contact' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

