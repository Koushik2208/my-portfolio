// app/contact/page.tsx
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <main className="flex items-center justify-center px-6 py-16 md:py-24">
      <section className="max-w-4xl mx-auto w-full">
        <h1 className="text-center mb-12">Contact</h1>

        {/* Terminal-style */}
        <div className="bg-muted/50 border border-border rounded-lg p-6 font-jetbrains text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <span className="text-green-500">➜</span>
            <span>koushik@portfolio:~$</span>
          </div>

          <div className="space-y-3">
            <p className="font-jetbrains">
              <span className="text-primary">const</span> developer = {"{"}
            </p>
            <p className="pl-6 font-jetbrains">
              <span className="text-blue-500">name</span>:{" "}
              <span className="text-green-400">&apos;Koushik Gorre&apos;</span>,
            </p>
            <p className="pl-6 font-jetbrains">
              <span className="text-blue-500">location</span>:{" "}
              <span className="text-green-400">
                &apos;Hyderabad, India&apos;
              </span>
              ,
            </p>
            <p className="pl-6 font-jetbrains">
              <span className="text-blue-500">email</span>:{" "}
              <a
                href="mailto:gorrekoushik@gmail.com"
                className="text-green-400 underline"
              >
                &apos;gorrekoushik@gmail.com&apos;
              </a>
              ,
            </p>
            <p className="pl-6 font-jetbrains">
              <span className="text-blue-500">stack</span>:
              [&apos;Next.js&apos;, &apos;TypeScript&apos;, &apos;React
              Native&apos;, &apos;Node.js&apos;, &apos;MongoDB&apos;],
            </p>
            <p className="pl-6 font-jetbrains">
              <span className="text-blue-500">available</span>:{" "}
              <span className="text-green-400">true</span>
            </p>
            <p>{"}"};</p>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50 flex gap-3 flex-wrap">
            <Button size="sm" variant="outline" asChild>
              <a href="mailto:gorrekoushik@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Email
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a
                href="https://linkedin.com/in/koushik-gorre"
                target="_blank"
                rel="noopener"
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a
                href="https://github.com/Koushik2208"
                target="_blank"
                rel="noopener"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          </div>
        </div>

        <p className="text-center text-foreground/70 mt-8 text-sm">
          Open to freelance or full-time. Let&apos;s build.
        </p>
      </section>
    </main>
  );
}
