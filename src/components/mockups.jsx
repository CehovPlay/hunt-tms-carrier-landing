import { Sparkles, Send, CheckCircle2 } from "lucide-react";
import { ROUTE_CHI_DAL } from "@/data/route";

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

/* Real CARTO tile map + REAL road route (OSRM geometry) + moving truck */
export function MapMock() {
  const TILE = 256, Z = 5, SCALE = TILE * 2 ** Z;
  const W = 560, H = 360;
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
    <Frame title="hunterTMS · Live map">
      <div className="relative h-[360px] overflow-hidden bg-muted">
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
          <span className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white" style={{ left: pu.x, top: pu.y - 10 }}>Pick up · Chicago, IL</span>
          <span className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white" style={{ left: del.x, top: del.y - 10 }}>Delivery · Dallas, TX</span>
        </div>
      </div>
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
        <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl bg-muted px-3 py-2 text-sm text-ink">Hi, I'm HuntBot. Ask me to open a screen, generate payroll, or compare BOL vs Rate Con.</div></div>
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
