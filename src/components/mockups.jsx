import { Sparkles, Send, CheckCircle2, House, Route, FileText, Receipt, WalletCards, BarChart3, Clock3, MapPin, UserRound, Truck, Settings, Search, Bell, ChevronRight, FileScan, Fuel, Activity, Building2, PanelLeft, LayoutDashboard, AlignLeft, Users, ChevronDown, Download, ArrowUpRight, Plus, ScanLine, Paperclip, StickyNote, AlertTriangle, Gauge, DollarSign, Calendar, Phone, Mail } from "lucide-react";
import { ROUTE_CHI_DAL } from "@/data/route";

// Small green "▲ 20.1%" delta pill used across the analytics mockups.
function Delta({ value, tone = "green" }) {
  const tones = { green: "text-emerald-600", red: "text-rose-500" };
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${tones[tone]}`}>
      <ArrowUpRight className="h-3 w-3" />{value}
    </span>
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
      <div className="mt-1 divide-y divide-border">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-2 py-2 text-xs">
            <span className="truncate font-medium text-ink">{r[0]}</span>
            <span className="text-faint">{r[1]}</span>
            <span className="text-right font-medium text-ink">{r[2]}</span>
          </div>
        ))}
      </div>
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
    ["Revenue", "$12,975", "4 loads booked"],
    ["Open receivables", "$10,425", "3 invoices waiting"],
    ["Delivered loads", "4", "delivered, invoiced or paid"],
    ["Payroll outstanding", "$4,846", "6 not closed"],
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
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {kpis.map(([label, value, hint]) => (
                <div key={label} className="rounded-xl border border-border bg-white p-4">
                  <p className="truncate text-xs font-medium text-faint">{label}</p>
                  <p className="mt-2 truncate text-2xl font-semibold tracking-tight text-ink">{value}</p>
                  <p className="mt-0.5 truncate text-[11px] text-faint">{hint}</p>
                </div>
              ))}
            </div>

            {/* Needs attention · Monthly profit · Meet HuntBot */}
            <div className="grid gap-3 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Needs attention</p>
                  <span className="text-[11px] text-faint">View all ›</span>
                </div>
                <p className="text-[11px] text-faint">Highest-impact records to open first.</p>
                <div className="mt-3 space-y-1.5">
                  {attention.map(([label, detail]) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-faint"><FileText className="h-3 w-3" /></span>
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-ink">{label}</p><p className="truncate text-[10px] text-faint">{detail}</p></div>
                      <ChevronRight className="h-3.5 w-3.5 text-faint" />
                    </div>
                  ))}
                </div>
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
                  <path d={area} fill="url(#profitFill)" />
                  <path d={line} fill="none" stroke="#525252" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  {profit.map((v, i) => <circle key={i} cx={px(i)} cy={py(v)} r="2" fill="#fff" stroke="#525252" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />)}
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

/* Small smooth area chart used by the dispatcher dashboard. */
function AreaChart({ data, lo, hi }) {
  const W = 300, padB = 96;
  const px = (i) => 6 + (i * (W - 12)) / (data.length - 1);
  const py = (v) => padB - ((v - lo) / (hi - lo)) * (padB - 14);
  const line = data.map((v, i) => `${i ? "L" : "M"} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${px(data.length - 1).toFixed(1)} ${padB} L ${px(0).toFixed(1)} ${padB} Z`;
  return (
    <svg viewBox="0 0 300 104" preserveAspectRatio="none" className="h-[120px] w-full">
      <defs>
        <linearGradient id={`af${data[0]}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#737373" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#737373" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#af${data[0]})`} />
      <path d={line} fill="none" stroke="#525252" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
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
    ["Gross revenue", "$1,545,231", "this month"],
    ["Dispatchers revenue", "$35,231", "commission earned"],
    ["Loads volume", "1,102", "delivered loads"],
    ["Active dispatchers", "13", "on shift"],
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
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {kpis.map(([label, value, hint]) => (
                <div key={label} className="rounded-xl border border-border bg-white p-4">
                  <p className="truncate text-xs font-medium text-faint">{label}</p>
                  <p className="mt-2 truncate text-2xl font-semibold tracking-tight text-ink">{value}</p>
                  <p className="mt-0.5 truncate text-[11px] text-faint">{hint}</p>
                </div>
              ))}
            </div>

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
  return (
    <Frame title="hunterTMS · Loads">
      <div className="grid grid-cols-4 gap-px bg-border">
        {[["Revenue", "$12,975"], ["Receivables", "$10,425"], ["Delivered", "2"], ["Payroll", "$4,169"]].map(([l, v]) => (
          <div key={l} className="bg-white px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-wide text-faint">{l}</p>
            <p className="mt-1 text-base font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] border-t border-border bg-muted/40 px-4 py-2 text-[10px] uppercase tracking-wide text-faint">
        <span>Load</span><span>Driver</span><span>Rate</span><span className="text-right">Payroll</span>
      </div>
      <div className="divide-y divide-border border-t border-border">
        {[
          ["#9157553", "Chicago → Dallas", "Gudelio Ramos", "#1974", "$3,450", "green", "Ready"],
          ["#9157619", "Austin → Denver", "Andrew Stone", "#2042", "$2,875", "amber", "Review"],
          ["#9157901", "Omaha → Phoenix", "Maks Orlov", "#1888", "$4,100", "green", "Paid"],
        ].map(([id, route, drv, truck, rate, tone, st]) => (
          <div key={id} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] items-center px-4 py-3 text-sm">
            <div className="min-w-0"><p className="font-medium text-ink">{id}</p><p className="truncate text-xs text-faint">{route}</p></div>
            <div className="min-w-0"><p className="truncate text-ink">{drv}</p><p className="truncate text-xs text-faint">{truck}</p></div>
            <span className="font-medium text-ink">{rate}</span>
            <span className="flex justify-end"><Badge tone={tone}>{st}</Badge></span>
          </div>
        ))}
      </div>
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
  return (
    <Frame title="hunterTMS · Invoice">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div><p className="text-sm font-bold text-ink">Hunt Carrier LLC</p><p className="text-[11px] text-faint">MC-1048291 · DOT 4203694</p></div>
          <div className="text-right"><p className="text-sm font-bold uppercase tracking-tight text-ink">Invoice</p><p className="text-[11px] text-faint">#101907</p></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-4 text-xs">
          <div><p className="text-faint">Bill to</p><p className="font-medium text-ink">Blue Arrow Brokerage</p></div>
          <div><p className="text-faint">Terms</p><p className="font-medium text-ink">Net 30</p></div>
          <div><p className="text-faint">Route</p><p className="font-medium text-ink">Chicago → Dallas</p></div>
          <div><p className="text-faint">Distance</p><p className="font-medium text-ink">1,432 mi</p></div>
        </div>
        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-body"><span>Line haul</span><span>$3,250</span></div>
          <div className="flex justify-between text-body"><span>Fuel surcharge</span><span>$200</span></div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold text-ink"><span>Amount due</span><span>$3,450</span></div>
        </div>
        <div className="mt-4 flex items-center gap-2"><Badge tone="green">Sent to factor</Badge><Badge tone="grey">Net 30</Badge></div>
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
        <span className="text-sm font-semibold text-ink">−$712.12</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map(([type, date, amt, tone, st]) => (
          <div key={type} className="px-4 py-3 text-sm">
            <div className="flex items-baseline justify-between"><p className="font-semibold text-ink">{type}</p><span className="font-semibold text-ink">{amt}</span></div>
            <p className="mt-0.5 text-xs text-faint">{date}</p>
            <div className="mt-2 flex items-center justify-between"><span className="text-faint">Status</span><Badge tone={tone}>{st}</Badge></div>
          </div>
        ))}
      </div>
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
          <div className="flex justify-between text-body"><span>Linehaul (1,432 mi × $0.60)</span><span>$859.20</span></div>
          <div className="flex justify-between text-body"><span>Bonus</span><span>$150.00</span></div>
          <div className="flex justify-between text-body"><span>Deductions</span><span>−$120.00</span></div>
          <div className="flex justify-between text-body"><span>Reimbursements</span><span>$84.90</span></div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-ink"><span>Net pay</span><span>$974.10</span></div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[["Driver", "Gudelio R."], ["Method", "Per mile"], ["Loads", "3"]].map(([l, v]) => (
            <div key={l} className="rounded-lg border border-border bg-muted/40 px-3 py-2"><p className="text-[10px] uppercase text-faint">{l}</p><p className="text-xs font-medium text-ink">{v}</p></div>
          ))}
        </div>
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
      <div className="divide-y divide-border">
        {docs.map(([name, sub, tone, st]) => (
          <div key={name} className="flex items-center justify-between px-4 py-3 text-sm">
            <div><p className="font-medium text-ink">{name}</p><p className="text-xs text-faint">{sub}</p></div>
            <Badge tone={tone}>{st}</Badge>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-border p-4">
        {["Hazmat", "Tanker", "TWIC"].map((e) => <span key={e} className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-ink">{e}</span>)}
      </div>
    </Frame>
  );
}

export function HuntBotMock() {
  return (
    <Frame title="hunterTMS · HuntBot">
      <div className="space-y-3 p-4">
        <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl bg-muted px-3 py-2 text-sm text-ink">Hi, I&apos;m HuntBot. Ask me to open a screen, generate payroll, or compare BOL vs Rate Con.</div></div>
        <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl bg-brand px-3 py-2 text-sm text-white">Generate payroll for all dispatchers last week</div></div>
        <div className="flex justify-start"><div className="max-w-[85%] rounded-2xl bg-muted px-3 py-2 text-sm text-ink">Generated 3 dispatcher settlements · $520 commission total. <span className="font-medium text-brand">Open payroll →</span></div></div>
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
                    <div className="flex items-center gap-1 rounded-t-[6px] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white" style={{ backgroundColor: color }}>
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

/* 2 · View totals — revenue / miles / RPM by time range, with a trend. */
export function ViewTotalsMock() {
  const days = ["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14", "Sat 15"];
  const stats = [
    ["Total revenue", "$1,545,231", "20.1%", DollarSign],
    ["Total miles", "21,950 mi", "12.4%", Gauge],
    ["Rate per mile", "$4.20", "20.1%", BarChart3],
  ];
  return (
    <Frame title="hunterTMS · Totals">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-ink">Totals</p>
        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/50 p-0.5 text-[11px]">
          {["Day", "Week", "Month"].map((t) => <span key={t} className={`rounded-md px-2.5 py-1 ${t === "Month" ? "bg-white font-medium text-ink shadow-[0_1px_2px_rgba(23,23,23,0.06)]" : "text-faint"}`}>{t}</span>)}
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {stats.map(([label, value, delta, Icon]) => (
          <div key={label} className="px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-faint"><Icon className="h-3.5 w-3.5" /><span className="truncate text-[11px] font-medium">{label}</span></div>
            <p className="mt-1.5 truncate text-lg font-semibold tracking-tight text-ink">{value}</p>
            <div className="mt-0.5 flex items-center gap-1"><Delta value={delta} /><span className="hidden text-[10px] text-faint sm:inline">vs last month</span></div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <AreaChart data={[120, 138, 132, 165, 150, 196]} lo={100} hi={210} />
        <div className="flex justify-between text-[10px] text-faint">{days.map((d) => <span key={d}>{d}</span>)}</div>
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
  return (
    <Frame title="hunterTMS · Map">
      <div className="relative">
        <MapCanvas height={340} labels={false} />
        <div className="absolute right-3 top-3 w-[210px] max-w-[58%] rounded-xl border border-border bg-white/95 p-2 shadow-[0_12px_40px_-12px_rgba(23,23,23,0.25)] backdrop-blur">
          <p className="px-1.5 pb-1 pt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">Drivers · 4 live</p>
          <div className="space-y-0.5">
            {drivers.map(([name, city, tone, st]) => (
              <div key={name} className="flex items-center gap-2 rounded-lg px-1.5 py-1.5">
                <span className={`h-2 w-2 shrink-0 rounded-full ${dot[tone]}`} />
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
            {stops.map(([badge, addr, sub, bg], i) => (
              <div key={i} className="relative flex items-start gap-3 py-1.5">
                <span className={`relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${bg}`}>{badge}</span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="truncate text-[13px] font-medium text-ink">{addr}</p>
                  <p className="text-[11px] text-faint">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            {meta.map(([l, v]) => (
              <div key={l}><p className="text-[10px] uppercase tracking-wide text-faint">{l}</p><p className="mt-0.5 text-[13px] font-medium text-ink">{v}</p></div>
            ))}
          </div>
          <p className="mb-2 mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">Documents</p>
          <div className="flex gap-2">
            {docs.map(([l, bg]) => (
              <div key={l} className="flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-white">
                <span className={`rounded px-1 py-0.5 text-[8px] font-bold text-white ${bg}`}>{l}</span>
                <Paperclip className="h-3 w-3 text-faint" />
              </div>
            ))}
          </div>
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
  return (
    <Frame title="hunterTMS · Load history">
      <div className="relative p-5">
        <span className="absolute left-[26px] top-8 bottom-9 w-px bg-border" />
        {events.map(([action, who, ts, bg], i) => (
          <div key={i} className="relative flex items-start gap-3 py-2">
            <span className={`relative z-10 mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full ${bg}`}><span className="h-1.5 w-1.5 rounded-full bg-white" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-ink">{action}</p>
              <p className="mt-0.5 text-[11px] text-faint">{who} · {ts}</p>
            </div>
          </div>
        ))}
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
  return (
    <Frame title="hunterTMS · Load statuses">
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {statuses.map(([label, desc, accent, badge]) => (
          <div key={label} className="relative bg-white p-4 pl-5">
            <span className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: accent }} />
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-faint">Status</span>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge}`}>{label}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-body">{desc}</p>
          </div>
        ))}
      </div>
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
  return (
    <Frame title="hunterTMS · AI RC Scanner">
      <div className="grid md:grid-cols-2">
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
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /><p className="text-sm font-semibold text-ink">Extracted</p><span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-faint">8 fields</span></div>
          <div className="mt-3 space-y-2">
            {fields.map(([l, name, addr]) => (
              <div key={l} className="rounded-lg border border-border bg-white p-2.5">
                <p className="text-[10px] uppercase tracking-wide text-faint">{l}</p>
                <p className="truncate text-[12px] font-medium text-ink">{name}</p>
                <p className="truncate text-[11px] text-faint">{addr}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {cells.map(([l, v]) => (
              <div key={l} className="rounded-lg border border-border bg-muted/40 px-2 py-1.5"><p className="truncate text-[9px] uppercase tracking-wide text-faint">{l}</p><p className="truncate text-[11px] font-medium text-ink">{v}</p></div>
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
      <div className="divide-y divide-border">
        {people.map(([initials, name, role, st]) => (
          <div key={name} className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-3 px-4 py-2.5 text-[13px]">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-faint">{initials}</span>
              <span className="truncate font-medium text-ink">{name}</span>
            </div>
            <span className="text-faint">{role}</span>
            <span className="flex items-center justify-end gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${st === "active" ? "bg-emerald-500" : "bg-amber-400"}`} />
              <span className="text-[12px] text-faint">{st === "active" ? "Active" : "Invited"}</span>
            </span>
          </div>
        ))}
      </div>
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
      <div className="divide-y divide-border text-[13px]">
        {groups.map((g) => (
          <div key={g.name}>
            <div className={`${cols} items-center gap-3 bg-white px-4 py-2.5 font-medium`}>
              <span className="flex items-center gap-1.5 text-ink"><ChevronDown className="h-3.5 w-3.5 text-faint" />{g.name}</span>
              <span className="text-right text-ink">{g.loads}</span>
              <span className="text-right text-body">{g.miles}</span>
              <span className="text-right text-body">{g.rpm}</span>
              <span className="text-right text-ink">{g.gross}</span>
            </div>
            {g.drivers.map((d) => (
              <div key={d[0]} className={`${cols} items-center gap-3 bg-muted/20 px-4 py-2 text-faint`}>
                <span className="truncate pl-5 text-body">{d[0]}</span>
                <span className="text-right">{d[1]}</span>
                <span className="text-right">{d[2]}</span>
                <span className="text-right">{d[3]}</span>
                <span className="text-right text-ink">{d[4]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 10 · Dashboard — business overview: KPIs, trend, top dispatchers & carriers. */
export function DashboardSummaryMock() {
  const kpis = [["Total gross", "$1,545,231", "20.1%"], ["Monthly revenue", "$35,231", "20.1%"], ["Loads completed", "1,122", "8.4%"]];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const dispatchers = [["Michael Johnson", "456", "$200,000"], ["Sarah Williams", "378", "$183,000"], ["Christopher Brown", "345", "$150,000"], ["Emily Davis", "321", "$80,000"]];
  const carriers = [["XPO Logistics", "456", "$204,000"], ["Cardinal Logistics", "378", "$182,000"], ["Landstar", "345", "$151,000"], ["Estes Express", "321", "$88,000"]];
  return (
    <Frame title="hunterTMS · Dashboard">
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3">
          {kpis.map(([label, value, delta]) => (
            <div key={label} className="rounded-xl border border-border bg-white p-4">
              <p className="truncate text-xs font-medium text-faint">{label}</p>
              <p className="mt-2 truncate text-xl font-semibold tracking-tight text-ink md:text-2xl">{value}</p>
              <div className="mt-1"><Delta value={delta} /></div>
            </div>
          ))}
        </div>
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
