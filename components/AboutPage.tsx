"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AboutPage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Diamond, Lightbulb } from 'lucide-react'; // Icônes pour les valeurs

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const componentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du hero
      gsap.from(`.${styles.heroContent} > *`, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // Animation de la section "Notre Histoire"
      gsap.from(`.${styles.storySection} > *`, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.storySection}`,
          start: 'top 80%',
        },
      });

      // Animation des cartes "Nos Valeurs"
      gsap.from(`.${styles.valueCard}`, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.valuesGrid}`,
          start: 'top 80%',
        },
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.aboutContainer} ref={componentRef}>
      {/* Section Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroImage}>
          {/* Mettez ici une belle photo de votre équipe ou de votre atelier */}
          <Image src="/images/realisations/IMG_2746.jpg" alt="Atelier Business Alu" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>NOTRE HISTOIRE</p>
          <h1 className={styles.heroTitle}>La passion de l'aluminium, la précision du métier.</h1>
        </div>
      </section>

      {/* Section Notre Histoire */}
      <section className={styles.storySection}>
        <h2>Plus qu'une entreprise, une tradition d'excellence.</h2>
        <div className={styles.storyContent}>
          <p>
            Fondée sur des années d'expertise artisanale, Business Alu est née d'une vision simple : transformer un matériau noble, l'aluminium, en solutions esthétiques et durables pour l'habitat et les espaces professionnels. Chaque projet que nous entreprenons est le reflet de notre engagement indéfectible envers la qualité.
          </p>
          <p>
            De la conception à la pose, notre équipe d'experts vous accompagne pour donner vie à vos idées. Nous croyons en une approche collaborative, où l'écoute de vos besoins est la clé d'une réalisation parfaitement adaptée, qui traversera le temps avec élégance et fiabilité.
          </p>
        </div>
      </section>
      
      {/* Section Nos Valeurs */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesGrid}>
          {/* Valeur 1: Qualité */}
          <div className={styles.valueCard}>
            <Diamond size={40} className={styles.valueIcon} />
            <h3>Qualité Supérieure</h3>
            <p>Nous sélectionnons rigoureusement nos matériaux pour garantir une durabilité et une finition impeccables.</p>
          </div>
          {/* Valeur 2: Précision */}
          <div className={styles.valueCard}>
            <HardHat size={40} className={styles.valueIcon} />
            <h3>Savoir-Faire & Précision</h3>
            <p>Notre expertise technique assure une installation au millimètre près, pour une performance optimale.</p>
          </div>
          {/* Valeur 3: Innovation */}
          <div className={styles.valueCard}>
            <Lightbulb size={40} className={styles.valueIcon} />
            <h3>Innovation Constante</h3>
            <p>Nous intégrons les dernières technologies pour vous proposer des solutions modernes et performantes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
