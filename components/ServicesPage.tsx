"use client";
import { useEffect, useRef } from 'react';
import styles from './ServicesPage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DraftingCompass, Building, ShieldCheck } from 'lucide-react'; // Icônes pour les services
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const componentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du hero
      gsap.from(`.${styles.heroContent} > *`, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // Animation pour chaque carte de service
      gsap.utils.toArray<HTMLElement>(`.${styles.serviceCard}`).forEach(card => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
      
      // Animation pour la section CTA
       gsap.from(`.${styles.ctaSection} > *`, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.ctaSection}`,
          start: 'top 80%',
        },
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.servicesContainer} ref={componentRef}>
      {/* Section Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>NOTRE EXPERTISE</p>
          <h1 className={styles.heroTitle}>Des solutions complètes en menuiserie aluminium.</h1>
        </div>
      </section>

      {/* Grille des Services */}
      <section className={styles.servicesGrid}>
        {/* Service 1: Conception sur Mesure */}
        <div className={styles.serviceCard}>
          <div className={styles.cardIcon}><DraftingCompass size={32} /></div>
          <h3>Conception sur Mesure</h3>
          <p>Chaque projet est unique. Nous travaillons avec vous pour concevoir des solutions en aluminium qui s&apos;intègrent parfaitement à votre architecture et à vos besoins spécifiques.</p>
          <ul>
            <li>Fenêtres et portes</li>
            <li>Vérandas et pergolas</li>
            <li>Garde-corps et clôtures</li>
          </ul>
        </div>

        {/* Service 2: Façades & Projets Commerciaux */}
        <div className={styles.serviceCard}>
          <div className={styles.cardIcon}><Building size={32} /></div>
          <h3>Façades & Projets Commerciaux</h3>
          <p>Nous réalisons des façades vitrées et des murs-rideaux pour les bâtiments professionnels, alliant esthétique moderne, performance énergétique et sécurité.</p>
           <ul>
            <li>Murs-rideaux</li>
            <li>Revêtements de façade</li>
            <li>Entrées de magasins et bureaux</li>
          </ul>
        </div>
        
        {/* Service 3: Qualité & Installation */}
        <div className={styles.serviceCard}>
          <div className={styles.cardIcon}><ShieldCheck size={32} /></div>
          <h3>Qualité & Installation</h3>
          <p>Notre engagement ne s&apos;arrête pas à la fabrication. Nos équipes de poseurs qualifiés assurent une installation précise, garantissant la longévité et la performance de nos produits.</p>
           <ul>
            <li>Installation par des experts</li>
            <li>Contrôle qualité rigoureux</li>
            <li>Service après-vente réactif</li>
          </ul>
        </div>
      </section>
      
      {/* Section Appel à l'Action (CTA) */}
      <section className={styles.ctaSection}>
        <h2>Prêt à donner vie à votre projet ?</h2>
        <p>Discutons de vos idées. Contactez-nous dès aujourd&apos;hui pour obtenir un devis gratuit et personnalisé.</p>
        <Link href="/contact" className={styles.ctaButton}>
          Demander un Devis
        </Link>
      </section>
    </div>
  );
}
