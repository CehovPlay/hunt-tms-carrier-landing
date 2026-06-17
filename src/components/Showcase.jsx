"use client";

import { useState } from "react";
import { FileScan, Navigation, BadgeDollarSign, MapPin } from "lucide-react";
import { Bay } from "./ui";
import { Reveal } from "./Reveal";
import { LoadsMock, MapMock, BillingMock, TimelineMock, RcScannerMock } from "./mockups";

// 3-step explainer — each step shows the matching real platform screen.
const VARIANTS = {
  carrier: [
    { icon: FileScan, title: "Import your loads", text: "Connect a broker email or drop a Rate Confirmation — AI parses it and creates the load with driver, truck and stops.", mock: <LoadsMock /> },
    { icon: Navigation, title: "Dispatch & track", text: "Assign a driver, watch them on the live map, and let the timeline board keep every appointment in view.", mock: <MapMock /> },
    { icon: BadgeDollarSign, title: "Bill, pay, repeat", text: "Collect the POD, send the invoice, capture expenses and run payroll — margins and receivables update themselves.", mock: <BillingMock /> },
  ],
  dispatcher: [
    { icon: FileScan, title: "Scan the Rate Con", text: "Drag & drop a Rate Confirmation — AI extracts the data and auto-fills your load fields in seconds.", mock: <RcScannerMock /> },
    { icon: Navigation, title: "Schedule on the Timeline", text: "Schedule loads, see driver availability, and resolve conflicts in seconds with a clean timeline view.", mock: <TimelineMock /> },
    { icon: MapPin, title: "Track & report", text: "Watch every load on the live map and generate operations, performance and finance reports in a click.", mock: <MapMock /> },
  ],
};
const DURATION = 5000;

export default function Showcase({
  variant = "carrier",
  eyebrow = "How it works",
  heading = "From rate con to paid — without the busywork",
  sub = "Three steps. The platform handles the rest.",
} = {}) {
  const STEPS = VARIANTS[variant] || VARIANTS.carrier;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  return (
    <section id="how" className="bg-surface py-24 md:py-28">
      <Bay
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-brand">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">{heading}</h2>
          <p className="mt-4 text-base text-body md:text-lg">{sub}</p>
        </Reveal>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Left — stepper */}
          <div className="flex flex-col">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const on = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden rounded-xl border-t border-border px-5 py-6 text-left transition-colors first:border-t-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset ${on ? "bg-white shadow-[0_1px_2px_rgba(23,23,23,0.05)]" : "hover:bg-white/50"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${on ? "text-brand" : "text-faint"}`} />
                    <h3 className={`text-lg font-semibold ${on ? "text-ink" : "text-faint"}`}>{s.title}</h3>
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed ${on ? "text-body" : "text-faint"}`}>{s.text}</p>
                  {on ? (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-border">
                      <span
                        key={active}
                        className="step-progress block h-full bg-brand"
                        style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }}
                        onAnimationEnd={() => setActive((a) => (a + 1) % STEPS.length)}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Right — live platform screen for the active step */}
          <Reveal delay={0.1}>
            <div className="dot-grid overflow-hidden rounded-2xl border border-border bg-white/50 p-5 md:p-7">
              <div key={active} className="rise overflow-x-auto">{STEPS[active].mock}</div>
            </div>
          </Reveal>
        </div>
      </Bay>
    </section>
  );
}
