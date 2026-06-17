"use client";

import { useRef, useState, useLayoutEffect } from "react";

// Renders children at a fixed desktop design width and scales the whole block
// down to fit narrower screens. So the app preview reads as a real (if smaller)
// product shot — no cramped reflow, no wrapped badges, far less vertical scroll
// — instead of collapsing into a tall single-column mobile layout.
// At/above the design width it renders fluidly (scale 1), unchanged.
export default function FitToWidth({ designWidth = 1280, className = "", children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(undefined);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const measure = () => {
      const cw = outer.clientWidth;
      const s = Math.min(1, cw / designWidth);
      setScale(s);
      setHeight(s < 1 ? inner.offsetHeight * s : undefined);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth]);

  const scaled = scale < 1;
  return (
    <div ref={outerRef} className={className} style={{ height }}>
      <div
        ref={innerRef}
        style={{
          width: scaled ? designWidth : "100%",
          transform: scaled ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
