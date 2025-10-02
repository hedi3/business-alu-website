"use client";
import Image from 'next/image';
import styles from './LoadingScreen.module.scss';

interface Props {
  loading: boolean;
}

export default function LoadingScreen({ loading }: Props) {
  return (
    <div className={`${styles.loaderContainer} ${!loading ? styles.hidden : ''}`}>
      <div className={styles.logoWrapper}>
        {/* Les deux parties du logo */}
        <Image 
          src="/images/logo_b.png" // Assurez-vous que le chemin est correct
          alt="Logo part B" 
          width={180}
          height={180} 
          className={styles.logoPartB}
          priority
        />
        <Image 
          src="/images/logo_a10.png" // Assurez-vous que le chemin est correct
          alt="Logo part A" 
          width={150} // Taille augmentée
          height={150} // Taille augmentée
          className={styles.logoPartA}
          priority
        />
        {/* Le nom et la tagline */}
        <div className={styles.textWrapper}>
        <Image
            src="/images/Copie_logo.png"
            alt="Business Alu"
            width={160}
            height={160}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}
