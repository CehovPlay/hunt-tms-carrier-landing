import { Route, FileText, MapPin, CalendarRange, Check, Receipt, Wallet, ShieldCheck, Bot } from "lucide-react";
import { Container, Eyebrow } from "./ui";
import { LoadsMock, BillingMock, MapMock, TimelineMock } from "./mockups";

const ROWS = [
  {
    icon: Route,
    tag: "Dispatch & loads",
    title: "Every load in one record — no double entry",
    text: "Drop a Rate Confirmation and AI fills the load. Driver, truck, broker and stops stay in sync from booking to delivery.",
    bullets: ["AI Rate Con parsing", "BOL vs Rate Con mismatch flags", "One source of truth per load"],
    mock: <LoadsMock />,
  },
  {
    icon: FileText,
    tag: "Billing & factoring",
    title: "From POD to paid, without the busywork",
    text: "Generate broker invoices in a click, send them straight to RTS or your factor, and watch receivables age in real time.",
    bullets: ["One-click broker invoices", "Send to factoring", "Live receivables aging"],
    mock: <BillingMock />,
    reverse: true,
  },
  {
    icon: MapPin,
    tag: "Live map & tracking",
    title: "See every truck on a real map",
    text: "Real road routing from pickup to delivery, live driver positions, and the load record one tap away.",
    bullets: ["Real-road routing", "Live driver positions", "Open the load in a tap"],
    mock: <MapMock />,
  },
  {
    icon: CalendarRange,
    tag: "Dispatch timeline",
    title: "A week of your fleet, at a glance",
    text: "A board of every truck and appointment so you can spot conflicts and idle trucks before they cost you a load.",
    bullets: ["Week-at-a-glance board", "Spot idle trucks", "Catch appointment conflicts"],
    mock: <TimelineMock />,
    reverse: true,
  },
];

const MORE = [
  { icon: Receipt, title: "Expense capture", text: "Fuel, tolls, lumpers and maintenance — assigned to loads, approved, margin-safe." },
  { icon: Wallet, title: "Payroll & settlements", text: "Per-mile, flat, percentage or hourly — with every blocker surfaced." },
  { icon: ShieldCheck, title: "Driver compliance", text: "CDL, medical and endorsements tracked with expiry alerts." },
  { icon: Bot, title: "HuntBot AI", text: "Ask in plain English — it navigates and runs the action for you." },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-border py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">Everything, in one place</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
            One platform for the whole back office
          </h2>
          <p className="mt-4 text-base text-body md:text-lg">
            Stop stitching together five tools. hunterTMS connects dispatch, billing, expenses, payroll and compliance so the data syncs itself.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {ROWS.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.tag} className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${row.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                    <Icon className="h-3.5 w-3.5 text-brand" />{row.tag}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink md:text-[32px] md:leading-[1.15]">{row.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-body">{row.text}</p>
                  <ul className="mt-6 space-y-3">
                    {row.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-ink">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand"><Check className="h-3 w-3" /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>{row.mock}</div>
              </div>
            );
          })}
        </div>

        {/* And more */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {MORE.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-ink"><Icon className="h-5 w-5" /></div>
              <h4 className="mt-4 text-base font-semibold text-ink">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
