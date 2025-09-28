"use client";
import { useEffect, useRef } from "react";
import styles from "./scroll.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  { leftX: -800, rightX: 800, y: 100, leftRot: -30, rightRot: 30, img: 1 },
  { leftX: -900, rightX: 900, y: -150, leftRot: -20, rightRot: 20, img: 3 },
  { leftX: -400, rightX: 400, y: -400, leftRot: -10, rightRot: 10, img: 5 },
];

export default function Scroll() {
  const componentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du texte
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.copy}`,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      contentTl.to(`.${styles.line} p`, { y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
      contentTl.to(`.${styles.btn} button`, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");

      // CORRECTION : On crée une timeline pour CHAQUE rangée pour éviter les conflits
      gsap.utils.toArray<HTMLElement>(`.${styles.row}`).forEach((row, index) => {
        const cardLeft = row.querySelector<HTMLElement>(`.${styles.cardLeft}`);
        const cardRight = row.querySelector<HTMLElement>(`.${styles.cardRight}`);
        const data = cardData[index];

        // Une timeline par rangée, déclenchée par la rangée elle-même
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        if (cardLeft && data) {
          rowTl.fromTo(cardLeft, 
            { x: 0, y: 0, rotation: 0 },
            { x: data.leftX, y: data.y, rotation: data.leftRot },
            0 // Position 0 dans la timeline de la rangée
          );
        }
        if (cardRight && data) {
          rowTl.fromTo(cardRight,
            { x: 0, y: 0, rotation: 0 },
            { x: data.rightX, y: data.y, rotation: data.rightRot },
            0 // Position 0 dans la timeline de la rangée
          );
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  const generateRows = () => {
    return cardData.map((card, i) => (
      <div className={styles.row} key={i}>
        <div className={`${styles.card} ${styles.cardLeft}`}>
          <img src={`/images/card-${card.img}.jpeg`} alt={`Card ${card.img}`} />
        </div>
        <div className={`${styles.card} ${styles.cardRight}`}>
          <img src={`/images/card-${card.img + 1}.jpeg`} alt={`Card ${card.img + 1}`} />
        </div>
      </div>
    ));
  };

  return (
    <ReactLenis root>
      <div ref={componentRef}>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <img src="/images/hero-image.jpeg" alt="Hero" />
          </div>
        </section>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <div className={styles.copy}>
              <div className={styles.line}><p>Delve into coding without clutter.</p></div>
              <div className={styles.line}><p>Experience seamless design.</p></div>
              <div className={styles.line}><p>Build amazing things.</p></div>
              <div className={styles.btn}><button>Get Pro</button></div>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            {generateRows()}
          </div>
        </div>
        <section className={styles.footer}></section>
      </div>
    </ReactLenis>
  );
}

