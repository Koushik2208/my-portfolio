// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, FileText } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

const navItems = [
  { href: "/craft", label: "Craft" },
  { href: "/journey", label: "Journey" },
  { href: "/vision", label: "Vision" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className={`text-lg font-bold transition-colors ${
            pathname === "/" ? "text-primary" : "hover:text-primary"
          }`}
        >
          Koushik
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-sm font-medium transition-colors
                  ${
                    active
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }
                `}
              >
                {item.label}
                {/* Underline */}
                <span
                  className={`
                    absolute -bottom-1 left-0 h-0.5 bg-primary
                    transition-transform duration-300 ease-out
                    ${active ? "w-full" : "w-0"}
                  `}
                  style={{
                    transformOrigin: "left",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                {/* Hover expand */}
                <span
                  className={`
                    absolute -bottom-1 left-0 h-0.5 bg-primary/30
                    transition-transform duration-300 ease-out
                    ${active ? "w-full scale-x-100" : "w-0 scale-x-0"}
                  `}
                  style={{
                    transformOrigin: "left",
                  }}
                />
              </Link>
            );
          })}

          {/* Mode Toggle */}
          <div className="ml-4">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="lg"
                  asChild
                  className="justify-start"
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}

              {/* Mobile Resume */}
              <Button
                variant="outline"
                size="lg"
                className="justify-start"
                asChild
              >
                <a
                  href="/assets/resume/koushik-resume.pdf"
                  download="Koushik_Gorre_Resume.pdf"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  Download Resume
                </a>
              </Button>

              {/* Mobile Theme Toggle */}
              <div className="mt-4 border-t pt-4">
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
