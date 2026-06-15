import { ArrowRight } from "lucide-react";
import { Container } from "./ui";

export default function CtaBand() {
  return (
    <section id="cta" className="relative flex min-h-[1080px] flex-col justify-center overflow-hidden border-t border-border py-24">
      <div className="pointer-events-none absolute inset-0 brand-glow" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-[46px] md:leading-[1.08]">
            Bring your fleet onto one platform
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-body md:text-lg">
            Start free in minutes. Import your first load and see dispatch, billing and payroll sync themselves.
          </p>

          <form className="mx-auto mt-9 flex max-w-md items-stretch" action="#" method="post">
            <input
              type="email"
              required
              placeholder="you@yourcarrier.com"
              aria-label="Work email"
              className="h-12 min-w-0 flex-1 rounded-l-full rounded-r-none border border-border bg-white px-5 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-l-none rounded-r-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-600"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-4 text-sm text-faint">14-day free trial · No credit card required</p>
        </div>
      </Container>
    </section>
  );
}
