import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Testimonial from "@/components/Testimonial";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { LoadsMock, BillingMock, MapMock, TimelineMock, ExpenseMock, PayrollMock, ComplianceMock, HuntBotMock } from "@/components/mockups";
import { Search, PhoneCall, Truck } from "lucide-react";

export const metadata = {
  title: "hunterTMS for Dispatchers — Book better loads, faster",
  description:
    "The dispatcher-first TMS by LoadHunter. Filter DAT and Truckstop in seconds, vet brokers, reach out in one click, and run your whole dispatch board with AI.",
};

const BLOCKS = [
  { tag: "Smart load board", title: "Find the right load in seconds", text: "Filter DAT and Truckstop by rate, lane, equipment and pickup window — the loads worth booking surface first.", bullets: ["DAT / Truckstop filtering", "Rate-per-mile sorting", "Saved searches"], mock: <LoadsMock /> },
  { tag: "AI Rate Con parsing", title: "Drop the Rate Con — AI fills the load", text: "No retyping. AI reads the Rate Confirmation, creates the load, and flags weight or address mismatches before they bite.", bullets: ["Auto-extract load details", "BOL vs Rate Con checks", "Seconds, not minutes"], mock: <BillingMock /> },
  { tag: "Broker outreach", title: "Reach out in one click", text: "Vet brokers on reviews and credit, then send a templated message or call — without leaving the load.", bullets: ["Broker reviews & credit", "One-click templated outreach", "History on every broker"], mock: <HuntBotMock /> },
  { tag: "Live map & tracking", title: "See every driver on a real map", text: "Real road routing from pickup to delivery and live driver positions, so you always know where freight is.", bullets: ["Real-road routing", "Live positions", "ETA at a glance"], mock: <MapMock /> },
  { tag: "Dispatch timeline", title: "A week of your board, at a glance", text: "Every truck and appointment on one board so you spot conflicts and idle trucks before they cost a load.", bullets: ["Week-at-a-glance board", "Spot idle trucks", "Catch conflicts"], mock: <TimelineMock /> },
  { tag: "Settlements", title: "Dispatcher pay that runs itself", text: "Commission, flat or percentage — generate dispatcher settlements with every booked load counted automatically.", bullets: ["Commission & flat", "Booked-load tracking", "Blockers surfaced"], mock: <PayrollMock /> },
  { tag: "Expenses", title: "Keep every load profitable", text: "Track fuel, tolls and lumpers against each load so you always know the real margin on a lane.", bullets: ["Assigned to loads", "Receipts on file", "Live margin"], mock: <ExpenseMock /> },
  { tag: "HuntBot AI", title: "Ask in plain English — it acts for you", text: "“Show the best reefer loads out of Dallas.” HuntBot filters the board, drafts outreach and runs the workflow for you.", bullets: ["Natural-language search", "Drafts outreach", "Runs workflows"], mock: <ComplianceMock /> },
];

const STEPS = [
  { n: "01", icon: Search, title: "Find the load", text: "Filter DAT and Truckstop by rate, lane and equipment. The loads worth booking rise to the top." },
  { n: "02", icon: PhoneCall, title: "Vet & reach out", text: "Check broker reviews and credit, then send a one-click templated message or place the call." },
  { n: "03", icon: Truck, title: "Book & dispatch", text: "Drop the Rate Con, let AI build the load, assign the driver and track it to delivery." },
];

const QUOTES = [
  { quote: "I used to live in five tabs. Now I filter DAT, check the broker, and send outreach from one screen — I book more loads before lunch than I used to all day.", name: "Sergio M.", role: "Dispatcher · 14 trucks", initials: "SM" },
  { quote: "AI Rate Con parsing is the killer feature. Paste the PDF, the load's built, the mismatch is flagged. My error rate basically went to zero.", name: "Lena R.", role: "Dispatch lead · 30 trucks", initials: "LR" },
  { quote: "Broker reviews and credit right on the load saved us from two shaky brokers this month alone. That's real money kept.", name: "Tariq H.", role: "Independent dispatcher", initials: "TH" },
];

const QA = [
  { q: "Which load boards do you work with?", a: "hunterTMS layers smart filtering and automation on top of DAT and Truckstop-based workflows so you can find and book the right loads faster." },
  { q: "Do you parse Rate Confirmations automatically?", a: "Yes. Drop a Rate Con (PDF or photo) and AI extracts the load, stops, rate and references — then flags mismatches against the BOL." },
  { q: "Can I see broker reviews and credit?", a: "Broker reviews and credit show right on the load, with full outreach history, so you can vet before you commit a truck." },
  { q: "How is this different from the carrier product?", a: "The carrier product runs the back office — billing, payroll, compliance. hunterTMS for Dispatchers is built around the board: filtering, vetting and one-click outreach." },
  { q: "How long does setup take?", a: "Minutes. Connect your workflow and you're filtering and booking the same day." },
];

export default function DispatchersPage() {
  return (
    <>
      <Header audience="dispatchers" />
      <main className="pt-[56px]">
        <Hero
          eyebrow="Dispatcher-first TMS · by LoadHunter"
          titleLead="Book better loads,"
          titleAccent="faster."
          subtitle="Filter DAT and Truckstop in seconds, vet brokers, reach out in one click, and run your whole dispatch board with AI. Built for dispatchers and dispatch teams."
          mock={<LoadsMock />}
        />
        <Features
          eyebrow="Built for dispatchers"
          heading={<>Everything to dispatch<br />smarter</>}
          sub="From the load board to the invoice — filtering, broker vetting, outreach and automation in one workspace."
          blocks={BLOCKS}
        />
        <Showcase
          heading="From load board to booked — in fewer clicks"
          sub="Three steps. HuntBot handles the busywork."
          steps={STEPS}
        />
        <Testimonial eyebrow="Why dispatchers switch" quotes={QUOTES} />
        <Faq heading="Dispatcher questions, answered" qa={QA} />
        <CtaBand
          heading="Run your dispatch desk on autopilot"
          sub="Start free in minutes. Filter your first board and book a better load today."
          placeholder="you@yourdispatch.com"
        />
      </main>
      <Footer />
    </>
  );
}
