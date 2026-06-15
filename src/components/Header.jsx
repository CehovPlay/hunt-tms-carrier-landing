"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, Container, Wordmark } from "./ui";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-lead/20 bg-deep-space/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-silver transition-colors hover:text-starlight">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href="#demo" variant="ghost" size="sm">Get a demo</Button>
          <Button href="#cta" size="sm">Try it free</Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-lead/40 text-starlight md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-lead/20 bg-deep-space md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base text-silver hover:bg-graphite hover:text-starlight">
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button href="#demo" variant="outline" onClick={() => setOpen(false)}>Get a demo</Button>
              <Button href="#cta" onClick={() => setOpen(false)}>Try it free</Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
