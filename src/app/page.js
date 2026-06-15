import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Stats />
        <Testimonial />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
