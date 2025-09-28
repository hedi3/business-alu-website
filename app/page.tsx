"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import HomePageContent from "@/components/HomePage"; // On importe le nouveau composant

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen loading={loading} />

      {/* Structure globale de la page pour un layout correct (header en haut, footer en bas) */}
      <div 
        className="flex flex-col min-h-screen" 
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}
      >
        <Header />
        
        {/* Le contenu principal prend l'espace restant */}
        <main className="flex-grow">
          <HomePageContent />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

