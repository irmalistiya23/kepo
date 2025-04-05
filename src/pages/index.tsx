import { lazy } from "solid-js"

const Hero = lazy(() => import('@/components/ui/landing/hero.tsx'))
const About = lazy(() => import('@/components/ui/landing/about.tsx'))
const Contact = lazy(() => import('@/components/ui/landing/contact.tsx'))
const Footer = lazy(() => import('@/components/ui/landing/footer.tsx'))

export default function index() {
  return (
    <>
      <Hero />
      <About />
      <Contact />
      <Footer />
    </>
  )
}