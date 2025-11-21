"use client";
import { useEffect, useRef } from 'react';
import styles from './ServicesPage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  DraftingCompass, 
  Building, 
  ShieldCheck, 
  Wind,
  DoorClosed,
  PanelTopClose,
  Building2,
  Fence,
  GalleryHorizontalEnd,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const componentRef = useRef(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(`.${styles.heroContent} > *`, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // Service cards animation
      const serviceCards = gsap.utils.toArray<HTMLElement>(`.${styles.serviceCard}`);
      serviceCards.forEach((card, index) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          }
        );
      });

      // Products animation - Fixed
      if (productsRef.current) {
        const productCards = productsRef.current.querySelectorAll(`.${styles.productCard}`);
        gsap.fromTo(productCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: productsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Features animation - Fixed
      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll(`.${styles.featureItem}`);
        gsap.fromTo(featureItems,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.15,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      
      // CTA animation
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
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>NOTRE EXPERTISE</span>
          <h1 className={styles.heroTitle}>
            Solutions Complètes en <br />
            <span className={styles.highlight}>Menuiserie Aluminium</span>
          </h1>
          <p className={styles.heroDescription}>
            Excellence, innovation et savoir-faire pour transformer vos projets en réalité
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Demander un Devis
              <ArrowRight size={20} />
            </Link>
            <Link href="/realisations" className={styles.secondaryButton}>
              Voir nos Réalisations
            </Link>
          </div>
        </div>
        <div className={styles.heroDecoration}>
          <div className={styles.decorCircle}></div>
          <div className={styles.decorCircle}></div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className={styles.mainServicesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>NOS SERVICES</span>
          <h2 className={styles.sectionTitle}>Ce que nous proposons</h2>
          <p className={styles.sectionDescription}>
            Des solutions sur mesure pour tous vos besoins en menuiserie aluminium
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {/* Service 1: Conception sur Mesure */}
          <div className={styles.serviceCard}>
            <div className={styles.cardIconWrapper}>
              <div className={styles.cardIcon}>
                <DraftingCompass size={36} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Conception sur Mesure</h3>
            <p className={styles.cardDescription}>
              Chaque projet est unique. Nous travaillons avec vous pour concevoir des solutions en aluminium qui s&apos;intègrent parfaitement à votre architecture et à vos besoins spécifiques.
            </p>
            <ul className={styles.cardList}>
              <li><CheckCircle size={18} /> Fenêtres et portes</li>
              <li><CheckCircle size={18} /> Vérandas et pergolas</li>
              <li><CheckCircle size={18} /> Garde-corps et clôtures</li>
            </ul>
            <div className={styles.cardFooter}>
              <Link href="/contact" className={styles.cardLink}>
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Service 2: Façades & Projets Commerciaux */}
          <div className={styles.serviceCard}>
            <div className={styles.cardIconWrapper}>
              <div className={styles.cardIcon}>
                <Building size={36} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Façades & Projets Commerciaux</h3>
            <p className={styles.cardDescription}>
              Nous réalisons des façades vitrées et des murs-rideaux pour les bâtiments professionnels, alliant esthétique moderne, performance énergétique et sécurité.
            </p>
            <ul className={styles.cardList}>
              <li><CheckCircle size={18} /> Murs-rideaux</li>
              <li><CheckCircle size={18} /> Revêtements de façade</li>
              <li><CheckCircle size={18} /> Entrées de magasins et bureaux</li>
            </ul>
            <div className={styles.cardFooter}>
              <Link href="/contact" className={styles.cardLink}>
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          {/* Service 3: Qualité & Installation */}
          <div className={styles.serviceCard}>
            <div className={styles.cardIconWrapper}>
              <div className={styles.cardIcon}>
                <ShieldCheck size={36} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>Qualité & Installation</h3>
            <p className={styles.cardDescription}>
              Notre engagement ne s&apos;arrête pas à la fabrication. Nos équipes de poseurs qualifiés assurent une installation précise, garantissant la longévité et la performance de nos produits.
            </p>
            <ul className={styles.cardList}>
              <li><CheckCircle size={18} /> Installation par des experts</li>
              <li><CheckCircle size={18} /> Contrôle qualité rigoureux</li>
              <li><CheckCircle size={18} /> Service après-vente réactif</li>
            </ul>
            <div className={styles.cardFooter}>
              <Link href="/contact" className={styles.cardLink}>
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products/Realizations Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>NOS PRODUITS</span>
          <h2 className={styles.sectionTitle}>Nos Réalisations sur Mesure</h2>
        </div>

        <div className={styles.productsGrid} ref={productsRef}>
          <div className={styles.productCard}>
            <div className={styles.productIcon}><Wind size={28} /></div>
            <h4>Fenêtres & Portes-fenêtres</h4>
          </div>
          <div className={styles.productCard}>
            <div className={styles.productIcon}><DoorClosed size={28} /></div>
            <h4>Portes d&apos;entrée</h4>
          </div>
          <div className={styles.productCard}>
            <div className={styles.productIcon}><PanelTopClose size={28} /></div>
            <h4>Volets roulants</h4>
          </div>
          <div className={styles.productCard}>
            <div className={styles.productIcon}><Building2 size={28} /></div>
            <h4>Façades mur rideau</h4>
          </div>
          <div className={styles.productCard}>
            <div className={styles.productIcon}><Fence size={28} /></div>
            <h4>Garde-corps</h4>
          </div>
          <div className={styles.productCard}>
            <div className={styles.productIcon}><GalleryHorizontalEnd size={28} /></div>
            <h4>Pergolas & Balcons vitrés</h4>
          </div>
        </div>
      </section>

      {/* Why Choose Us Features */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>NOS ATOUTS</span>
          <h2 className={styles.sectionTitle}>Pourquoi Nous Choisir ?</h2>
        </div>

        <div className={styles.featuresGrid} ref={featuresRef}>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>01</div>
            <h3>Expertise Reconnue</h3>
            <p>Plus de 20 ans d&apos;expérience dans la menuiserie aluminium</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>02</div>
            <h3>Qualité Premium</h3>
            <p>Matériaux de haute qualité et finitions impeccables</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>03</div>
            <h3>Service Personnalisé</h3>
            <p>Accompagnement sur mesure à chaque étape du projet</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>04</div>
            <h3>Garantie & SAV</h3>
            <p>Service après-vente réactif et garantie sur nos installations</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Prêt à donner vie à votre projet ?</h2>
          <p className={styles.ctaDescription}>
            Discutons de vos idées. Contactez-nous dès aujourd&apos;hui pour obtenir un devis gratuit et personnalisé.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>
              Demander un Devis Gratuit
              <ArrowRight size={20} />
            </Link>
            <a href="tel:+33123456789" className={styles.ctaButtonSecondary}>
              Appelez-nous
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}