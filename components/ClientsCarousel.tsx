import Image from 'next/image';
import styles from './ClientsCarousel.module.scss';

// --- À METTRE À JOUR ---
// Ajoutez ici les chemins vers les logos de vos clients/partenaires.
// Pour un meilleur rendu, utilisez des logos PNG avec fond transparent.
const clientLogos = [
  { src: '/images/logo1.png', alt: 'Client 1' },
  { src: '/images/logo_b.png', alt: 'Client 2' },
  { src: '/images/logo_a.png', alt: 'Client 3' },
  { src: '/images/logo_a3.png', alt: 'Client 4' },
  { src: '/images/logo_a10.png', alt: 'Client 5' },
  { src: '/images/logo.png', alt: 'Client 6' },
  // Ajoutez autant de logos que vous le souhaitez...
];

export default function ClientsCarousel() {
  // On duplique la liste des logos pour créer un effet de boucle infinie parfait.
  const extendedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className={styles.clientsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ils nous font confiance</h2>
        <p className={styles.subtitle}>
          Nous sommes fiers de collaborer avec des entreprises et des particuliers exigeants.
        </p>
      </div>
      <div className={styles.scroller}>
        <div className={styles.scrollerInner}>
          {extendedLogos.map((logo, index) => (
            <div className={styles.logoItem} key={index}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
