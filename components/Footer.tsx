// Ce composant est marqué pour être rendu côté client.
"use client"; 

import Link from 'next/link';
import Image from 'next/image';
// Importation des icônes Instagram, TikTok, LinkedIn et Email.
import { FaInstagram, FaTiktok, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          
          {/* Logo et Copyright */}
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex justify-center md:justify-start items-center space-x-2">
              <Image 
                src="/images/logo.png" 
                alt="Alu Alimi Logo" 
                width={40}
                height={40}
                className="transition-transform hover:scale-105" 
              />
              <span className="text-xl font-bold text-white tracking-wide">
                Alu Alimi
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-sm">
              Votre partenaire de confiance pour toutes vos solutions en aluminium.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              © {new Date().getFullYear()} Alu Alimi. Tous droits réservés.
            </p>
          </div>

          {/* Liens de navigation */}
          <div className="flex flex-col md:flex-row md:space-x-12 mb-8 md:mb-0">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li><Link href="/services" className="hover:text-[#1e51a2] transition-colors duration-300">Services</Link></li>
                <li><Link href="/projets" className="hover:text-[#1e51a2] transition-colors duration-300">Projets</Link></li>
                <li><Link href="/realisations" className="hover:text-[#1e51a2] transition-colors duration-300">Réalisations</Link></li>
                <li><Link href="/apropos" className="hover:text-[#1e51a2] transition-colors duration-300">À Propos</Link></li>
              </ul>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-[#1e51a2] transition-colors duration-300">Nous Contacter</Link></li>
                <li><a href="mailto:contact@alualimi.dev" className="hover:text-[#1e51a2] transition-colors duration-300">contact@alualimi.dev</a></li>
              </ul>
            </div>
          </div>

          {/* Liens vers les réseaux sociaux */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold text-white mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/alualimi" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Profil Instagram"
                className="text-gray-400 hover:text-[#1e51a2] transition-colors duration-300 transform hover:scale-125"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://tiktok.com/@alualimi" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Profil TikTok"
                className="text-gray-400 hover:text-[#1e51a2] transition-colors duration-300 transform hover:scale-125"
              >
                <FaTiktok size={24} />
              </a>
              <a 
                href="https://linkedin.com/company/alualimi" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Profil LinkedIn"
                className="text-gray-400 hover:text-[#1e51a2] transition-colors duration-300 transform hover:scale-125"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="mailto:contact@alualimi.dev" 
                aria-label="Envoyez-nous un Email"
                className="text-gray-400 hover:text-[#1e51a2] transition-colors duration-300 transform hover:scale-125"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}