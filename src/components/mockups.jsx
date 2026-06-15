import { Navigation } from "lucide-react";

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
      <div className="divide-y divide-border border-t border-border">
        {[
          ["#9157553", "Chicago, IL → Dallas, TX", "$3,450", "green", "Ready"],
          ["#9157619", "Austin, TX → Denver, CO", "$2,875", "blue", "Invoiced"],
          ["#9157901", "Omaha, NE → Phoenix, AZ", "$4,100", "amber", "Review"],
        ].map(([id, route, rate, tone, st]) => (
          <div key={id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{id}</p>
              <p className="truncate text-xs text-faint">{route}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-semibold text-ink">{rate}</span>
              <Badge tone={tone}>{st}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Real CARTO tile map (no API key) with an animated route + moving truck. */
export function MapMock() {
  const TILE = 256, Z = 5, SCALE = TILE * 2 ** Z;
  const W = 560, H = 360;
  const CENTER = { lat: 37.33, lng: -92.21 };
  const worldPx = (lat, lng) => {
    const sin = Math.sin((lat * Math.PI) / 180);
    return {
      x: ((lng + 180) / 360) * SCALE,
      y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * SCALE,
    };
  };
  const c = worldPx(CENTER.lat, CENTER.lng);
  const project = (lat, lng) => { const p = worldPx(lat, lng); return { x: W / 2 + (p.x - c.x), y: H / 2 + (p.y - c.y) }; };
  const centerTile = { x: Math.floor(c.x / TILE), y: Math.floor(c.y / TILE) };
  const off = { x: c.x - centerTile.x * TILE, y: c.y - centerTile.y * TILE };
  const tiles = [];
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      const tx = centerTile.x + dx, ty = centerTile.y + dy;
      const sub = ["a", "b", "c"][Math.abs(tx + ty) % 3];
      tiles.push({ key: `${dx}_${dy}`, left: W / 2 - off.x + dx * TILE, top: H / 2 - off.y + dy * TILE, url: `https://${sub}.basemaps.cartocdn.com/light_all/${Z}/${tx}/${ty}.png` });
    }
  }
  const pu = project(41.88, -87.63);   // Chicago (pickup)
  const del = project(32.78, -96.80);  // Dallas (delivery)
  const d = `M ${pu.x} ${pu.y} C ${pu.x - 30} ${pu.y + 110}, ${del.x + 70} ${del.y - 110}, ${del.x} ${del.y}`;

  return (
    <Frame title="hunterTMS · Live map">
      <div className="relative h-[360px] overflow-hidden bg-muted">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: W, height: H }}>
          {tiles.map((t) => (
            <img key={t.key} src={t.url} alt="" draggable={false} className="absolute h-64 w-64 max-w-none select-none" style={{ left: t.left, top: t.top, filter: "saturate(0.92) brightness(1.02)" }} />
          ))}

          <svg width={W} height={H} className="absolute inset-0">
            <path d={d} fill="none" stroke="#3b82f6" strokeOpacity="0.22" strokeWidth="9" strokeLinecap="round" />
            <path id="route" d={d} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <path d={d} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" className="route-flow" />
            <g>
              <circle r="13" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
              <path d="M0 -5 L4 5 L0 2.2 L-4 5 Z" fill="#ffffff" />
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto"><mpath href="#route" /></animateMotion>
            </g>
            <circle cx={pu.x} cy={pu.y} r="6" fill="#10b981" stroke="#fff" strokeWidth="2.5" />
            <circle cx={del.x} cy={del.y} r="6" fill="#f97316" stroke="#fff" strokeWidth="2.5" />
          </svg>

          <span className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white" style={{ left: pu.x, top: pu.y - 10 }}>Pick up · Chicago, IL</span>
          <span className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white" style={{ left: del.x, top: del.y - 10 }}>Delivery · Dallas, TX</span>
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg border border-border bg-white px-3 py-2 shadow-sm">
          <p className="text-xs font-semibold text-ink">Gudelio Ramos · #1974</p>
          <p className="text-[11px] text-faint">ETA Dallas, TX · 2:30 PM</p>
        </div>
        <div className="absolute bottom-3 right-3 rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-medium text-faint shadow-sm">© CARTO · OSM</div>
      </div>
    </Frame>
  );
}

export function TimelineMock() {
  const lanes = [
    { d: "Andrew Stone", bars: [{ l: 30, w: 22, c: "bg-emerald-500" }, { l: 60, w: 18, c: "bg-brand" }] },
    { d: "Gudelio Ramos", bars: [{ l: 10, w: 28, c: "bg-brand" }, { l: 70, w: 20, c: "bg-amber-500" }] },
    { d: "Maks Orlov", bars: [{ l: 44, w: 30, c: "bg-emerald-500" }] },
  ];
  let i = 0;
  return (
    <Frame title="hunterTMS · Timeline">
      <div className="grid grid-cols-7 border-b border-border bg-muted/60 text-center text-[10px] text-faint">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dd) => <div key={dd} className="border-l border-border py-2 first:border-l-0">{dd}</div>)}
      </div>
      <div className="divide-y divide-border">
        {lanes.map((lane) => (
          <div key={lane.d} className="relative h-16 px-4 py-3">
            <p className="text-xs font-medium text-ink">{lane.d}</p>
            <div className="relative mt-2 h-5">
              {lane.bars.map((b, k) => {
                const delay = (i++ * 0.15).toFixed(2);
                return <div key={k} className={`bar-grow absolute top-0 h-5 rounded ${b.c} opacity-90`} style={{ left: `${b.l}%`, width: `${b.w}%`, animationDelay: `${delay}s` }} />;
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
          <div>
            <p className="text-sm font-bold text-ink">Hunt Carrier LLC</p>
            <p className="text-[11px] text-faint">MC-1048291 · DOT 4203694</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold uppercase tracking-tight text-ink">Invoice</p>
            <p className="text-[11px] text-faint">#101907</p>
          </div>
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
        <div className="mt-4 flex items-center gap-2">
          <Badge tone="green">Sent to factor</Badge>
          <Badge tone="grey">Net 30</Badge>
        </div>
      </div>
    </Frame>
  );
}
