// app/craft/page.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function Craft() {
  return (
    <main className="py-16 md:py-24 px-6 font-manrope">
      <section className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1>Craft</h1>
          <p className="prose text-foreground/80 max-w-3xl mx-auto">
            Full-stack apps. Deployed. Live. Built with{" "}
            <strong>Next.js, TypeScript, Tailwind, shadcn/ui, MongoDB</strong>.
          </p>
        </header>

        {/* Featured: ContentGen Pro */}
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="default">LIVE</Badge>
              <Badge variant="secondary">AI Content</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">ContentGen Pro</h2>
            <p className="text-foreground/80">
              AI generates LinkedIn, Instagram, X posts from your profile. Ready
              to publish.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">OpenAI</Badge>
              <Badge variant="outline">Supabase</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <a
                  href="https://content-gen-sooty.vercel.app/"
                  target="_blank"
                  rel="noopener"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a
                  href="https://github.com/Koushik2208/content-gen"
                  target="_blank"
                  rel="noopener"
                >
                  <Github className="mr-2 h-4 w-4" /> Code
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative group">
              <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                <Image
                  src="/assets/images/contentgen-pro.png"
                  alt="ContentGen Pro — AI Content Generator"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-md">
                Featured Project
              </div>
            </div>
          </div>
        </div>

        {/* Projects + Tech in Action */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Projects — 2/3 */}
          <div className="lg:col-span-2 space-y-12">
            {/* Law Office Hub */}
            <div className="border-l-4 border-primary/20 pl-6 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Law Office Hub</h3>
                <Badge variant="secondary">CRM</Badge>
              </div>
              <p className="text-foreground/80">
                Case tracking dashboard. Filter by lawyer, court, date.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">MongoDB</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <a
                    href="https://law-office-ruby.vercel.app/"
                    target="_blank"
                    rel="noopener"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live
                  </a>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a
                    href="https://github.com/Koushik2208/law-office"
                    target="_blank"
                    rel="noopener"
                  >
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
              </div>
            </div>

            {/* Mylaru Infra */}
            <div className="border-l-4 border-primary/20 pl-6 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Mylaru Infra</h3>
                <Badge variant="secondary">Marketing + Admin</Badge>
              </div>
              <p className="text-foreground/80">
                Construction company site with admin panel. SEO-optimized.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">Node.js</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <a
                    href="https://mylaruinfra.vercel.app/"
                    target="_blank"
                    rel="noopener"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live
                  </a>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a
                    href="https://github.com/Koushik2208/mylaruinfra"
                    target="_blank"
                    rel="noopener"
                  >
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
              </div>
            </div>

            {/* DevFlow */}
            <div className="border-l-4 border-primary/20 pl-6 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">DevFlow</h3>
                <Badge variant="secondary">First Next.js</Badge>
              </div>
              <p className="text-foreground/80">
                Stack Overflow clone with OpenAI answer enhancement. My first
                Next.js app.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">MongoDB</Badge>
              </div>
              <Button size="sm" variant="ghost" asChild>
                <a
                  href="https://github.com/Koushik2208/next15-devflow"
                  target="_blank"
                  rel="noopener"
                >
                  <Github className="mr-2 h-4 w-4" /> View Code
                </a>
              </Button>
            </div>
          </div>

          {/* Tech in Action — 1/3 */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <h3 className="text-lg font-bold">Tech in Action</h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="font-medium text-foreground">Next.js</p>
                  <p className="text-muted-foreground">
                    3 live projects: ContentGen Pro, Law Office, Mylaru Infra
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">React Native</p>
                  <p className="text-muted-foreground">
                    Built 2 Android apps solo (Opoto, Vharvest). Docs + muscle
                    memory = fast delivery.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">MongoDB</p>
                  <p className="text-muted-foreground">
                    Data modeling in Law Office Hub & DevFlow
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">OpenAI API</p>
                  <p className="text-muted-foreground">
                    AI content generation in ContentGen Pro
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">REST APIs</p>
                  <p className="text-muted-foreground">
                    Connected frontend → backend in all apps
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Git</p>
                  <p className="text-muted-foreground">
                    Code reviews & collaboration at KriSanTec
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-foreground/70 prose max-w-2xl mx-auto">
          Learning <strong>Generative AI</strong>. Building faster. Shipping
          harder.
        </p>
      </section>
    </main>
  );
}
