"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  { img: "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-2.jpg", text: "Windows & Doors" },
  { img: "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-3.jpg", text: "Desert" },
  { img: "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-4.jpg", text: "Erosion" },
  { img: "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-1.jpg", text: "Shape" },
];

export default function SplitSlideshow() {
  const leftRef = useRef<Slider>(null);
  const rightRef = useRef<Slider>(null);
  const textRef = useRef<Slider>(null);

  const settingsLeft = {
    vertical: true,
    verticalSwiping: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    beforeChange: (_old: number, next: number) => {
      rightRef.current?.slickGoTo(slides.length - 1 - next);
      textRef.current?.slickGoTo(next);
    },
  };

  const settingsRight = {
    vertical: true,
    verticalSwiping: true,
    infinite: true,
    arrows: false,
    dots: false,
    speed: 1000,
    beforeChange: (_old: number, next: number) => {
      leftRef.current?.slickGoTo(slides.length - 1 - next);
      textRef.current?.slickGoTo(next);
    },
  };

  const settingsText = {
    vertical: true,
    infinite: true,
    arrows: false,
    swipe: false,
    speed: 1000,
  };

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>
      {/* Slider gauche */}
      <div style={{ width: "50%" }}>
        <Slider ref={leftRef} {...settingsLeft}>
          {slides.map((s, i) => (
            <div key={i}>
              <img src={s.img} alt={s.text} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider droite (inversé) */}
      <div style={{ width: "50%" }}>
        <Slider ref={rightRef} {...settingsRight}>
          {[...slides].reverse().map((s, i) => (
            <div key={i}>
              <img src={s.img} alt={s.text} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider texte */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        textAlign: "center",
        color: "white",
        fontSize: "3rem",
        fontWeight: "bold",
        width: "60%"
      }}>
        <Slider ref={textRef} {...settingsText}>
          {slides.map((s, i) => (
            <div key={i}>{s.text}</div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
