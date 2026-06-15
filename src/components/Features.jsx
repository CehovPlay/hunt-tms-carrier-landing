import { Route, Sparkles, FileText, Receipt, Wallet, ShieldCheck, MapPin, CalendarRange, Bot } from "lucide-react";
import { Container, Eyebrow } from "./ui";

const FEATURES = [
  { icon: Route, title: "Loads & dispatch", text: "Book, assign and track every load with driver, truck and broker in one record — no spreadsheets, no double entry." },
  { icon: Sparkles, title: "AI Rate Con parsing", text: "Drop a Rate Confirmation — AI reads it and fills the load. It even flags BOL vs Rate Con weight or address mismatches." },
  { icon: FileText, title: "Invoicing & factoring", text: "Generate broker invoices in a click, send to RTS or your factor, and watch receivables age in real time." },
  { icon: Receipt, title: "Expense capture", text: "Fuel, tolls, lumpers and maintenance — attach receipts, assign to loads, approve, and keep margins honest." },
  { icon: Wallet, title: "Payroll & settlements", text: "Per-mile, flat, percentage or hourly — generate driver and dispatcher settlements with every blocker surfaced." },
  { icon: ShieldCheck, title: "Driver compliance", text: "CDL, medical card, endorsements and documents tracked with expiry alerts before they become a problem." },
  { icon: MapPin, title: "Live map & routing", text: "See every driver on a real map, draw the road route from pickup to delivery, and open the load in one tap." },
  { icon: CalendarRange, title: "Dispatch timeline", text: "A week-at-a-glance board of every truck and appointment — spot conflicts and idle trucks instantly." },
  { icon: Bot, title: "HuntBot AI", text: "Ask in plain English: “show expenses for truck #105”, “generate payroll for dispatchers”. It navigates and acts for you." },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-lead/15 py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Everything, in one place</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-starlight md:text-[42px] md:leading-[1.1]">
            One platform for the whole back office
          </h2>
          <p className="mt-4 text-base text-silver md:text-lg">
            Stop stitching together five tools. huntTMS connects dispatch, billing, expenses, payroll and compliance so the data syncs itself.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-lead/25 bg-lead/15 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group bg-midnight p-7 transition-colors hover:bg-graphite/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-lead/30 bg-graphite text-starlight transition-colors group-hover:border-mercury/40">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-starlight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
