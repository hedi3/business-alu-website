"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./MultiLayerSlider.module.scss";

interface Props {
  beforeImage: string;
  afterImage: string;
}

export default function MultiLayerSlider({ beforeImage, afterImage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current || !overlayRef.current || !handleRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = 0;

    if (e instanceof MouseEvent) x = e.clientX - rect.left;
    if (e instanceof TouchEvent) x = e.touches[0].clientX - rect.left;

    x = Math.max(0, Math.min(x, rect.width)); // clamp

    overlayRef.current.style.width = `${x}px`;
    handleRef.current.style.left = `${x}px`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", handleDrag);
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <img src={afterImage} alt="after" className={styles.after} />
      <div className={styles.overlay} ref={overlayRef}>
        <img src={beforeImage} alt="before" />
      </div>
      <div className={styles.handle} ref={handleRef}></div>
    </div>
  );
}
