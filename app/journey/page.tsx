import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export default function Journey() {
  const experiences = [
    {
      title: "SAS Estetica",
      role: "Junior Full Stack Developer",
      date: "Sep 2025 - Present",
      badge: "default",
      points: [
        "Building CRM for salons & clinics (React + REST APIs)",
        "Dynamic UIs with React Hook Form + Yup",
        "Appointment booking, inventory, vendor login",
      ],
      current: true,
    },
    {
      title: "KriSanTec Solutions",
      role: "Software Trainee Associate",
      date: "May 2023 - Jan 2025",
      badge: "secondary",
      points: [
        "Built 5+ React & React Native apps",
        "Android APKs deployed to real users",
        "Key projects: Vharvest Dashboard, Opoto App",
        "Git + code reviews in startup teams",
      ],
    },
    {
      title: "Ideabytes",
      role: "Software Engineer",
      date: "May 2022 - Jan 2023",
      badge: "outline",
      points: [
        "IoT data processing with JavaScript functions",
        "Real-time monitoring dashboard",
        "API testing with Postman",
      ],
    },
  ];

  return (
    <main className="py-16 md:py-24 px-6">
      <section className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center space-y-6 mb-16">
          <h1>Journey</h1>
          <p className="prose text-foreground/80 max-w-2xl mx-auto">
            From Electronics engineering to shipping full-stack apps in
            startups.
            <br />
            3+ years. Real code. Real users.
          </p>
        </header>

        {/* Timeline + Resume */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Timeline — 2/3 */}
          <div className="lg:col-span-2 space-y-16 relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            {experiences.map((exp) => (
              <div key={exp.title} className="relative flex gap-6">
                {/* Dot */}
                <div className="shrink-0 w-3 h-3 bg-primary rounded-full mt-2 z-10 border-4 border-background" />

                {/* Content */}
                <div className="flex-1 pb-12">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <Badge
                      variant={
                        exp.badge as
                          | "default"
                          | "secondary"
                          | "outline"
                          | "destructive"
                          | null
                          | undefined
                      }
                    >
                      {exp.current ? "Current" : exp.date.split(" – ")[1]}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/70 mb-2">
                    {exp.role} — {exp.date}
                  </p>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
                    {exp.points.map((point, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Resume Preview — 1/3 */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <h3 className="text-lg font-bold mb-4">Full Resume</h3>
              <a
                href="/assets/resume/koushik-resume.pdf"
                target="_blank"
                rel="noopener"
                className="group block"
              >
                <div className="bg-card border rounded-xl p-4 shadow-md transition-all group-hover:shadow-xl group-hover:border-primary">
                  <div className="bg-muted/50 border-2 border-dashed rounded-lg h-96 flex flex-col items-center justify-center space-y-3">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                    <p className="text-sm font-medium">koushik-resume.pdf</p>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary group-hover:underline">
                    <FileText className="h-4 w-4" />
                    View Full Resume
                  </div>
                </div>
              </a>

              {/* Optional: Mini Stats */}
              <div className="text-center text-sm text-muted-foreground">
                <p>3+ years</p>
                <p>5+ apps shipped</p>
                <p>2 Android APKs live</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing */}
        <p className="text-center text-foreground/70 prose max-w-3xl mx-auto leading-relaxed mt-16 italic">
          I started out as an Electronics engineer from Guru Ghasidas
          University, but my real education began when I discovered JavaScript.
          <br />
          <br />
          I&apos;ve always built more than I&apos;ve talked — failing quietly,
          learning deeply. Working in startups taught me resilience — long
          hours, low pay, and tough deadlines. But those struggles gave me the
          courage and confidence to build with React.js even in the harshest
          conditions.
          <br />
          <br />
          Now, I&apos;m focused on growing further, doing meaningful work, and
          being fairly valued for it.
        </p>
      </section>
    </main>
  );
}
