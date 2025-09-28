"use client";
import { useEffect, useRef } from 'react';
import styles from './HomePage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Slider from '@/components/Slider';
import MultiLayerSlider from '@/components/MultiLayerSlider';
import { CheckCircle, Wind, PanelTopClose, Building2, RectangleHorizontal, Fence, Layers, GalleryHorizontalEnd, DoorClosed } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ClientsCarousel from '@/components/ClientsCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const componentRef = useRef(null);

  const slides = [
    { 
      image: "/images/card-1.jpeg",
      title: "Business Alu : L'Art de l'Aluminium", 
      description: "Nous transformons vos espaces avec des solutions élégantes, modernes et durables." 
    },
    { 
      image: "/images/card-4.jpeg",// Mettez une photo d'un projet sur mesure
      title: "Conception sur Mesure", 
      description: "Chaque projet est unique. Nous créons des solutions parfaitement adaptées à vos besoins et à votre style." 
    },
    { 
      image: "/images/card-3.jpeg", // Mettez une photo qui montre votre expertise technique
      title: "Qualité & Savoir-Faire", 
      description: "Notre expertise garantit une installation précise et des produits de haute qualité pour une satisfaction durable." 
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('section');
      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      });
      // Animation pour les cartes de service
      gsap.from(`.${styles.serviceItem}`, {
        opacity: 0,
        y: 50, // Animation verticale pour un effet plus doux
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15, // Délai entre chaque carte
        scrollTrigger: {
          trigger: `.${styles.servicesGrid}`,
          start: 'top 80%',
        }
      });
    }, componentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef}>
      <section className={styles.heroSection}>
        <Slider slides={slides} />
      </section>

      <section className={styles.introSection}>
        <div className={styles.introGrid}>
          <div className={styles.introText}>
            <h2 className={styles.sectionTitle}>Bienvenue chez Business Alu</h2>
            <p className={styles.sectionSubtitle}>
              Chez Business Alu, nous transformons l’aluminium et le verre en solutions élégantes, solides et durables. Que vous soyez particulier ou professionnel, nous vous accompagnons dans vos projets d’aménagement pour créer des espaces lumineux, sécurisés et esthétiques.
            </p>
          </div>
          <div className={styles.introLogo}>
            <Image src="/images/logo_blue.png"alt="Logo B" width={120} height={120} />
           
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Nos Réalisations sur Mesure</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><Wind size={32} /></div>
            <span className={styles.serviceName}>Fenêtres & Portes-fenêtres</span>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><PanelTopClose size={32} /></div>
            <span className={styles.serviceName}>Volets roulants</span>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><Building2 size={32} /></div>
            <span className={styles.serviceName}>Façades mur rideau</span>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><RectangleHorizontal size={32} /></div>
            <span className={styles.serviceName}>Cloisons vitrées</span>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><Fence size={32} /></div>
            <span className={styles.serviceName}>Garde-corps</span>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><Layers size={32} /></div>
            <span className={styles.serviceName}>Stores double jeu</span>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><GalleryHorizontalEnd size={32} /></div>
            <span className={styles.serviceName}>Pergolas & Balcons vitrés</span>
          </div>
          {/* NOUVEAU SERVICE AJOUTÉ */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}><DoorClosed size={32} /></div>
            <span className={styles.serviceName}>Portes de Garage</span>
          </div>
        </div>
      </section>

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseText}>
          <h2 className={styles.sectionTitle}>Pourquoi Nous Choisir ?</h2>
          <ul>
            <li><CheckCircle size={20} /> Expertise et savoir-faire dans la menuiserie aluminium</li>
            <li><CheckCircle size={20} /> Produits de haute qualité, robustes et élégants</li>
            <li><CheckCircle size={20} /> Conception et installation sur mesure</li>
            <li><CheckCircle size={20} /> Service client à l’écoute de vos besoins</li>
          </ul>
          <Link href="/contact" className={styles.ctaButton}>
            Obtenir un Devis
          </Link>
        </div>
        <div >
          <MultiLayerSlider
            beforeImage="/images/before.jpg"
            afterImage="/images/after.jpg"
          />
        </div>
      </section>
      <ClientsCarousel />

    </div>
  );
}

