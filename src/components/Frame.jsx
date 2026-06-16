// Border-frame grid (à la Aceternity "Nodus"): the page content sits in a
// column whose vertical rules line up with the footer content edges. Inside the
// rules there is a 60px breathing gutter (provided per-section by <Bay>), with a
// small square seated on every border intersection.
import { Container } from "./ui";

function Square({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 h-2 w-2 bg-neutral-300 ${className}`}
    />
  );
}

// Centered column: borders sit exactly at the footer content width (same gutter
// as <Container>), and the two vertical rules run the full height.
export function FrameColumn({ children, className = "" }) {
  return (
    <Container className={className}>
      <div className="relative border-x border-border">{children}</div>
    </Container>
  );
}

// A horizontal divider that spans the FULL viewport width (like the footer
// rules), with a square seated on each vertical rule where the borders cross.
export function FrameRule({ className = "" }) {
  return (
    <div className={`relative z-10 h-px ${className}`}>
      {/* full-bleed line — breaks out of the column to both viewport edges */}
      <div className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-border" />
      {/* squares stay on the vertical rules (column edges) */}
      <Square className="-left-1 -top-1" />
      <Square className="-right-1 -top-1" />
    </div>
  );
}
