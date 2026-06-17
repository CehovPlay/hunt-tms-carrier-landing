import { ArrowRight } from "lucide-react";
import { Button, Bay } from "./ui";
import { Reveal } from "./Reveal";
import FitToWidth from "./FitToWidth";
import { DashboardMock } from "./mockups";

export default function Hero({
  titleLead = "Run your entire fleet from",
  titleAccent = "one platform.",
  subtitle = "Dispatch, loads, invoicing, factoring, expenses, payroll, driver compliance and a live map — automated by AI and synced in real time. Built for carriers, not middlemen.",
  ctaPrimary = "Start free",
  ctaSecondary = "Book a demo",
  trust = "No credit card · Set up in minutes · Cancel anytime",
  mock,
} = {}) {
  return (
    <section className="relative flex flex-col overflow-hidden pb-24 pt-40 md:pt-44">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <Bay className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-ink md:text-[64px]">
              {titleLead} <span className="text-brand">{titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body md:text-lg">{subtitle}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#cta" size="lg">{ctaPrimary} <ArrowRight className="h-4 w-4" /></Button>
              <Button href="#cta" variant="secondary" size="lg">{ctaSecondary}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 text-sm text-faint">{trust}</p>
          </Reveal>
        </div>

        <Reveal delay={0.4} className="relative mx-auto mt-28 w-full pb-4 md:mt-32">
          <FitToWidth designWidth={1280}>{mock || <DashboardMock />}</FitToWidth>
        </Reveal>
      </Bay>
    </section>
  );
}
