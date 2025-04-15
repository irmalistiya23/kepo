import dynamic from 'next/dynamic';

// Menggunakan dynamic import dengan opsi lazy loading
const Navbar = dynamic(() => import('@/components/layout/landing/navbar'));
const Hero = dynamic(() => import('@/components/ui/landing/hero'));
const About = dynamic(() => import('@/components/ui/landing/about'));
const Contact = dynamic(() => import('@/components/ui/landing/contact'));
const Footer = dynamic(() => import('@/components/ui/landing/footer'));

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
