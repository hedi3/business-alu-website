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
          width={150} // Taille augmentée
          height={150} // Taille augmentée
          className={styles.logoPartB}
          priority
        />
        <Image 
          src="/images/logo_a10.png" // Assurez-vous que le chemin est correct
          alt="Logo part A" 
          width={130} // Taille augmentée
          height={130} // Taille augmentée
          className={styles.logoPartA}
          priority
        />
        {/* Le nom et la tagline */}
        <div className={styles.textWrapper}>
          <span className={styles.companyName}>
            business alu
          </span>
          <span className={styles.tagline}>
            MENUISERIE ALUMINIUM
          </span>
        </div>
      </div>
    </div>
  );
}
