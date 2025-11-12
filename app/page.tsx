// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center px-6 py-16 font-sora">
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hey, I&apos;m <span className="text-primary">Koushik</span>.
          </h1>
          <p className="prose text-foreground/80 space-y-3 text-lg">
            <span>3+ years shipping full-stack apps in Hyderabad.</span>
            <span>React → Next.js → React Native → Node.js → MongoDB.</span>
            <span>
              Currently building a CRM for salons at{" "}
              <strong className="text-primary">SAS Estetica</strong>.
            </span>
            <span>I build tools that work. This site proves it.</span>
          </p>

          {/* ← YOUR PDF'S SOUL — ADDED HERE */}
          <p className="italic text-foreground/70 mt-6 max-w-xl">
            I’ve shipped 5+ apps. Now I want to build with{" "}
            <strong className="not-italic text-primary">AI at the core</strong>{" "}
            — not as a feature, but as the foundation.
          </p>

          {/* CTA */}
          <div className="flex gap-3 justify-center md:justify-start">
            <Button asChild>
              <Link href="/craft">See My Work</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-card border-2 border-border rounded-full p-2 shadow-xl">
              <Image
                src="/assets/images/me.png"
                alt="Koushik Gorre"
                width={320}
                height={320}
                className="rounded-full object-cover w-72 h-72 md:w-80 md:h-80 transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-md">
              Available
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
