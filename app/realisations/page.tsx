

// app/realisations/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Realisation from '@/components/Realisation';
import RealisationsPage from '@/components/realisations-page';

export default function Realisations() {
  return (
    <>
      <Header />
      <main>
       <RealisationsPage />
      </main>
      <Footer />
    </>
  );
}