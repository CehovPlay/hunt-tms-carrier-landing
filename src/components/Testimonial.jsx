import { Container, Eyebrow } from "./ui";

export default function Testimonial() {
  return (
    <section className="border-t border-lead/15 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mx-auto">Why carriers switch</Eyebrow>
          <blockquote className="mt-7 font-display text-2xl font-medium leading-snug tracking-tight text-starlight md:text-[34px] md:leading-[1.25]">
            “We were juggling a TMS, two spreadsheets and a factoring portal. huntTMS put dispatch, invoicing and payroll on one screen — we close the books in a fraction of the time.”
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-graphite text-sm font-semibold text-starlight">RJ</span>
            <div className="text-left">
              <p className="text-sm font-medium text-starlight">Robert J.</p>
              <p className="text-sm text-silver">Owner-operator · 9-truck fleet</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
