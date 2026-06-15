"use client";

import { useState } from "react";
import Link from "next/link";
import { WideContainer, Wordmark } from "./ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnAccent = "px-6 cursor-pointer rounded-full text-sm font-medium h-10 flex items-center justify-center bg-brand text-white shadow-[inset_0px_2px_4px_1px_rgba(255,255,255,0.4)]";
  const btnWhite = "px-6 cursor-pointer rounded-full text-sm font-medium h-10 flex items-center justify-center bg-white text-ink shadow-[inset_0px_-2px_4px_1px_rgba(23,23,23,0.2)]";

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="flex h-[56px] items-center border-b border-[#E5E5E5] bg-white/70 backdrop-blur-[7.5px]">
        <WideContainer className="flex items-center justify-between">
          <Wordmark badge="For carriers" />

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li><a className="cursor-default text-sm font-medium text-ink opacity-50" href="#">Dispatchers</a></li>
              <li><a className="text-sm font-medium text-ink" href="#features">Features</a></li>
              <li><a className="text-sm font-medium text-ink" href="#faq">Contact</a></li>
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="#cta" className={btnAccent}>Sign in</Link>
            <Link href="#cta" className={btnWhite}>Sign up</Link>
          </div>

          <div className="md:hidden">
            <button type="button" onClick={() => setOpen((v) => !v)} className={btnWhite}>Menu</button>
          </div>
        </WideContainer>
      </div>

      {open ? (
        <div className="border-b border-[#E5E5E5] bg-white md:hidden">
          <WideContainer className="flex flex-col gap-1 py-4">
            <a href="#features" onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-muted">Features</a>
            <a href="#how" onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-muted">How it works</a>
            <a href="#faq" onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-muted">Contact</a>
            <div className="mt-2 flex flex-col gap-2">
              <Link href="#cta" className={btnAccent} onClick={() => setOpen(false)}>Sign in</Link>
              <Link href="#cta" className={btnWhite} onClick={() => setOpen(false)}>Sign up</Link>
            </div>
          </WideContainer>
        </div>
      ) : null}
    </header>
  );
}
