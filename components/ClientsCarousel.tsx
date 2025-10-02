import Image from 'next/image';
import styles from './ClientsCarousel.module.scss';

// --- À METTRE À JOUR ---
// Ajoutez ici les chemins vers les logos de vos clients/partenaires.
// Pour un meilleur rendu, utilisez des logos PNG avec fond transparent.
const clientLogos = [
  { src: '/images/logo1.png', alt: 'Client 1' },
  { src: '/images/logo_square.png', alt: 'Client 2' },
  { src: '/images/logo3.png', alt: 'Client 3' },
  { src: '/images/images__3_-removebg-preview.png', alt: 'Client 4' },
  { src: '/images/Logo-TotalEnergies-2021-1-removebg-preview.png', alt: 'Client 5' },
  { src: '/images/ste_cap_bon_de_travaux_socatra_logo-removebg-preview.png', alt: 'Client 6' },
  // Ajoutez autant de logos que vous le souhaitez...
];

export default function ClientsCarousel() {
  // On duplique la liste des logos pour créer un effet de boucle infinie parfait.
  const extendedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className={styles.clientsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Nos partenaires de confiance</h2>
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
