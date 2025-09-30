"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./MultiLayerSlider.module.scss";

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function MultiLayerSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After" 
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50); // Start at 50%

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setPosition(percentage);
    
    // Update overlay width to reveal before image progressively
    if (overlayRef.current) {
      overlayRef.current.style.width = `${percentage}%`;
    }
    // Update handle position
    if (handleRef.current) {
      handleRef.current.style.left = `${percentage}%`;
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      updatePosition(e.clientX);
    }
  }, [isDragging, updatePosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  }, [isDragging, updatePosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    }
  }, [isDragging, updatePosition]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle mouse/touch events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", stopDragging);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, stopDragging]);

  // Initialize position on mount
  useEffect(() => {
    if (overlayRef.current && handleRef.current) {
      overlayRef.current.style.width = `${position}%`;
      handleRef.current.style.left = `${position}%`;
    }
  }, [position]);

  return (
    <div className={styles.wrapper}>
      <div 
        className={styles.container} 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
              {/* After Image (Background) */}
              <div className={styles.imageContainer}>
                <Image 
                  src={afterImage} 
                  alt="After" 
                  fill
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.label} data-position="right">
                  {afterLabel}
                </div>
              </div>

              {/* Before Image (Overlay) */}
              <div className={styles.overlay} ref={overlayRef}>
                <Image 
                  src={beforeImage} 
                  alt="Before" 
                  fill
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.label} data-position="left">
                  {beforeLabel}
                </div>
              </div>

        {/* Slider Handle */}
        <div className={styles.handle} ref={handleRef}>
          <div className={styles.handleButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 6L16 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 6L8 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Slider Track */}
        <div className={styles.track}></div>
      </div>
    </div>
  );
}
