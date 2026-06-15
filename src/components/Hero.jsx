import { ArrowRight } from "lucide-react";
import { Button, Container, Eyebrow } from "./ui";
import { LoadsMock } from "./mockups";

export default function Hero({
  eyebrow = "Carrier-side TMS · by LoadHunter",
  titleLead = "Run your entire fleet from",
  titleAccent = "one platform.",
  subtitle = "Dispatch, loads, invoicing, factoring, expenses, payroll, driver compliance and a live map — automated by AI and synced in real time. Built for carriers, not middlemen.",
  mock,
} = {}) {
  return (
    <section className="relative flex min-h-[1080px] flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <Container className="relative py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[64px]">
            {titleLead} <span className="text-brand">{titleAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body md:text-lg">{subtitle}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#cta" size="lg">Start free <ArrowRight className="h-4 w-4" /></Button>
            <Button href="#demo" variant="secondary" size="lg">Book a demo</Button>
          </div>
          <p className="mt-5 text-sm text-faint">No credit card · Set up in minutes · Cancel anytime</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">{mock || <LoadsMock />}</div>
      </Container>
    </section>
  );
}
