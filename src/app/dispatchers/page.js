import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Faq from "@/components/Faq";
import Testimonial from "@/components/Testimonial";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { FrameColumn, FrameRule } from "@/components/Frame";
import { DispatcherDashboardMock, DispatchTimelineMock, ViewTotalsMock, DispatchMapMock, LoadInfoMock, LoadHistoryMock, StatusViewMock, RcScannerMock, TeamMock, ReportsMock, DashboardSummaryMock } from "@/components/mockups";

export const metadata = {
  title: "huntTMS for Dispatchers — Revolutionize your dispatching",
  description:
    "The dispatcher-first TMS by LoadHunter. Designed exclusively for dispatchers and dispatch services — simplify load management, boost efficiency, and drive profitability.",
};

const BLOCKS = [
  { title: "Timeline — your central monitoring hub", text: "Your dispatch command center — schedule loads, see driver availability, and resolve conflicts in seconds with a clean timeline view.", bullets: ["A week of every truck at a glance", "Catch conflicts and idle trucks instantly", "Color-coded load status across the board"], mock: <DispatchTimelineMock /> },
  { title: "View totals", text: "Switch between the numbers that matter most — revenue, miles, and rate-per-mile — without leaving the timeline.", bullets: ["Totals by time range (day / week / month)", "Quick profitability checks (RPM trends)", "Fast comparisons across loads and periods"], mock: <ViewTotalsMock /> },
  { title: "Map view", text: "See where the driver is, what route they're taking, and adjust stops in real time to protect margin and prevent delays.", bullets: ["Fewer surprises and missed windows", "Faster replanning when things change", "Better geographic decision-making"], mock: <DispatchMapMock /> },
  { title: "Full load info", text: "Consolidate all load details into one comprehensive source of truth. No more sifting through countless emails, chat messages, or spreadsheets to find the information you need.", bullets: ["Full address details", "Driver window / appointment times", "Payment / expenses", "Broker details, D/H miles", "Files & documents", "Notes"], mock: <LoadInfoMock /> },
  { title: "Full load history", text: "Get a complete, time-stamped timeline of everything that happened to a load — who changed what, when, and why.", bullets: ["Create / modify / cancel events", "Delivery confirmations and key milestones", "Accountability across the team"], mock: <LoadHistoryMock /> },
  { title: "Status view", text: "Standardize load stages and exceptions so everyone understands the exact state of every load at a glance.", bullets: ["Reduces miscommunication", "Speeds up handoffs between dispatchers", "Helps prioritize what needs attention now"], mock: <StatusViewMock /> },
  { title: "AI RC Scanner", text: "Drag & drop a Rate Confirmation — AI extracts the data and auto-fills your load fields in seconds.", bullets: ["Eliminates manual data entry", "Reduces costly typos and missing fields", "Speeds up load creation and dispatch start time"], mock: <RcScannerMock /> },
  { title: "Team management", text: "Invite dispatchers and supervisors, assign clear roles, and collaborate on the same workload without chaos.", bullets: ["Dispatcher / Supervisor roles", "Simple invites and onboarding", "Shared visibility into loads and updates"], mock: <TeamMock /> },
  { title: "Reports", text: "Generate customized reports for operations, performance, and finance.", bullets: ["Loads reports, dispatcher and team performance", "Financial summaries (profitability, RPM, costs)", "Export options (CSV / PDF)"], mock: <ReportsMock /> },
  { title: "Dashboard — business overview at a glance", text: "A high-level command center for performance, profitability, and team output — updated from your real operational data.", bullets: ["Business estimates and financial summaries", "Most profitable dispatchers ranking", "Top brokers and carriers", "General statistics snapshot"], mock: <DashboardSummaryMock /> },
];

const QUOTES = [
  { quote: "I used to live in five tabs. Now I schedule on the timeline, scan the Rate Con, and dispatch from one screen — I book more loads before lunch than I used to all day.", name: "Sergio M.", role: "Dispatcher · 14 trucks", initials: "SM" },
  { quote: "AI RC parsing is the killer feature. Drop the PDF, the load's built, the mismatch is flagged. My error rate basically went to zero.", name: "Lena R.", role: "Dispatch lead · 30 trucks", initials: "LR" },
  { quote: "Reports and the business dashboard finally show me who my most profitable dispatchers are. We grew margin without adding headcount.", name: "Tariq H.", role: "Dispatch service owner", initials: "TH" },
];

const QA = [
  { q: "Do I need to sign a long-term contract?", a: "No. huntTMS works on a flexible month-to-month basis — you stay because it delivers results, not because you're locked in." },
  { q: "How does the pricing model benefit me?", a: "You only pay for active operations. Scale your team, drivers, and workflows without overpaying for unused capacity — cost grows with your business." },
  { q: "Do you offer any trial period?", a: "Yes. You can test huntTMS in a real workflow — import loads, run dispatch, and see the full system before committing." },
  { q: "Is training included in the subscription price?", a: "Yes. You get onboarding, product guidance, and continuous support so your team can start moving loads without friction." },
  { q: "What does the monthly fee for huntTMS cover?", a: "Everything needed to run dispatch in one flow: load creation, AI-assisted dispatch, document parsing, invoicing, and workflow automation — no extra tools required." },
];

export default function DispatchersPage() {
  return (
    <>
      <main>
        <FrameColumn>
          <FrameRule />
          <Hero
            titleLead="Revolutionize your dispatching with"
            titleAccent="our TMS platform"
            subtitle="Built exclusively for dispatchers and dispatch services. Schedule on the timeline, scan rate cons with AI, and track every load on one screen — with the reporting to see who's actually profitable."
            ctaPrimary="Try it free"
            ctaSecondary="Get a demo"
            trust="Full access · No credit card required"
            mock={<DispatcherDashboardMock />}
          />
          <FrameRule />
          <Features
            heading={<>Everything you need to<br />dispatch&nbsp;smarter</>}
            sub={"Timeline scheduling, AI rate-con scanning, live tracking and dispatcher-level reporting — every tool in one workspace, no tab-juggling."}
            blocks={BLOCKS}
          />
          <FrameRule />
          <Showcase
            variant="dispatcher"
            heading="From rate con to dispatched — in three steps"
            sub="Three steps. The platform handles the rest."
          />
          <FrameRule />
          <Testimonial quotes={QUOTES} />
          <FrameRule />
          <Faq heading="Get answers to your most common questions" qa={QA} />
          <FrameRule />
          <CtaBand
            heading="Ready to dispatch on one screen?"
            sub="Schedule on the timeline, scan rate cons with AI, and run your whole operation from a single workspace. Start free — no credit card required."
            placeholder="you@yourdispatch.com"
          />
          <FrameRule />
        </FrameColumn>
      </main>
      <Footer />
    </>
  );
}
