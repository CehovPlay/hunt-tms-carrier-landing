import { ArrowRight } from "lucide-react";
import { Container } from "./ui";

export default function CtaBand() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-lead/15 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 mercury-glow" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-starlight md:text-[46px] md:leading-[1.08]">
            Bring your fleet into the command center
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-silver md:text-lg">
            Start free in minutes. Import your first load and see dispatch, billing and payroll sync themselves.
          </p>

          {/* Mercury split-radius email capture */}
          <form className="mx-auto mt-9 flex max-w-md items-stretch" action="#" method="post">
            <input
              type="email"
              required
              placeholder="you@yourcarrier.com"
              aria-label="Work email"
              className="h-13 min-w-0 flex-1 rounded-l-[32px] rounded-r-none border border-lead/50 bg-graphite/40 px-5 py-3.5 text-sm text-starlight placeholder:text-lead focus:border-mercury focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-13 shrink-0 items-center gap-2 rounded-l-none rounded-r-[32px] bg-mercury px-6 text-sm font-medium text-white transition-colors hover:bg-mercury-600"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-4 text-sm text-lead">14-day free trial · No credit card required</p>
        </div>
      </Container>
    </section>
  );
}
