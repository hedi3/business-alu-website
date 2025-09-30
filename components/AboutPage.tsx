"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AboutPage.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Award, 
  Users, 
  Target, 
  Shield, 
  Clock, 
  CheckCircle,
  Building2,
  Wrench,
  TrendingUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const componentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations - more specific targeting
      gsap.fromTo(`.${styles.heroSubtitle}`, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(`.${styles.heroTitle}`, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(`.${styles.heroDescription}`, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Story section animations
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

      // Story image animation
      gsap.from(`.${styles.storyImage}`, {
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.storyImage}`,
          start: 'top 85%',
        },
      });

      // Values section title animation
      gsap.fromTo(`.${styles.valuesSection} h2`, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.valuesSection}`,
            start: 'top 85%',
          },
        }
      );

      // Values section subtitle animation
      gsap.fromTo(`.${styles.valuesSection} .${styles.sectionSubtitle}`, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.valuesSection}`,
            start: 'top 85%',
          },
        }
      );

      // Values cards animations
      gsap.fromTo(`.${styles.valueCard}`, 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: `.${styles.valuesGrid}`,
            start: 'top 75%',
          },
        }
      );

      // Stats section title animation
      gsap.from(`.${styles.statsSection} h2`, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.statsSection}`,
          start: 'top 85%',
        },
      });

      // Stats cards animations with counter effect
      gsap.from(`.${styles.statCard}`, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: `.${styles.statsSection}`,
          start: 'top 80%',
        },
      });

            // Animate stat numbers
            gsap.utils.toArray(`.${styles.statNumber}`).forEach((stat) => {
        const element = stat as HTMLElement;
        const endValue = element.textContent;
        const numericValue = parseInt(endValue?.replace(/\D/g, '') || '0');
        
        gsap.fromTo(element, 
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
            },
          }
        );
      });

      // Team section animations
      gsap.from(`.${styles.teamCard}`, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.teamSection}`,
          start: 'top 80%',
        },
      });

      // Mission section animations
      gsap.from(`.${styles.missionContent}`, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.missionSection}`,
          start: 'top 80%',
        },
      });

      gsap.from(`.${styles.missionImage}`, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.missionSection}`,
          start: 'top 80%',
        },
      });

      // Mission points animation
      gsap.from(`.${styles.missionPoint}`, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: `.${styles.missionPoints}`,
          start: 'top 85%',
        },
      });

      // CTA section animations
      gsap.from(`.${styles.ctaContainer} > *`, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.ctaSection}`,
          start: 'top 80%',
        },
      });

            // Button hover animations
            gsap.utils.toArray(`.${styles.primaryButton}, .${styles.secondaryButton}`).forEach((button) => {
        const element = button as HTMLElement;
        element.addEventListener('mouseenter', () => {
          gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        element.addEventListener('mouseleave', () => {
          gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });

      // Removed parallax effect - hero image stays fixed

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.aboutContainer} ref={componentRef}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image 
            src="/images/image00002.jpeg" 
            alt="Business Alu - Expertise en aluminium" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>À PROPOS DE NOUS</p>
          <h1 className={styles.heroTitle}>
            L&apos;excellence en menuiserie aluminium depuis des générations
          </h1>
          <p className={styles.heroDescription}>
            Votre partenaire de confiance pour des solutions aluminium sur mesure, 
            alliant savoir-faire traditionnel et innovation moderne.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyText}>
            <h2 className={styles.sectionTitle}>Notre Histoire</h2>
            <p className={styles.storyIntro}>
              Depuis notre création, Business Alu s&apos;est imposé comme un acteur incontournable 
              dans le domaine de la menuiserie aluminium en Tunisie. Notre passion pour 
              l&apos;excellence et notre engagement envers la qualité nous ont permis de réaliser 
              des milliers de projets, de la simple fenêtre aux façades les plus complexes.
            </p>
            <p className={styles.storyContent}>
              Fondée sur des valeurs solides et une expertise technique reconnue, notre entreprise 
              a su évoluer avec son temps en intégrant les dernières innovations tout en préservant 
              l&apos;artisanat traditionnel. Chaque projet est une nouvelle opportunité de démontrer 
              notre savoir-faire et notre capacité à répondre aux défis les plus exigeants.
            </p>
          </div>
          <div className={styles.storyImage}>
            <Image 
              src="/images/image00018.jpeg" 
              alt="Notre atelier de production" 
              width={500} 
              height={400}
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <h2 className={styles.sectionTitle}>Nos Réalisations en Chiffres</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Building2 size={32} />
              </div>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Projets Réalisés</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Users size={32} />
              </div>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Années d&apos;Expérience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Award size={32} />
              </div>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Clients Satisfaits</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Wrench size={32} />
              </div>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Service Client</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <h2 className={styles.sectionTitle}>Nos Valeurs Fondamentales</h2>
          <p className={styles.sectionSubtitle}>
            Les principes qui guident notre travail et notre relation avec nos clients
          </p>
        <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Award size={40} />
              </div>
              <h3>Excellence & Qualité</h3>
              <p>
                Nous nous engageons à fournir des produits et services de la plus haute qualité, 
                en utilisant les meilleurs matériaux et techniques de fabrication.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Shield size={40} />
              </div>
              <h3>Fiabilité & Durabilité</h3>
              <p>
                Nos solutions sont conçues pour durer, offrant une performance optimale 
                et une résistance aux intempéries sur le long terme.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Target size={40} />
              </div>
              <h3>Précision & Savoir-Faire</h3>
              <p>
                Notre expertise technique et notre attention aux détails garantissent 
                une installation parfaite, au millimètre près.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Users size={40} />
              </div>
              <h3>Service Client</h3>
              <p>
                Nous privilégions une approche personnalisée, en écoutant vos besoins 
                et en vous accompagnant tout au long de votre projet.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <TrendingUp size={40} />
              </div>
              <h3>Innovation</h3>
              <p>
                Nous intégrons les dernières technologies et tendances pour vous proposer 
                des solutions modernes et performantes.
              </p>
            </div>
          <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Clock size={40} />
              </div>
              <h3>Respect des Délais</h3>
              <p>
                Nous nous engageons à respecter les échéances convenues, 
                sans compromettre la qualité de nos réalisations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.teamContainer}>
          <h2 className={styles.sectionTitle}>Notre Équipe</h2>
          <p className={styles.sectionSubtitle}>
            Des professionnels passionnés et expérimentés à votre service
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <Image 
                  src="/images/image00019.jpeg" 
                  alt="Notre équipe technique" 
                  width={300} 
                  height={250}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Équipe Technique</h3>
              <p>
                Nos techniciens qualifiés possèdent une expertise approfondie 
                dans l&apos;installation et la maintenance de tous types de menuiseries aluminium.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <Image 
                  src="/images/image00024.jpeg" 
                  alt="Notre équipe commerciale" 
                  width={300} 
                  height={250}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Conseillers Commerciaux</h3>
              <p>
                Nos conseillers vous accompagnent dans le choix de vos solutions, 
                en vous proposant les meilleures options adaptées à vos besoins.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <Image 
                  src="/images/image00025.jpeg" 
                  alt="Notre équipe de conception" 
                  width={300} 
                  height={250}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Bureau d&apos;Études</h3>
              <p>
                Nos ingénieurs et dessinateurs conçoivent des solutions sur mesure, 
                en respectant les normes techniques et esthétiques les plus exigeantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>Notre Mission</h2>
            <p className={styles.missionText}>
              Transformer vos espaces de vie et de travail avec des solutions aluminium 
              innovantes, durables et esthétiques. Nous nous engageons à être votre 
              partenaire de confiance pour tous vos projets de menuiserie, en alliant 
              tradition artisanale et innovation technologique.
            </p>
            <div className={styles.missionPoints}>
              <div className={styles.missionPoint}>
                <CheckCircle size={24} />
                <span>Solutions personnalisées adaptées à vos besoins</span>
              </div>
              <div className={styles.missionPoint}>
                <CheckCircle size={24} />
                <span>Matériaux de qualité supérieure et durables</span>
              </div>
              <div className={styles.missionPoint}>
                <CheckCircle size={24} />
                <span>Installation professionnelle par nos experts</span>
              </div>
              <div className={styles.missionPoint}>
                <CheckCircle size={24} />
                <span>Service après-vente et maintenance continue</span>
              </div>
            </div>
          </div>
          <div className={styles.missionImage}>
            <Image 
              src="/images/image00002.jpeg" 
              alt="Notre mission en action" 
              width={500} 
              height={400}
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2>Prêt à concrétiser votre projet ?</h2>
          <p>
            Contactez-nous dès aujourd&apos;hui pour un devis gratuit et personnalisé. 
            Notre équipe d&apos;experts est à votre disposition pour vous accompagner.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              Demander un Devis
            </button>
            <button className={styles.secondaryButton}>
              Nous Contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
