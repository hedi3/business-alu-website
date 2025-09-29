"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Slider.module.scss";

// Définissez la structure de vos données de slide
interface Slide {
  image: string;
  title: string;
  description: string;
}

// Définissez les props que votre composant accepte
interface Props {
  slides: Slide[];
}

const BANDS_COUNT = 4;
const AUTO_PLAY_DURATION = 7000;
const ANIMATION_DURATION = 1200;

export default function Slider({ slides }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // NOUVEL ÉTAT pour gérer les classes d'animation de manière fiable
  const [animationClass, setAnimationClass] = useState(''); 
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const changeSlide = useCallback((directionOrIndex: "next" | "prev" | number) => {
    if (isAnimating || slides.length <= 1) return;
    
    setIsAnimating(true);
    clearTimer();
    
    const direction = typeof directionOrIndex === 'string' 
        ? directionOrIndex 
        : (directionOrIndex > activeSlide ? 'next' : 'prev');

    const nextSlideIndex = typeof directionOrIndex === 'number'
        ? directionOrIndex
        : (direction === "next" ? (activeSlide + 1) % slides.length : (activeSlide - 1 + slides.length) % slides.length);

    // TEMPS 1 : On déclenche l'animation de SORTIE
    setAnimationClass(styles[direction]);

    // TEMPS 2 : Au milieu de l'animation...
    setTimeout(() => {
      // ...on change les données du slide...
      setActiveSlide(nextSlideIndex);
      // ...et on retire la classe pour déclencher l'animation d'ENTRÉE.
      setAnimationClass('');
    }, ANIMATION_DURATION / 2);

    // TEMPS 3 : À la fin de l'animation globale
    setTimeout(() => {
      setIsAnimating(false);
      // Restart timer after animation completes
      clearTimer();
      timerRef.current = setTimeout(() => changeSlide("next"), AUTO_PLAY_DURATION);
    }, ANIMATION_DURATION);

  }, [isAnimating, activeSlide, slides.length, clearTimer]);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => changeSlide("next"), AUTO_PLAY_DURATION);
  }, [changeSlide]);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, []);

  const bandWidth = 100 / BANDS_COUNT;

  return (
    <div className={styles.container} onMouseEnter={clearTimer} onMouseLeave={startTimer}>
      {/* On applique la classe d'animation ici, via l'état React */}
      <div className={`${styles.slider} ${animationClass}`}>
        <div className={styles.slideContent}>
          <h2>{slides[activeSlide].title}</h2>
          <p>{slides[activeSlide].description}</p>
        </div>
        <div className={styles.slideBands}>
          {Array.from({ length: BANDS_COUNT }).map((_, i) => (
            <div
              key={i}
              className={styles.band}
              style={{
                left: `${i * bandWidth}%`,
                width: `${bandWidth}%`,
                backgroundImage: `url(${slides[activeSlide].image})`,
                backgroundSize: `${BANDS_COUNT * 100}% 100%`,
                backgroundPosition: i === BANDS_COUNT - 1 ? '100% 0' : `${i * (100 / (BANDS_COUNT - 1))}% 0`,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className={styles.slideCounter}>{activeSlide + 1} / {slides.length}</div>
      <button className={`${styles.navButton} ${styles.prev}`} onClick={() => changeSlide("prev")} disabled={isAnimating}><span>←</span></button>
      <button className={`${styles.navButton} ${styles.next}`} onClick={() => changeSlide("next")} disabled={isAnimating}><span>→</span></button>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${activeSlide === index ? styles.active : ''}`}
            onClick={() => changeSlide(index)}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}