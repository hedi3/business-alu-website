"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Realisation.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin GSAP pour les animations au scroll
gsap.registerPlugin(ScrollTrigger);

// Données des projets (inchangées)
const projets = [
  { image: "/images/card-1.jpeg", title: "Villa Moderne & Baies Vitrées", category: "Projet Résidentiel" },
  { image: "/images/card-2.jpeg", title: "Façade Vitrée Commerciale", category: "Projet Commercial" },
  { image: "/images/card-3.jpeg", title: "Cloison d'Intérieur Style Atelier", category: "Aménagement Intérieur" },
  { image: "/images/card-4.jpeg", title: "Fenêtres Panoramiques sur Piscine", category: "Projet Résidentiel" },
  { image: "/images/card-5.jpeg", title: "Portes-Fenêtres sur Terrasse", category: "Aménagement Extérieur" },
];

export default function RealisationsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Utiliser le contexte GSAP pour gérer les animations de manière fiable
    const ctx = gsap.context(() => {
      // 1. Animation du titre et du paragraphe d'introduction
      gsap.from(`.${styles.header} h1, .${styles.header} p`, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // 2. Animation de chaque carte de la galerie au défilement
      gsap.utils.toArray<HTMLElement>(`.${styles.projectCard}`).forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%', // Démarre quand le haut de la carte atteint 85% de l'écran
            toggleActions: 'play none none none', // Joue l'animation une seule fois
          },
        });
      });
    }, containerRef); // Scoper les animations à ce composant

    // Nettoyage des animations au démontage du composant
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.realisationsContainer} ref={containerRef}>
      <div className={styles.header}>
        <h1>Nos Réalisations</h1>
        <p>Découvrez la qualité et la précision de notre travail à travers une sélection de nos meilleurs projets.</p>
      </div>
      
      <div className={styles.galleryGrid}>
        {projets.map((projet, index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={projet.image}
                alt={projet.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.cardOverlay}>
              <div className={styles.cardContent}>
                <span className={styles.category}>{projet.category}</span>
                <h3 className={styles.title}>{projet.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

