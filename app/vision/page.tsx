// app/vision/page.tsx
import { Badge } from "@/components/ui/badge";
import { Zap, Brain, Mic, Image as ImageIcon, Globe } from "lucide-react";

export default function Vision() {
  return (
    <main className="py-16 md:py-24 px-6">
      <section className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1>Vision</h1>
          <p className="prose text-foreground/80 max-w-3xl mx-auto text-lg leading-relaxed">
            I&apos;m done building dashboards.
            <br />
            I&apos;m becoming an <strong>AI generalist</strong> — using GenAI to
            <strong>solve problems no one has solved yet</strong>.
          </p>
        </header>

        {/* Core Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: The Future I See */}
          <div className="space-y-8">
            <div className="bg-card border rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Powered Platforms
              </h3>
              <p className="text-foreground/80">
                Not another CRUD app. I want to build{" "}
                <strong>AI-native systems</strong> — like Perplexity for news,
                but for <strong>local problems</strong>,{" "}
                <strong>real people</strong>, <strong>real data</strong>.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Problems No One&apos;s Solving
              </h3>
              <p className="text-foreground/80">
                I see gaps everywhere — in villages, streets, supply chains. I
                want to <strong>connect data, people, and AI</strong> to close
                them.
              </p>
            </div>
          </div>

          {/* Right: My AI Toolkit */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">AI Generalist Toolkit</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">n8n + Make.com</p>
                  <p className="text-muted-foreground">
                    Building AI agents that automate workflows
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Diffusion Models</p>
                  <p className="text-muted-foreground">
                    Understand how image generation works under the hood
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">VAPI</p>
                  <p className="text-muted-foreground">
                    Building voice agents that talk like humans
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">RAG + Prompt Engineering</p>
                  <p className="text-muted-foreground">
                    Making LLMs remember, reason, and respond accurately
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <Badge variant="default" className="text-lg px-6 py-2">
            Available for AI-Native Projects
          </Badge>
          <p className="prose text-foreground/70 max-w-2xl mx-auto italic">
            I&apos;ve shipped 5+ apps. I know React, Next.js, Node, MongoDB.
            <br />
            But now? I want to <strong>build with AI at the core</strong> — not
            as a feature, but as the <strong>foundation</strong>.
            <br />
            <br />
            <strong className="text-primary">
              If you&apos;re building the future — let&apos;s build it together.
            </strong>
          </p>
        </div>
      </section>
    </main>
  );
}
