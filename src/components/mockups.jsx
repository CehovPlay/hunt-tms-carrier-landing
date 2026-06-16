"use client";

import { Sparkles, Send, CheckCircle2, House, Route, FileText, Receipt, WalletCards, BarChart3, Clock3, MapPin, UserRound, Truck, Settings, Search, Bell, ChevronRight, FileScan, Fuel, Activity, Building2, PanelLeft, LayoutDashboard, AlignLeft, Users, ChevronDown, Download, ArrowUpRight, Plus, ScanLine, Paperclip, StickyNote, AlertTriangle, Gauge, DollarSign, Calendar, Phone, Mail } from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ROUTE_CHI_DAL } from "@/data/route";

const EASE = [0.16, 1, 0.3, 1];

/* ── Reusable ambient-animation primitives (all gated to viewport) ────────── */

// Stagger container + item — fade/lift children into view in a cascade.
const RISE = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } };
const POP = { hidden: { opacity: 0, scale: 0.82 }, show: { opacity: 1, scale: 1, transition: { duration: 0.38, ease: EASE } } };
function Stagger({ children, className = "", gap = 0.07, ref }) {
  return (
    <motion.div ref={ref} className={className} variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: 0.05 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
      {children}
    </motion.div>
  );
}
const Item = motion.div;

// True while the element sits in the viewport — used to pause loops off-screen.
function useInViewLoop() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -8% 0px" });
  return [ref, inView];
}

// Counts a number up from 0 the first time it scrolls into view.
function CountUp({ value, decimals = 0, prefix = "", suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const dur = 1100;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / dur, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref} className={className}>{prefix}{n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

// Small green "▲ 20.1%" delta pill used across the analytics mockups.
function Delta({ value, tone = "green" }) {
  const tones = { green: "text-emerald-600", red: "text-rose-500" };
  return (
    <motion.span initial={{ opacity: 0, x: -4 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5, ease: EASE }} className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${tones[tone]}`}>
      <ArrowUpRight className="h-3 w-3" />{value}
    </motion.span>
  );
}

// Compact 3-column table panel used across the dashboard mockup.
function MiniTable({ title, sub, head, rows }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="text-[11px] text-faint">{sub}</p>
      <div className="mt-3 grid grid-cols-[1.6fr_1fr_0.8fr] gap-2 text-[10px] uppercase tracking-wide text-faint">
        <span>{head[0]}</span><span>{head[1]}</span><span className="text-right">{head[2]}</span>
      </div>
      <Stagger className="mt-1 divide-y divide-border" gap={0.06}>
        {rows.map((r, i) => (
          <Item key={i} variants={RISE} className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-2 py-2 text-xs">
            <span className="truncate font-medium text-ink">{r[0]}</span>
            <span className="text-faint">{r[1]}</span>
            <span className="text-right font-medium text-ink">{r[2]}</span>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}

/* ── Real hunterTMS dashboard (mirrors the HUNT-TMS app: sidebar + summary
   KPIs + analytics cards) ── */

export function DashboardMock() {
  const nav = [
    { group: "Account", items: [["Home", House, { active: true, count: "4" }], ["Loads", Route, { count: "4" }], ["Invoices", FileText], ["Expenses", Receipt, { count: "1" }], ["Salaries", WalletCards, { count: "6" }], ["Reports", BarChart3, { count: "3" }]] },
    { group: "Freight", items: [["Timeline", Clock3], ["Map", MapPin, { count: "1" }], ["Drivers", UserRound, { count: "2" }], ["Equipment", Truck, { count: "2" }], ["Fleets", Building2], ["Customers", Building2], ["Fuel Cards", Fuel, { soon: true }]] },
    { group: "Platform", items: [["Analytics", BarChart3, { soon: true }], ["Insights", Activity, { soon: true }], ["Activities", Activity, { soon: true }], ["Company", Building2], ["Team", UserRound, { soon: true }], ["Settings", Settings]] },
  ];
  const kpis = [
    { label: "Revenue", v: 12975, p: "$", hint: "4 loads booked" },
    { label: "Open receivables", v: 10425, p: "$", hint: "3 invoices waiting" },
    { label: "Delivered loads", v: 4, hint: "delivered, invoiced or paid" },
    { label: "Payroll outstanding", v: 4846, p: "$", hint: "6 not closed" },
  ];
  const attention = [
    ["Maintenance · $1,240.00", "Upload receipt"],
    ["Gudelio Ramos", "Pending · Ready to approve"],
    ["Andrew Stone", "Pending · Ready to approve"],
    ["Mike Dispatcher", "Pending · Ready to approve"],
  ];
  const brokers = [
    ["Northline Transport", "1", "$4,100"],
    ["Blue Arrow Brokerage", "1", "$3,450"],
    ["Summit Freight Partners", "1", "$2,875"],
    ["Skyline Logistics", "1", "$2,550"],
  ];
  const invoices = [
    ["#101909", "In Review", "amber", "$4,100"],
    ["#101907", "Ready", "green", "$3,450"],
    ["#101908", "Invoiced", "grey", "$2,875"],
  ];
  const settlements = [
    ["Robert Fleet", "Ready to approve", "green", "$1,350"],
    ["Andrew Stone", "Ready to approve", "green", "$734"],
    ["Gudelio Ramos", "Ready to approve", "green", "$535"],
    ["Mike Dispatcher", "Ready to approve", "green", "$520"],
    ["Anna Accounting", "Ready to pay", "green", "$460"],
    ["Safety Bonus Pool", "Review", "amber", "$300"],
  ];
  const tone = { green: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600", grey: "bg-muted text-faint" };
  // Monthly profit (Jan–Jun) from the real chartData, normalised to a tiny SVG.
  const profit = [7200, 8100, 8900, 10200, 8140, 11600];
  const months = ["Feb", "Mar", "Apr", "May", "Jun"];
  const lo = 6500, hi = 12000, W = 300, H = 110, padB = 100;
  const px = (i) => 8 + (i * (W - 16)) / (profit.length - 1);
  const py = (v) => padB - ((v - lo) / (hi - lo)) * (padB - 12);
  const line = profit.map((v, i) => `${i ? "L" : "M"} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${px(profit.length - 1).toFixed(1)} ${padB} L ${px(0).toFixed(1)} ${padB} Z`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="flex min-h-[560px] text-[13px]">
        {/* Sidebar */}
        <aside className="hidden w-[210px] shrink-0 flex-col border-r border-border bg-surface/60 sm:flex">
          <div className="flex items-center border-b border-border px-4 py-3.5">
            <img src="/logo.svg" alt="hunterTMS" className="h-[18px] w-auto" />
          </div>
          <nav className="space-y-4 px-3 py-4">
            {nav.map((g) => (
              <div key={g.group}>
                <p className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">{g.group}</p>
                <div className="space-y-0.5">
                  {g.items.map(([label, Icon, meta = {}]) => (
                    <div key={label} className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${meta.active ? "bg-white font-medium text-ink shadow-[0_1px_2px_rgba(23,23,23,0.06)]" : meta.soon ? "text-faint/60" : "text-faint"}`}>
                      <Icon className="h-[15px] w-[15px]" />
                      <span className="flex-1">{label}</span>
                      {meta.count ? <span className="text-[11px] text-faint">{meta.count}</span> : null}
                      {meta.soon ? <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-faint">Soon</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 border-t border-border px-4 py-3">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 leading-tight">
              <p className="text-xs font-medium text-ink">Dino</p>
              <p className="truncate text-[10px] text-faint">dino@huntlogistics.com</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-3">
            <PanelLeft className="h-4 w-4 text-faint" />
            <div className="ml-auto flex w-[280px] max-w-[55%] items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-faint">
              <Search className="h-3.5 w-3.5" /> <span className="truncate">Search by driver, load id…</span>
              <span className="ml-auto rounded border border-border bg-white px-1.5 text-[11px]">⌘K</span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-faint"><Bell className="h-3.5 w-3.5" /></span>
          </div>

          <div className="flex-1 space-y-4 overflow-hidden p-5">
            {/* KPI cards */}
            <Stagger className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {kpis.map(({ label, v, p, hint }) => (
                <Item key={label} variants={RISE} className="rounded-xl border border-border bg-white p-4">
                  <p className="truncate text-xs font-medium text-faint">{label}</p>
                  <CountUp value={v} prefix={p} className="mt-2 block truncate text-2xl font-semibold tracking-tight text-ink" />
                  <p className="mt-0.5 truncate text-[11px] text-faint">{hint}</p>
                </Item>
              ))}
            </Stagger>

            {/* Needs attention · Monthly profit · Meet HuntBot */}
            <div className="grid gap-3 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Needs attention</p>
                  <span className="text-[11px] text-faint">View all ›</span>
                </div>
                <p className="text-[11px] text-faint">Highest-impact records to open first.</p>
                <Stagger className="mt-3 space-y-1.5" gap={0.08}>
                  {attention.map(([label, detail]) => (
                    <Item key={label} variants={RISE} className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-faint"><FileText className="h-3 w-3" /></span>
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-ink">{label}</p><p className="truncate text-[10px] text-faint">{detail}</p></div>
                      <ChevronRight className="h-3.5 w-3.5 text-faint" />
                    </Item>
                  ))}
                </Stagger>
              </div>

              <div className="rounded-xl border border-border bg-white p-4">
                <p className="text-sm font-semibold text-ink">Monthly profit</p>
                <p className="text-[11px] text-faint">This month: $11,600</p>
                <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="mt-3 h-[150px] w-full">
                  <defs>
                    <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#737373" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#737373" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path d={area} fill="url(#profitFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }} />
                  <motion.path d={line} fill="none" stroke="#525252" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.1, ease: EASE }} />
                  {profit.map((v, i) => <motion.circle key={i} cx={px(i)} cy={py(v)} r="2" fill="#fff" stroke="#525252" strokeWidth="1.2" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }} />)}
                </svg>
                <div className="flex justify-between text-[10px] text-faint">{months.map((m) => <span key={m}>{m}</span>)}</div>
              </div>

              <div className="relative flex flex-col justify-between overflow-hidden rounded-xl p-4 text-white" style={{ backgroundColor: "#0a0a14", backgroundImage: "radial-gradient(135% 95% at 10% 118%, rgba(37,99,235,0.7), transparent 58%), radial-gradient(120% 95% at 118% 6%, rgba(245,158,11,0.55), transparent 52%), radial-gradient(95% 95% at 60% 42%, rgba(124,58,237,0.6), transparent 60%), radial-gradient(80% 80% at 92% 95%, rgba(236,72,153,0.45), transparent 55%)" }}>
                <div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25"><Sparkles className="h-5 w-5" /></span>
                  <p className="mt-3 text-base font-bold">Meet HuntBot</p>
                  <p className="mt-1.5 text-[11px] leading-5 text-white/80">Your AI dispatch assistant — open any screen, generate payroll, and compare BOL vs Rate Confirmation just by asking.</p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium">See what it can do <ChevronRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>

            {/* Top brokers · Outstanding invoices · Pending settlements */}
            <div className="grid gap-3 lg:grid-cols-3">
              <MiniTable title="Top brokers" sub="By gross booked" head={["Broker", "Loads", "Gross"]} rows={brokers.map(([a, b, c]) => [a, b, c])} />
              <MiniTable title="Outstanding invoices" sub="Awaiting payment" head={["Invoice", "Status", "Amount"]} rows={invoices.map(([r, s, t, amt]) => [r, <span key={s} className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${tone[t]}`}>{s}</span>, amt])} />
              <MiniTable title="Pending settlements" sub="Not yet paid" head={["Settlement", "Status", "Amount"]} rows={settlements.map(([n, s, t, amt]) => [n, <span key={s} className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${tone[t]}`}>{s}</span>, amt])} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small smooth area chart — the line draws itself in when scrolled into view. */
function AreaChart({ data, lo, hi }) {
  const W = 300, padB = 96;
  const px = (i) => 6 + (i * (W - 12)) / (data.length - 1);
  const py = (v) => padB - ((v - lo) / (hi - lo)) * (padB - 14);
  const line = data.map((v, i) => `${i ? "L" : "M"} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${px(data.length - 1).toFixed(1)} ${padB} L ${px(0).toFixed(1)} ${padB} Z`;
  const gid = "af" + data.join("_");
  return (
    <svg viewBox="0 0 300 104" preserveAspectRatio="none" className="h-[120px] w-full">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#737373" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#737373" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill={`url(#${gid})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }} />
      <motion.path d={line} fill="none" stroke="#525252" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.1, ease: EASE }} />
    </svg>
  );
}

/* Dispatcher business-overview dashboard (mirrors the Figma design: KPIs, two
   revenue/volume charts, and Top dispatchers / carriers / brokers). */
export function DispatcherDashboardMock() {
  // Nav groups separated by a dashed divider (matches the dispatcher app).
  const nav = [
    [["Dashboard", LayoutDashboard, { active: true }], ["Timeline", AlignLeft], ["Reports", FileText]],
    [["Carriers", Building2], ["Drivers", UserRound], ["Equipment", Truck], ["Brokers", Building2], ["Users", Users]],
  ];
  const kpis = [
    { label: "Gross revenue", v: 1545231, p: "$", hint: "this month" },
    { label: "Dispatchers revenue", v: 35231, p: "$", hint: "commission earned" },
    { label: "Loads volume", v: 1102, hint: "delivered loads" },
    { label: "Active dispatchers", v: 13, hint: "on shift" },
  ];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const dispatchers = [["Marcus Lee", "42", "$184,200"], ["Priya Shah", "38", "$152,400"], ["Diego Ramos", "31", "$127,500"], ["Anna Kovacs", "24", "$98,000"]];
  const carriers = [["Hunt Logistics", "28", "$96,400"], ["Zigzag Carrier", "21", "$74,100"], ["Summit Lines", "18", "$61,250"], ["Northline Fleet", "14", "$52,800"]];
  const brokers = [["Blue Arrow Brokerage", "19", "$84,300"], ["Summit Freight", "16", "$71,050"], ["Northline Transport", "12", "$58,400"], ["Skyline Logistics", "9", "$44,200"]];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="flex min-h-[909px] text-[13px]">
        {/* Sidebar */}
        <aside className="hidden w-[210px] shrink-0 flex-col border-r border-border bg-surface/60 sm:flex">
          <div className="flex items-center border-b border-border px-4 py-3.5">
            <img src="/logo.svg" alt="huntTMS" className="h-[18px] w-auto" />
          </div>
          <nav className="space-y-3 px-3 py-4">
            {nav.map((group, gi) => (
              <div key={gi}>
                {gi > 0 ? <div className="mx-2 mb-3 border-t border-dashed border-border" /> : null}
                <div className="space-y-0.5">
                  {group.map(([label, Icon, meta = {}]) => (
                    <div key={label} className={`flex items-center gap-2.5 rounded-lg px-2 py-2 ${meta.active ? "bg-white font-medium text-ink shadow-[0_1px_2px_rgba(23,23,23,0.06)]" : "text-faint"}`}>
                      <Icon className="h-[15px] w-[15px]" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 border-t border-border px-4 py-3">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 leading-tight"><p className="text-xs font-medium text-ink">Dino</p><p className="truncate text-[10px] text-faint">dino@huntlogistics.com</p></div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-border px-5 py-3">
            <PanelLeft className="h-4 w-4 text-faint" />
            <div className="ml-auto flex w-[280px] max-w-[55%] items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-faint">
              <Search className="h-3.5 w-3.5" /> <span className="truncate">Search dispatchers, loads…</span>
              <span className="ml-auto rounded border border-border bg-white px-1.5 text-[11px]">⌘K</span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-faint"><Bell className="h-3.5 w-3.5" /></span>
          </div>

          <div className="flex-1 space-y-4 overflow-hidden p-5">
            {/* KPIs */}
            <Stagger className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {kpis.map(({ label, v, p, hint }) => (
                <Item key={label} variants={RISE} className="rounded-xl border border-border bg-white p-4">
                  <p className="truncate text-xs font-medium text-faint">{label}</p>
                  <CountUp value={v} prefix={p} className="mt-2 block truncate text-2xl font-semibold tracking-tight text-ink" />
                  <p className="mt-0.5 truncate text-[11px] text-faint">{hint}</p>
                </Item>
              ))}
            </Stagger>

            {/* Charts */}
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-white p-4">
                <p className="text-sm font-semibold text-ink">Gross / Dispatchers revenue</p>
                <AreaChart data={[820, 910, 870, 1040, 990, 1180]} lo={700} hi={1250} />
                <div className="flex justify-between text-[10px] text-faint">{months.map((m) => <span key={m}>{m}</span>)}</div>
              </div>
              <div className="rounded-xl border border-border bg-white p-4">
                <p className="text-sm font-semibold text-ink">Loads volume</p>
                <AreaChart data={[640, 720, 690, 760, 700, 840]} lo={580} hi={880} />
                <div className="flex justify-between text-[10px] text-faint">{months.map((m) => <span key={m}>{m}</span>)}</div>
              </div>
            </div>

            {/* Tables */}
            <div className="grid gap-3 lg:grid-cols-3">
              <MiniTable title="Top dispatchers" sub="By gross booked" head={["Dispatcher", "Loads", "Gross"]} rows={dispatchers} />
              <MiniTable title="Top carriers" sub="By revenue" head={["Carrier", "Loads", "Revenue"]} rows={carriers} />
              <MiniTable title="Top brokers" sub="By gross booked" head={["Broker", "Loads", "Gross"]} rows={brokers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Real hunterTMS Loads board — the rate-con-to-paid pipeline with linked
   invoice + payroll status (mirrors the app's Loads table). */
export function LoadsBoardMock() {
  const tone = { green: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600", blue: "bg-brand-soft text-brand", grey: "bg-muted text-faint" };
  const rows = [
    ["#9157553", "Chicago, IL → Dallas, TX", "Gudelio Ramos", "#1974", "Blue Arrow Brokerage", "$3,450", ["Invoiced", "blue"], ["Ready", "green"], ["Delivered", "green"]],
    ["#9157619", "Austin, TX → Denver, CO", "Andrew Stone", "#2042", "Summit Freight Partners", "$2,875", ["Invoiced", "green"], ["Review", "amber"], ["Delivered", "green"]],
    ["#9157901", "Omaha, NE → Phoenix, AZ", "Maks Orlov", "#1888", "Northline Transport", "$4,100", ["In Review", "amber"], ["Paid", "green"], ["Docs Missing", "amber"]],
  ];
  const Badge = ([label, t]) => <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${tone[t]}`}>{label}</span>;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_90px_-30px_rgba(23,23,23,0.2)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2 text-ink"><Route className="h-4 w-4" /><span className="text-sm font-semibold">Loads</span></div>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-faint">4 active · May 2026</span>
      </div>
      <div className="hidden grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.8fr_0.8fr_0.9fr] gap-3 border-b border-border bg-muted/40 px-5 py-2.5 text-[10px] uppercase tracking-wide text-faint md:grid">
        <span>Load</span><span>Driver</span><span>Customer</span><span>Rate</span><span>Invoice</span><span>Payroll</span><span>Status</span>
      </div>
      <div className="divide-y divide-border text-[13px]">
        {rows.map(([id, trip, drv, truck, cust, rate, inv, pay, st]) => (
          <div key={id} className="grid grid-cols-2 items-center gap-3 px-5 py-3.5 md:grid-cols-[1.4fr_1.1fr_1fr_0.7fr_0.8fr_0.8fr_0.9fr]">
            <div className="min-w-0"><p className="font-medium text-ink">{id}</p><p className="truncate text-[11px] text-faint">{trip}</p></div>
            <div className="min-w-0"><p className="truncate text-ink">{drv}</p><p className="text-[11px] text-faint">{truck}</p></div>
            <p className="hidden truncate text-body md:block">{cust}</p>
            <span className="hidden font-medium text-ink md:block">{rate}</span>
            <span className="hidden md:block">{Badge(inv)}</span>
            <span className="hidden md:block">{Badge(pay)}</span>
            <span className="flex justify-end md:justify-start">{Badge(st)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Center visual for the "rate con to paid" section — one load's lifecycle. */
export function LoadFlowMock() {
  const tone = { green: "bg-emerald-50 text-emerald-600", blue: "bg-brand-soft text-brand" };
  const steps = [
    { icon: FileScan, title: "Rate Con parsed", sub: "Chicago, IL → Dallas, TX · $3,450", badge: ["AI", "blue"] },
    { icon: Truck, title: "Dispatched & delivered", sub: "Gudelio Ramos · #1974 · POD collected", badge: ["Delivered", "green"] },
    { icon: FileText, title: "Invoice #101907 sent", sub: "Blue Arrow Brokerage · to factor · Net 30", badge: ["Ready", "green"] },
    { icon: WalletCards, title: "Settlement SET-1048", sub: "Driver paid · $535 net", badge: ["Paid", "green"] },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_90px_-30px_rgba(23,23,23,0.2)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs text-faint">hunterTMS · Load #9157553</span>
      </div>
      <div className="relative space-y-1 p-5">
        {/* connector line */}
        <span className="absolute left-[31px] top-9 bottom-9 w-px bg-border" />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="relative flex items-start gap-3 rounded-xl px-2 py-3">
              <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-white text-faint">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-ink">{s.title}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tone[s.badge[1]]}`}>{s.badge[0]}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-faint">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Frame({ title, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_24px_70px_rgba(23,23,23,0.08)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs text-faint">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Badge({ tone = "blue", children }) {
  const tones = {
    blue: "bg-brand-soft text-brand",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    grey: "bg-muted text-faint",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{children}</span>;
}

export function LoadsMock() {
  const kpis = [["Revenue", 12975, "$"], ["Receivables", 10425, "$"], ["Delivered", 2, ""], ["Payroll", 4169, "$"]];
  const rows = [
    ["#9157553", "Chicago → Dallas", "Gudelio Ramos", "#1974", "$3,450", "green", "Ready"],
    ["#9157619", "Austin → Denver", "Andrew Stone", "#2042", "$2,875", "amber", "Review"],
    ["#9157901", "Omaha → Phoenix", "Maks Orlov", "#1888", "$4,100", "green", "Paid"],
  ];
  return (
    <Frame title="hunterTMS · Loads">
      <Stagger className="grid grid-cols-4 gap-px bg-border" gap={0.06}>
        {kpis.map(([l, v, p]) => (
          <Item key={l} variants={RISE} className="bg-white px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-wide text-faint">{l}</p>
            <CountUp value={v} prefix={p} className="mt-1 block text-base font-semibold text-ink" />
          </Item>
        ))}
      </Stagger>
      <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] border-t border-border bg-muted/40 px-4 py-2 text-[10px] uppercase tracking-wide text-faint">
        <span>Load</span><span>Driver</span><span>Rate</span><span className="text-right">Payroll</span>
      </div>
      <Stagger className="divide-y divide-border border-t border-border" gap={0.08}>
        {rows.map(([id, route, drv, truck, rate, tone, st]) => (
          <Item key={id} variants={RISE} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] items-center px-4 py-3 text-sm">
            <div className="min-w-0"><p className="font-medium text-ink">{id}</p><p className="truncate text-xs text-faint">{route}</p></div>
            <div className="min-w-0"><p className="truncate text-ink">{drv}</p><p className="truncate text-xs text-faint">{truck}</p></div>
            <span className="font-medium text-ink">{rate}</span>
            <span className="flex justify-end"><Badge tone={tone}>{st}</Badge></span>
          </Item>
        ))}
      </Stagger>
    </Frame>
  );
}

/* Real CARTO tile map + REAL road route (OSRM geometry) + moving truck.
   Shared inner canvas used by both the carrier Live-map and the dispatcher
   Map-view mockups. `labels` toggles the pick-up / delivery callouts. */
function MapCanvas({ height = 360, labels = true }) {
  const TILE = 256, Z = 5, SCALE = TILE * 2 ** Z;
  const W = 560, H = height;
  const CENTER = { lat: 37.33, lng: -92.21 };
  const worldPx = (lat, lng) => {
    const sin = Math.sin((lat * Math.PI) / 180);
    return { x: ((lng + 180) / 360) * SCALE, y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * SCALE };
  };
  const c = worldPx(CENTER.lat, CENTER.lng);
  const project = (lat, lng) => { const p = worldPx(lat, lng); return { x: W / 2 + (p.x - c.x), y: H / 2 + (p.y - c.y) }; };
  const centerTile = { x: Math.floor(c.x / TILE), y: Math.floor(c.y / TILE) };
  const off = { x: c.x - centerTile.x * TILE, y: c.y - centerTile.y * TILE };
  const tiles = [];
  for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
    const tx = centerTile.x + dx, ty = centerTile.y + dy;
    const sub = ["a", "b", "c"][Math.abs(tx + ty) % 3];
    tiles.push({ key: `${dx}_${dy}`, left: W / 2 - off.x + dx * TILE, top: H / 2 - off.y + dy * TILE, url: `https://${sub}.basemaps.cartocdn.com/light_all/${Z}/${tx}/${ty}.png` });
  }
  const pts = ROUTE_CHI_DAL.map(([lng, lat]) => project(lat, lng));
  const d = pts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const pu = pts[0], del = pts[pts.length - 1];
  return (
    <div className="relative overflow-hidden bg-muted" style={{ height }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: W, height: H }}>
        {tiles.map((t) => (
          <img key={t.key} src={t.url} alt="" draggable={false} className="absolute h-64 w-64 max-w-none select-none" style={{ left: t.left, top: t.top, filter: "saturate(0.92) brightness(1.02)" }} />
        ))}
        <svg width={W} height={H} className="absolute inset-0">
          <path d={d} fill="none" stroke="#3b82f6" strokeOpacity="0.2" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path id="route" d={d} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" className="route-flow" />
          <g>
            <circle r="13" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
            <path d="M0 -5 L4 5 L0 2.2 L-4 5 Z" fill="#ffffff" />
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto"><mpath href="#route" /></animateMotion>
          </g>
          <circle cx={pu.x} cy={pu.y} r="6" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
          <circle cx={del.x} cy={del.y} r="6" fill="#f97316" stroke="#fff" strokeWidth="2.5" />
        </svg>
        {labels ? (
          <>
            <span className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white" style={{ left: pu.x, top: pu.y - 10 }}>Pick up · Chicago, IL</span>
            <span className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white" style={{ left: del.x, top: del.y - 10 }}>Delivery · Dallas, TX</span>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function MapMock() {
  return (
    <Frame title="hunterTMS · Live map">
      <MapCanvas height={360} />
    </Frame>
  );
}

export function TimelineMock() {
  // Mirrors the platform timeline: lane label + day grid + bars (id tag on top,
  // route + rate inside a muted body with a colored left accent).
  const TONE = { delivered: "#13AC67", en_route: "#FDB022", active: "#3b82f6" };
  const lanes = [
    { d: "Andrew Stone", t: "#2042", bars: [{ id: "#9157619", route: "TX → CO", rate: "$2,875", l: 8, w: 30, tone: "delivered" }, { id: "#9158004", route: "CO → IL", rate: "$1,980", l: 62, w: 24, tone: "active" }] },
    { d: "Gudelio Ramos", t: "#1974", bars: [{ id: "#9157553", route: "IL → TX", rate: "$3,450", l: 28, w: 34, tone: "active" }] },
    { d: "Maks Orlov", t: "#1888", bars: [{ id: "#9157901", route: "NE → AZ", rate: "$4,100", l: 46, w: 30, tone: "en_route" }] },
  ];
  let i = 0;
  return (
    <Frame title="hunterTMS · Timeline">
      <div className="grid grid-cols-[120px_1fr]">
        <div className="border-b border-r border-border bg-muted/40 px-3 py-2 text-[10px] font-medium text-faint">May 2026</div>
        <div className="grid grid-cols-7 border-b border-border bg-muted/40 text-center text-[10px] text-faint">
          {["11", "12", "13", "14", "15", "16", "17"].map((dd, k) => <div key={dd} className={`py-2 ${k ? "border-l border-border" : ""}`}>{dd}</div>)}
        </div>
      </div>
      <div className="divide-y divide-border">
        {lanes.map((lane) => (
          <div key={lane.d} className="grid grid-cols-[120px_1fr]">
            <div className="border-r border-border px-3 py-3">
              <p className="truncate text-xs font-semibold text-ink">{lane.d}</p>
              <p className="text-[10px] text-faint">Truck {lane.t}</p>
            </div>
            <div className="relative h-[72px]">
              <div className="absolute inset-0 grid grid-cols-7">{Array.from({ length: 7 }).map((_, k) => <div key={k} className={`${k ? "border-l border-border/70" : ""} ${k >= 5 ? "bg-muted/40" : ""}`} />)}</div>
              {lane.bars.map((b, k) => {
                const delay = (i++ * 0.12).toFixed(2);
                const color = TONE[b.tone];
                return (
                  <div key={k} className="bar-grow absolute flex flex-col" style={{ left: `${b.l}%`, width: `${b.w}%`, top: 10, animationDelay: `${delay}s` }}>
                    <span className="w-fit rounded-t-[5px] px-1.5 py-0.5 text-[9px] font-medium leading-none text-white" style={{ backgroundColor: color }}>{b.id}</span>
                    <div className="relative overflow-hidden rounded-[5px] rounded-tl-none bg-muted py-1 pl-2 pr-1" style={{ height: 36 }}>
                      <span className="absolute left-0 top-0 h-full w-[3px]" style={{ backgroundColor: color }} />
                      <p className="truncate text-[10px] font-medium text-ink">{b.route}</p>
                      <p className="truncate text-[10px] text-faint">{b.rate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function BillingMock() {
  const meta = [["Bill to", "Blue Arrow Brokerage"], ["Terms", "Net 30"], ["Route", "Chicago → Dallas"], ["Distance", "1,432 mi"]];
  const lines = [["Line haul", "$3,250"], ["Fuel surcharge", "$200"]];
  return (
    <Frame title="hunterTMS · Invoice">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div><p className="text-sm font-bold text-ink">Hunt Carrier LLC</p><p className="text-[11px] text-faint">MC-1048291 · DOT 4203694</p></div>
          <div className="text-right"><p className="text-sm font-bold uppercase tracking-tight text-ink">Invoice</p><p className="text-[11px] text-faint">#101907</p></div>
        </div>
        <Stagger className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-4 text-xs" gap={0.05}>
          {meta.map(([l, v]) => (
            <Item key={l} variants={RISE}><p className="text-faint">{l}</p><p className="font-medium text-ink">{v}</p></Item>
          ))}
        </Stagger>
        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          {lines.map(([l, v]) => (
            <motion.div key={l} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE }} className="flex justify-between text-body"><span>{l}</span><span>{v}</span></motion.div>
          ))}
          <div className="flex justify-between border-t border-border pt-2 font-semibold text-ink"><span>Amount due</span><CountUp value={3450} prefix="$" /></div>
        </div>
        <Stagger className="mt-4 flex items-center gap-2" gap={0.1}>
          <Item variants={POP}><Badge tone="green">Sent to factor</Badge></Item>
          <Item variants={POP}><Badge tone="grey">Net 30</Badge></Item>
        </Stagger>
      </div>
    </Frame>
  );
}

export function ExpenseMock() {
  const rows = [
    ["Fuel", "May 19, 2026", "$615.22", "green", "Approved"],
    ["Toll", "May 19, 2026", "$84.90", "amber", "Needs assignment"],
    ["Scale", "May 18, 2026", "$12.00", "blue", "Ready"],
  ];
  return (
    <Frame title="hunterTMS · Expenses">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-ink">Expenses (3)</p>
        <CountUp value={712.12} decimals={2} prefix="−$" className="text-sm font-semibold text-ink" />
      </div>
      <Stagger className="divide-y divide-border" gap={0.09}>
        {rows.map(([type, date, amt, tone, st]) => (
          <Item key={type} variants={RISE} className="px-4 py-3 text-sm">
            <div className="flex items-baseline justify-between"><p className="font-semibold text-ink">{type}</p><span className="font-semibold text-ink">{amt}</span></div>
            <p className="mt-0.5 text-xs text-faint">{date}</p>
            <div className="mt-2 flex items-center justify-between"><span className="text-faint">Status</span><Badge tone={tone}>{st}</Badge></div>
          </Item>
        ))}
      </Stagger>
    </Frame>
  );
}

export function PayrollMock() {
  return (
    <Frame title="hunterTMS · Payroll">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-semibold text-ink">Gudelio Ramos</p><p className="text-[11px] text-faint">SET-1048 · Per mile · May 13–20</p></div>
          <Badge tone="green">Ready</Badge>
        </div>
        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <Stagger className="space-y-2" gap={0.07}>
            {[["Linehaul (1,432 mi × $0.60)", "$859.20"], ["Bonus", "$150.00"], ["Deductions", "−$120.00"], ["Reimbursements", "$84.90"]].map(([l, v]) => (
              <Item key={l} variants={RISE} className="flex justify-between text-body"><span>{l}</span><span>{v}</span></Item>
            ))}
          </Stagger>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-ink"><span>Net pay</span><CountUp value={974.10} decimals={2} prefix="$" /></div>
        </div>
        <Stagger className="mt-4 grid grid-cols-3 gap-2" gap={0.08}>
          {[["Driver", "Gudelio R."], ["Method", "Per mile"], ["Loads", "3"]].map(([l, v]) => (
            <Item key={l} variants={POP} className="rounded-lg border border-border bg-muted/40 px-3 py-2"><p className="text-[10px] uppercase text-faint">{l}</p><p className="text-xs font-medium text-ink">{v}</p></Item>
          ))}
        </Stagger>
      </div>
    </Frame>
  );
}

export function ComplianceMock() {
  const docs = [
    ["CDL", "Exp 2027-02-18", "green", "Uploaded"],
    ["Medical card", "Exp 2026-09-15", "green", "Uploaded"],
    ["Drug test", "Pending result", "amber", "Review"],
  ];
  return (
    <Frame title="hunterTMS · Driver">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div><p className="text-sm font-semibold text-ink">Gudelio Ramos</p><p className="text-[11px] text-faint">Company driver · Zigzag Carrier LLC</p></div>
        <Badge tone="green">Active</Badge>
      </div>
      <Stagger className="divide-y divide-border" gap={0.09}>
        {docs.map(([name, sub, tone, st]) => (
          <Item key={name} variants={RISE} className="flex items-center justify-between px-4 py-3 text-sm">
            <div><p className="font-medium text-ink">{name}</p><p className="text-xs text-faint">{sub}</p></div>
            <Badge tone={tone}>{st}</Badge>
          </Item>
        ))}
      </Stagger>
      <Stagger className="flex flex-wrap gap-1.5 border-t border-border p-4" gap={0.08}>
        {["Hazmat", "Tanker", "TWIC"].map((e) => <Item key={e} variants={POP} className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-ink">{e}</Item>)}
      </Stagger>
    </Frame>
  );
}

export function HuntBotMock() {
  const msgs = [
    { who: "bot", text: "Hi, I'm HuntBot. Ask me to open a screen, generate payroll, or compare BOL vs Rate Con." },
    { who: "user", text: "Generate payroll for all dispatchers last week" },
    { who: "bot", text: "Generated 3 dispatcher settlements · $520 commission total.", link: "Open payroll →" },
  ];
  const [ref, inView] = useInViewLoop();
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!inView) return;
    let n = 0, t;
    const run = () => {
      if (n >= msgs.length) {
        t = setTimeout(() => { n = 0; setStep(0); setTyping(false); t = setTimeout(run, 500); }, 2800);
        return;
      }
      setTyping(true);
      t = setTimeout(() => { setTyping(false); n += 1; setStep(n); t = setTimeout(run, 650); }, 850);
    };
    t = setTimeout(run, 350);
    return () => clearTimeout(t);
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  const next = step < msgs.length ? msgs[step] : null;
  return (
    <Frame title="hunterTMS · HuntBot">
      <div ref={ref} className="min-h-[176px] space-y-3 p-4">
        {msgs.slice(0, step).map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease: EASE }} className={`flex ${m.who === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.who === "user" ? "bg-brand text-white" : "bg-muted text-ink"}`}>{m.text}{m.link ? <> <span className="font-medium text-brand">{m.link}</span></> : null}</div>
          </motion.div>
        ))}
        {typing && next ? (
          <div className={`flex ${next.who === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-1 rounded-2xl px-3 py-2.5 ${next.who === "user" ? "bg-brand" : "bg-muted"}`}>
              {[0, 1, 2].map((dd) => <span key={dd} className={`typing-dot h-1.5 w-1.5 rounded-full ${next.who === "user" ? "bg-white/80" : "bg-faint"}`} style={{ animationDelay: `${dd * 0.15}s` }} />)}
            </div>
          </div>
        ) : null}
      </div>
      <div className="border-t border-border p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {["Show expenses for #1974", "Compare BOL & Rate Con"].map((s) => <span key={s} className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-faint">{s}</span>)}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-full border border-border bg-white px-3 py-2 text-sm text-faint">Ask HuntBot…</div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </Frame>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Dispatcher feature mockups — rebuilt as JSX in the shared shadcn language
   (Frame chrome + border/muted tokens + Badge pills + grey AreaChart/MiniTable)
   so they're pixel-consistent with the carrier mockups and the hero dashboard.
   ════════════════════════════════════════════════════════════════════════ */

/* 1 · Timeline — calendar board of every truck, conflicts at a glance. */
export function DispatchTimelineMock() {
  const TONE = { delivered: "#13AC67", active: "#3b82f6", en_route: "#FDB022", late: "#ef4444", booked: "#9ca3af" };
  const days = ["Tue 28", "Wed 29", "Thu 30", "Fri 31", "Sat 1"];
  const lanes = [
    { d: "Michael Johnson", t: "#2042", bars: [
      { id: "#456432", route: "OR → CA", rate: "$5,600", mi: "2,500 mi", rpm: "2.24", split: true, l: 2, w: 37, tone: "delivered" },
      { id: "#236432", route: "NE → VA", rate: "$2,700", mi: "1,258 mi", rpm: "2.14", l: 42, w: 30, tone: "active" },
    ] },
    { d: "Alice Smith", t: "#1974", bars: [
      { id: "#85-48-92", route: "PA → IL", rate: "$2,100", mi: "995 mi", rpm: "2.11", l: 8, w: 38, tone: "delivered" },
      { id: "#456DFR", route: "MS → MS", rate: "$5,600", mi: "2,500 mi", rpm: "2.24", l: 60, w: 32, tone: "booked" },
    ] },
    { d: "Tom Brown", t: "#1888", bars: [
      { id: "#456432", route: "IN → UT", rate: "$800", mi: "521 mi", rpm: "1.54", warn: true, l: 0, w: 28, tone: "late" },
      { id: "#456432", route: "CA → NV", rate: "$1,100", mi: "478 mi", rpm: "2.30", l: 42, w: 32, tone: "en_route" },
    ] },
    { d: "Daniel Moore", t: "#3051", bars: [
      { id: "#236432", route: "NE → VA", rate: "$2,700", mi: "1,258 mi", rpm: "2.14", l: 4, w: 36, tone: "delivered" },
      { id: "#48432", route: "NC → NJ", rate: "$1,500", mi: "844 mi", rpm: "1.70", l: 58, w: 34, tone: "en_route" },
    ] },
  ];
  let k = 0;
  return (
    <Frame title="hunterTMS · Timeline">
      <div className="grid grid-cols-[132px_1fr]">
        <div className="border-b border-r border-border bg-muted/40 px-3 py-2 text-[10px] font-medium text-faint">May 2026</div>
        <div className="grid grid-cols-5 border-b border-border bg-muted/40 text-center text-[10px] text-faint">
          {days.map((dd, i) => <div key={dd} className={`py-2 ${i ? "border-l border-border" : ""}`}>{dd}</div>)}
        </div>
      </div>
      <div className="divide-y divide-border">
        {lanes.map((lane) => (
          <div key={lane.d} className="grid grid-cols-[132px_1fr]">
            <div className="border-r border-border px-3 py-3">
              <p className="truncate text-xs font-semibold text-ink">{lane.d}</p>
              <p className="text-[10px] text-faint">Truck {lane.t}</p>
            </div>
            <div className="relative h-[88px]">
              <div className="absolute inset-0 grid grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className={`${i ? "border-l border-border/70" : ""} ${i >= 4 ? "bg-muted/40" : ""}`} />)}</div>
              {lane.bars.map((b, i) => {
                const color = TONE[b.tone];
                const delay = (k++ * 0.1).toFixed(2);
                return (
                  <div key={i} className="bar-grow absolute" style={{ left: `${b.l}%`, width: `${b.w}%`, top: 12, animationDelay: `${delay}s` }}>
                    <div className={`flex items-center gap-1 rounded-t-[6px] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white ${b.warn ? "warn-pulse" : ""}`} style={{ backgroundColor: color }}>
                      <span className="truncate">{b.id}</span>
                      <MapPin className="ml-auto h-2.5 w-2.5 shrink-0 text-white/90" />
                      {b.warn ? <AlertTriangle className="h-2.5 w-2.5 shrink-0" /> : null}
                    </div>
                    <div className="overflow-hidden rounded-b-[6px] border border-t-0 border-border bg-white px-2 py-1.5">
                      <p className="truncate text-[11px] font-medium text-ink">{b.route}</p>
                      <p className="truncate text-[10px] text-faint">{b.rate} · {b.mi} · {b.rpm}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 2 · View totals — auto-cycles Day/Week/Month; numbers and trend re-animate. */
export function ViewTotalsMock() {
  const ranges = ["Day", "Week", "Month"];
  const DATA = {
    Day: { rev: 51508, miles: 732, rpm: 4.05, rd: "5.4%", md: "3.1%", pd: "2.0%", chart: [120, 138, 132, 165, 150, 196], axis: ["8a", "10a", "12p", "2p", "4p", "6p"] },
    Week: { rev: 360820, miles: 5120, rpm: 4.12, rd: "9.8%", md: "6.4%", pd: "4.2%", chart: [80, 120, 104, 150, 168, 210], axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    Month: { rev: 1545231, miles: 21950, rpm: 4.20, rd: "20.1%", md: "12.4%", pd: "20.1%", chart: [110, 142, 128, 182, 158, 232], axis: ["W1", "W2", "W3", "W4", "W5", "W6"] },
  };
  const [ref, inView] = useInViewLoop();
  const [ri, setRi] = useState(2);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setRi((p) => (p + 1) % 3), 2600);
    return () => clearInterval(id);
  }, [inView]);
  const r = ranges[ri];
  const d = DATA[r];
  const stats = [
    { label: "Total revenue", Icon: DollarSign, val: `$${d.rev.toLocaleString("en-US")}`, delta: d.rd },
    { label: "Total miles", Icon: Gauge, val: `${d.miles.toLocaleString("en-US")} mi`, delta: d.md },
    { label: "Rate per mile", Icon: BarChart3, val: `$${d.rpm.toFixed(2)}`, delta: d.pd },
  ];
  return (
    <Frame title="hunterTMS · Totals">
      <div ref={ref} className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-ink">Totals</p>
        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/50 p-0.5 text-[11px]">
          {ranges.map((t) => (
            <span key={t} className={`relative rounded-md px-2.5 py-1 transition-colors duration-300 ${t === r ? "font-medium text-ink" : "text-faint"}`}>
              {t === r ? <motion.span layoutId="totals-seg" className="absolute inset-0 rounded-md bg-white shadow-[0_1px_2px_rgba(23,23,23,0.06)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
              <span className="relative">{t}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-faint"><s.Icon className="h-3.5 w-3.5" /><span className="truncate text-[11px] font-medium">{s.label}</span></div>
            <div className="mt-1.5 h-[26px] overflow-hidden">
              <motion.p key={s.val} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="truncate text-lg font-semibold tracking-tight text-ink">{s.val}</motion.p>
            </div>
            <div className="mt-0.5 flex items-center gap-1">
              <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-600"><ArrowUpRight className="h-3 w-3" />{s.delta}</span>
              <span className="hidden text-[10px] text-faint sm:inline">vs last</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <AreaChart key={r} data={d.chart} lo={Math.min(...d.chart) - 30} hi={Math.max(...d.chart) + 20} />
        <div className="flex justify-between text-[10px] text-faint">{d.axis.map((x, i) => <span key={i}>{x}</span>)}</div>
      </div>
    </Frame>
  );
}

/* 3 · Map view — live driver positions on the real map + a driver panel. */
export function DispatchMapMock() {
  const drivers = [
    ["Michael Johnson", "Columbus, OH", "active", "On time"],
    ["Alice Smith", "Seattle, WA", "en_route", "En route"],
    ["Tom Brown", "Reno, NV", "late", "12m late"],
    ["Daniel Moore", "El Paso, TX", "active", "On time"],
  ];
  const dot = { active: "bg-emerald-500", en_route: "bg-amber-500", late: "bg-rose-500" };
  const [ref, inView] = useInViewLoop();
  const [hi, setHi] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setHi((p) => (p + 1) % drivers.length), 1700);
    return () => clearInterval(id);
  }, [inView, drivers.length]);
  return (
    <Frame title="hunterTMS · Map">
      <div className="relative">
        <MapCanvas height={340} labels={false} />
        <div ref={ref} className="absolute right-3 top-3 w-[210px] max-w-[58%] rounded-xl border border-border bg-white/95 p-2 shadow-[0_12px_40px_-12px_rgba(23,23,23,0.25)] backdrop-blur">
          <p className="px-1.5 pb-1 pt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">Drivers · 4 live</p>
          <div className="space-y-0.5">
            {drivers.map(([name, city, tone, st], i) => (
              <div key={name} className={`flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition-colors duration-500 ${i === hi ? "bg-muted/70" : ""}`}>
                <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                  {(i === hi || tone === "late") ? <span className={`absolute inline-flex h-2 w-2 rounded-full opacity-60 ${dot[tone]} animate-ping`} /> : null}
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${dot[tone]}`} />
                </span>
                <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-ink">{name}</p><p className="truncate text-[10px] text-faint">{city}</p></div>
                <span className="shrink-0 text-[10px] text-faint">{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 4 · Full load info — one source of truth: stops, money, docs, notes. */
export function LoadInfoMock() {
  const stops = [
    ["DH", "4033 NW Yeon Ave, Portland, OR", "500 mi · 33h 45m", "bg-neutral-700"],
    ["1", "10185 NW 307th Ave, North Plains, OR", "663 mi · 15h 45m", "bg-brand"],
    ["2", "3229 JACFL UPS JACKS, Jacksonville, FL", "Delivery", "bg-emerald-500"],
  ];
  const meta = [["Broker", "Blue Arrow Brokerage"], ["D/H miles", "48 mi"], ["Payment", "$4,200"], ["Expenses", "−$712"]];
  const docs = [["RC", "bg-brand"], ["BOL", "bg-emerald-500"], ["LUMP", "bg-amber-500"]];
  return (
    <Frame title="hunterTMS · Load #456432">
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-border p-4 md:border-b-0 md:border-r">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">Route · 3 stops</p>
          <div className="relative">
            <span className="absolute left-[13px] top-3 bottom-7 w-px bg-border" />
            <Stagger gap={0.12}>
              {stops.map(([badge, addr, sub, bg], i) => (
                <Item key={i} variants={RISE} className="relative flex items-start gap-3 py-1.5">
                  <span className={`relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${bg}`}>{badge}</span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="truncate text-[13px] font-medium text-ink">{addr}</p>
                    <p className="text-[11px] text-faint">{sub}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
        <div className="p-4">
          <Stagger className="grid grid-cols-2 gap-x-3 gap-y-3" gap={0.06}>
            {meta.map(([l, v]) => (
              <Item key={l} variants={RISE}><p className="text-[10px] uppercase tracking-wide text-faint">{l}</p><p className="mt-0.5 text-[13px] font-medium text-ink">{v}</p></Item>
            ))}
          </Stagger>
          <p className="mb-2 mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">Documents</p>
          <Stagger className="flex gap-2" gap={0.1}>
            {docs.map(([l, bg]) => (
              <Item key={l} variants={POP} className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-white">
                <span className={`rounded px-1 py-0.5 text-[8px] font-bold text-white ${bg}`}>{l}</span>
                <Paperclip className="h-3 w-3 text-faint" />
              </Item>
            ))}
          </Stagger>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
            <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint" />
            <p className="text-[11px] leading-relaxed text-body">Detention approved at delivery — 2h at $45/h. Lumper receipt attached.</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 5 · Full load history — time-stamped event log, who changed what & when. */
export function LoadHistoryMock() {
  const events = [
    ["Load was created", "Taylor Johnson", "03/25/2025 · 14:48", "bg-brand"],
    ["Assigned to driver — Michael Johnson", "Jordan Smith", "03/25/2025 · 15:02", "bg-neutral-400"],
    ["Status changed ASSIGNED → BILLED", "Jordan Smith", "03/26/2025 · 09:14", "bg-amber-500"],
    ["BOL uploaded · delivery confirmed", "Michael Johnson", "03/27/2025 · 18:30", "bg-emerald-500"],
    ["Invoice #101907 sent to factor", "System", "03/27/2025 · 18:31", "bg-emerald-500"],
  ];
  const [ref, inView] = useInViewLoop();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i = i >= events.length + 3 ? 0 : i + 1;
      setN(Math.min(i, events.length));
    }, 640);
    return () => clearInterval(id);
  }, [inView, events.length]);
  return (
    <Frame title="hunterTMS · Load history">
      <div ref={ref} className="relative p-5">
        <span className="absolute left-[26px] top-8 bottom-9 w-px bg-border" />
        {events.map(([action, who, ts, bg], i) => {
          const on = i < n;
          return (
            <motion.div key={i} animate={{ opacity: on ? 1 : 0.22, x: on ? 0 : -5 }} transition={{ duration: 0.4, ease: EASE }} className="relative flex items-start gap-3 py-2">
              <span className={`relative z-10 mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full ${on ? bg : "bg-border"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {on && i === n - 1 ? <span className={`absolute inline-flex h-[14px] w-[14px] rounded-full opacity-50 ${bg} animate-ping`} /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink">{action}</p>
                <p className="mt-0.5 text-[11px] text-faint">{who} · {ts}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Frame>
  );
}

/* 6 · Status view — standardized load stages, each with a clear meaning. */
export function StatusViewMock() {
  const statuses = [
    ["New load", "Created and added to the workflow — carrier/driver not confirmed yet.", "#9ca3af", "bg-muted text-faint"],
    ["En route", "In transit — the driver is moving toward delivery.", "#FDB022", "bg-amber-50 text-amber-600"],
    ["Driver late", "Late compared to the scheduled pickup or delivery window.", "#ef4444", "bg-rose-50 text-rose-500"],
    ["Delivered", "The load has been delivered and the shipment is complete.", "#13AC67", "bg-emerald-50 text-emerald-600"],
    ["TONU", "Truck Ordered Not Used — booked but canceled or not loaded.", "#ef4444", "bg-rose-50 text-rose-500"],
    ["Billed", "An invoice has been issued for the load.", "#3b82f6", "bg-brand-soft text-brand"],
  ];
  const [ref, inView] = useInViewLoop();
  const [cur, setCur] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCur((p) => (p + 1) % statuses.length), 1500);
    return () => clearInterval(id);
  }, [inView, statuses.length]);
  return (
    <Frame title="hunterTMS · Load statuses">
      <Stagger ref={ref} className="grid gap-px bg-border sm:grid-cols-2" gap={0.06}>
        {statuses.map(([label, desc, accent, badge], i) => (
          <Item key={label} variants={RISE} className="relative bg-white p-4 pl-5">
            <span className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: accent }} />
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-faint">Status</span>
              <motion.span animate={i === cur ? { scale: [1, 1.09, 1] } : { scale: 1 }} transition={{ duration: 0.6, ease: EASE }} className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge}`}>{label}</motion.span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-body">{desc}</p>
          </Item>
        ))}
      </Stagger>
    </Frame>
  );
}

/* 7 · AI RC Scanner — drop a Rate Con, the scanner parses the fields. */
export function RcScannerMock() {
  const fields = [
    ["Pick-up", "Kemet Electronics Corp.", "3450 Roy Orr Blvd, Grand Prairie, TX"],
    ["Delivery", "3229 JACFL UPS JACKS", "4420 Imeson RD, Jacksonville, FL"],
  ];
  const cells = [["Size & Type", "53' TORD"], ["Pieces", "20"], ["Weight", "45,000 lb"], ["Miles", "1,010 mi"], ["Rate", "$4,200.00"], ["Equipment", "Dry Van"]];
  const total = fields.length + cells.length; // 8
  const [ref, inView] = useInViewLoop();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i = i >= total + 4 ? 0 : i + 1; // reveal, hold, then restart with the next beam pass
      setN(Math.min(i, total));
    }, 300);
    return () => clearInterval(id);
  }, [inView, total]);
  return (
    <Frame title="hunterTMS · AI RC Scanner">
      <div ref={ref} className="grid md:grid-cols-2">
        <div className="flex flex-col border-b border-border bg-muted/40 p-5 md:border-b-0 md:border-r">
          <div className="relative flex-1 overflow-hidden rounded-lg border border-border bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold text-ink">Rate confirmation</p>
            <div className="mt-3 space-y-1.5">
              {[80, 64, 72, 50, 68, 44, 58, 66].map((w, i) => <span key={i} className="block h-1.5 rounded-full bg-muted" style={{ width: `${w}%` }} />)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
              {[60, 70, 52, 64].map((w, i) => <span key={i} className="block h-1.5 rounded-full bg-muted" style={{ width: `${w}%` }} />)}
            </div>
            <div className="scan-beam pointer-events-none absolute inset-x-0 h-16" />
          </div>
          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-medium text-brand"><ScanLine className="h-3.5 w-3.5" /> Scanning…</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /><p className="text-sm font-semibold text-ink">Extracted</p><span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium tabular-nums text-faint">{n} / {total} fields</span></div>
          <div className="mt-3 space-y-2">
            {fields.map(([l, name, addr], i) => (
              <motion.div key={l} animate={{ opacity: i < n ? 1 : 0.2, y: i < n ? 0 : 6 }} transition={{ duration: 0.35, ease: EASE }} className="rounded-lg border border-border bg-white p-2.5">
                <p className="text-[10px] uppercase tracking-wide text-faint">{l}</p>
                <p className="truncate text-[12px] font-medium text-ink">{name}</p>
                <p className="truncate text-[11px] text-faint">{addr}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {cells.map(([l, v], i) => (
              <motion.div key={l} animate={{ opacity: fields.length + i < n ? 1 : 0.2, y: fields.length + i < n ? 0 : 6 }} transition={{ duration: 0.35, ease: EASE }} className="rounded-lg border border-border bg-muted/40 px-2 py-1.5"><p className="truncate text-[9px] uppercase tracking-wide text-faint">{l}</p><p className="truncate text-[11px] font-medium text-ink">{v}</p></motion.div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 8 · Team management — invite, assign roles, see everyone at a glance. */
export function TeamMock() {
  const tabs = [["Overview", null, true], ["Supervisors", "2", false], ["Dispatchers", "14", false]];
  const people = [
    ["SW", "Sarah Williams", "Supervisor", "active"],
    ["CB", "Christopher Brown", "Dispatcher", "active"],
    ["ED", "Emily Davis", "Dispatcher", "active"],
    ["JM", "James Miller", "Dispatcher", "active"],
    ["OW", "Olivia Wilson", "Dispatcher", "invited"],
  ];
  const [ref, inView] = useInViewLoop();
  const [hi, setHi] = useState(-1);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setHi((p) => (p + 1) % people.length), 1600);
    return () => clearInterval(id);
  }, [inView, people.length]);
  return (
    <Frame title="hunterTMS · Team">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-0.5 text-[12px]">
          {tabs.map(([label, count, active]) => (
            <span key={label} className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 ${active ? "bg-ink font-medium text-white" : "text-faint"}`}>
              {label}{count ? <span className={`rounded-full px-1.5 text-[10px] ${active ? "bg-white/20" : "bg-muted text-faint"}`}>{count}</span> : null}
            </span>
          ))}
        </div>
        <div className="ml-auto hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-[12px] text-faint sm:flex"><Search className="h-3.5 w-3.5" />Search by name…</div>
        <button className="flex items-center gap-1.5 rounded-lg bg-ink px-2.5 py-1.5 text-[12px] font-medium text-white"><Plus className="h-3.5 w-3.5" />Invite</button>
      </div>
      <div className="grid grid-cols-[1.6fr_1fr_0.8fr] gap-3 border-b border-border bg-muted/40 px-4 py-2 text-[10px] uppercase tracking-wide text-faint">
        <span>Name</span><span>Role</span><span className="text-right">Status</span>
      </div>
      <Stagger ref={ref} className="divide-y divide-border" gap={0.07}>
        {people.map(([initials, name, role, st], i) => (
          <Item key={name} variants={RISE} className="relative grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-3 px-4 py-2.5 text-[13px]">
            <span aria-hidden className={`pointer-events-none absolute inset-0 bg-muted/60 transition-opacity duration-500 ${i === hi ? "opacity-100" : "opacity-0"}`} />
            <div className="relative flex min-w-0 items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-faint">{initials}</span>
              <span className="truncate font-medium text-ink">{name}</span>
            </div>
            <span className="relative text-faint">{role}</span>
            <span className="relative flex items-center justify-end gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${st === "active" ? "bg-emerald-500" : "bg-amber-400"}`} />
              <span className="text-[12px] text-faint">{st === "active" ? "Active" : "Invited"}</span>
            </span>
          </Item>
        ))}
      </Stagger>
    </Frame>
  );
}

/* 9 · Reports — grouped, exportable performance & finance reports. */
export function ReportsMock() {
  const cols = "grid grid-cols-[1.8fr_0.7fr_0.9fr_0.7fr_0.9fr]";
  const groups = [
    { name: "Sarah Williams", loads: "16", miles: "1,254", rpm: "2.00", gross: "$19,600", drivers: [
      ["James Miller", "4", "412", "2.00", "$5,200"],
      ["Ethan Carter", "9", "1,254", "2.00", "$11,700"],
      ["Sophia Reynolds", "3", "388", "2.00", "$2,700"],
    ] },
    { name: "Marcus Lee", loads: "12", miles: "988", rpm: "2.14", gross: "$14,300", drivers: [
      ["Liam Thompson", "7", "642", "2.10", "$8,900"],
      ["Olivia Wilson", "5", "346", "2.20", "$5,400"],
    ] },
  ];
  const [ref, inView] = useInViewLoop();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setOpen((o) => !o), 2800);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <Frame title="hunterTMS · Reports">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-ink">Dispatcher performance</p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-faint">May 2026</span>
        <div className="ml-auto flex items-center gap-1.5">
          {["CSV", "PDF"].map((x) => <span key={x} className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-medium text-body"><Download className="h-3 w-3" />{x}</span>)}
        </div>
      </div>
      <div className={`${cols} gap-3 border-b border-border bg-muted/40 px-4 py-2 text-[10px] uppercase tracking-wide text-faint`}>
        <span>Dispatcher</span><span className="text-right">Loads</span><span className="text-right">Miles</span><span className="text-right">$/mi</span><span className="text-right">Gross</span>
      </div>
      <div ref={ref} className="divide-y divide-border text-[13px]">
        {groups.map((g, gi) => {
          const expanded = gi !== 0 || open;
          return (
            <div key={g.name}>
              <div className={`${cols} items-center gap-3 bg-white px-4 py-2.5 font-medium`}>
                <span className="flex items-center gap-1.5 text-ink">
                  <motion.span animate={{ rotate: expanded ? 0 : -90 }} transition={{ duration: 0.3, ease: EASE }} className="inline-flex"><ChevronDown className="h-3.5 w-3.5 text-faint" /></motion.span>
                  {g.name}
                </span>
                <span className="text-right text-ink">{g.loads}</span>
                <span className="text-right text-body">{g.miles}</span>
                <span className="text-right text-body">{g.rpm}</span>
                <span className="text-right text-ink">{g.gross}</span>
              </div>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div key="rows" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                    {g.drivers.map((d) => (
                      <div key={d[0]} className={`${cols} items-center gap-3 bg-muted/20 px-4 py-2 text-faint`}>
                        <span className="truncate pl-5 text-body">{d[0]}</span>
                        <span className="text-right">{d[1]}</span>
                        <span className="text-right">{d[2]}</span>
                        <span className="text-right">{d[3]}</span>
                        <span className="text-right text-ink">{d[4]}</span>
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* 10 · Dashboard — business overview: KPIs, trend, top dispatchers & carriers. */
export function DashboardSummaryMock() {
  const kpis = [
    { label: "Total gross", v: 1545231, p: "$", delta: "20.1%" },
    { label: "Monthly revenue", v: 35231, p: "$", delta: "20.1%" },
    { label: "Loads completed", v: 1122, delta: "8.4%" },
  ];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const dispatchers = [["Michael Johnson", "456", "$200,000"], ["Sarah Williams", "378", "$183,000"], ["Christopher Brown", "345", "$150,000"], ["Emily Davis", "321", "$80,000"]];
  const carriers = [["XPO Logistics", "456", "$204,000"], ["Cardinal Logistics", "378", "$182,000"], ["Landstar", "345", "$151,000"], ["Estes Express", "321", "$88,000"]];
  return (
    <Frame title="hunterTMS · Dashboard">
      <div className="space-y-4 p-4">
        <Stagger className="grid grid-cols-3 gap-3">
          {kpis.map(({ label, v, p, delta }) => (
            <Item key={label} variants={RISE} className="rounded-xl border border-border bg-white p-4">
              <p className="truncate text-xs font-medium text-faint">{label}</p>
              <CountUp value={v} prefix={p} className="mt-2 block truncate text-xl font-semibold tracking-tight text-ink md:text-2xl" />
              <div className="mt-1"><Delta value={delta} /></div>
            </Item>
          ))}
        </Stagger>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Trend chart</p>
              <span className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] text-faint">Top by: Gross <ChevronDown className="h-3 w-3" /></span>
            </div>
            <AreaChart data={[180, 300, 260, 90, 150, 235]} lo={60} hi={320} />
            <div className="flex justify-between text-[10px] text-faint">{months.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-sm font-semibold text-ink">Loads volume</p>
            <AreaChart data={[8, 11, 9, 14, 12, 17]} lo={5} hi={20} />
            <div className="flex justify-between text-[10px] text-faint">{months.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <MiniTable title="Top dispatchers" sub="By gross booked" head={["Dispatcher", "Loads", "Gross"]} rows={dispatchers} />
          <MiniTable title="Top carriers" sub="By revenue" head={["Carrier", "Loads", "Revenue"]} rows={carriers} />
        </div>
      </div>
    </Frame>
  );
}
