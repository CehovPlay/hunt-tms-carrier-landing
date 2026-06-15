import { Container } from "./ui";

const STATS = [
  { value: "5→1", label: "Tools replaced" },
  { value: "18%", label: "Avg. margin lift" },
  { value: "2 min", label: "Rate con to load" },
  { value: "100%", label: "Synced in real time" },
];

export default function Stats() {
  return (
    <section className="border-t border-lead/15 py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-lead/25 bg-lead/15 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-midnight px-6 py-10 text-center">
              <p className="font-display text-4xl font-semibold tracking-tight text-starlight md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-silver">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
