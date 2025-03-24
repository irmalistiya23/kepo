import { lazy } from "solid-js"

const Hero = lazy(() => import('@/components/landing/hero.tsx'))
const About = lazy(() => import('@/components/landing/about.tsx'))
const Contact = lazy(() => import('@/components/landing/contact.tsx'))
const Footer = lazy(() => import('@/components/landing/footer.tsx'))

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