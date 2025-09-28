
// app/apropos/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutPage from '@/components/AboutPage';

export default function Apropos() {
  return (
    <>
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
