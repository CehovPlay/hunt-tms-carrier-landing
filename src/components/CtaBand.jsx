import { ArrowRight } from "lucide-react";
import { Bay } from "./ui";
import { Reveal } from "./Reveal";

export default function CtaBand({
  heading = "Bring your fleet onto one platform",
  sub = "Start free in minutes. Import your first load and see dispatch, billing and payroll sync themselves.",
  placeholder = "you@yourcarrier.com",
} = {}) {
  return (
    <section id="cta" className="relative flex min-h-[clamp(600px,82vh,1080px)] flex-col justify-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 brand-glow" />
      <Bay className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-[46px] md:leading-[1.08]">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-base text-body md:text-lg">
              {sub}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
          <form className="mx-auto mt-9 flex max-w-md items-stretch" action="#" method="post">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={placeholder}
              aria-label="Work email"
              className="h-12 min-w-0 flex-1 rounded-l-full rounded-r-none border border-border bg-white px-5 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-l-none rounded-r-full bg-neutral-900 px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),inset_0_2.5px_3px_-2px_rgba(255,255,255,0.7),inset_0_-1px_1px_-1px_rgba(255,255,255,0.18),0_2px_10px_-3px_rgba(0,0,0,0.35)] transition hover:bg-black/90"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-4 text-sm text-faint">14-day free trial · No credit card required</p>
          </Reveal>
        </div>
      </Bay>
    </section>
  );
}
