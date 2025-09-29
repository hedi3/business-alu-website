import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePageContent from "@/components/HomePage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Le contenu principal prend l'espace restant */}
      <main className="flex-grow">
        <HomePageContent />
      </main>
      
      <Footer />
    </div>
  );
}

