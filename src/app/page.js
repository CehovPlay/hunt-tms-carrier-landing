import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[56px]">
        <Hero />
        <Features />
        <Showcase />
        <Stats />
        <Testimonial />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
