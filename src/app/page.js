import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { FrameColumn, FrameRule } from "@/components/Frame";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <FrameColumn>
          <FrameRule />
          <Hero />
          <FrameRule />
          <Features />
          <FrameRule />
          <Showcase />
          <FrameRule />
          <Testimonial />
          <FrameRule />
          <Faq />
          <FrameRule />
          <CtaBand />
          <FrameRule />
        </FrameColumn>
      </main>
      <Footer />
    </>
  );
}
