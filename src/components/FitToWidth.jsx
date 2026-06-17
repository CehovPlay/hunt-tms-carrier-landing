"use client";

import { useRef, useState, useLayoutEffect } from "react";

// Adaptive hero preview for the app mock:
// • Phone (< phoneBelow): keep the mock at full, readable size in its own mobile
//   (container-query) layout, but cap the height and fade the bottom out — a tidy
//   "readable top" preview instead of an endlessly tall block.
// • Tablet / small desktop (< designWidth): render the full desktop layout at a
//   fixed design width and scale the whole thing down to fit — a crisp product
//   shot with no cramped reflow or wrapped badges.
// • Desktop (>= designWidth): render fluidly at scale 1, unchanged.
export default function FitToWidth({ designWidth = 1280, phoneBelow = 600, phoneMaxHeight = 460, className = "", children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [cw, setCw] = useState(designWidth);
  const [innerH, setInnerH] = useState(0);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const measure = () => {
      setCw(outer.clientWidth);
      setInnerH(inner.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  const phone = cw < phoneBelow;
  const scale = phone ? 1 : Math.min(1, cw / designWidth);
  const fixedWidth = !phone && scale < 1; // tablet / small desktop scaling path

  const outerStyle = phone
    ? {
        maxHeight: phoneMaxHeight,
        WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent)",
        maskImage: "linear-gradient(to bottom, #000 72%, transparent)",
      }
    : { height: fixedWidth ? innerH * scale : undefined };

  return (
    <div ref={outerRef} className={`overflow-hidden ${className}`} style={outerStyle}>
      <div
        ref={innerRef}
        style={{
          width: fixedWidth ? designWidth : "100%",
          transform: fixedWidth ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
