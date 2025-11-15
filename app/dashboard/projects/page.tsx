export const dynamic = "force-dynamic";
import { getProjects } from "@/lib/actions/project.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { Image } from "@imagekit/next";
import DeleteProjectButton from "@/components/dashboard/DeleteProjectButton";

export default async function ProjectsPage() {
  const result = await getProjects();

  if (!result.success) {
    return (
      <div className="container mx-auto">
        <p className="text-destructive">Failed to load projects</p>
      </div>
    );
  }

  const projects = result.data || [];

  return (
    <div className="container mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Projects</h1>
        <Link
          href="/dashboard/projects/add-project"
          className="w-full sm:w-auto"
        >
          <Button className="font-manrope w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-4xl p-8 shadow-2xl border-0">
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">No projects yet</h2>
                <p className="text-muted-foreground font-manrope">
                  Get started by creating your first project
                </p>
              </div>
              <Link href="/dashboard/projects/add-project">
                <Button size="lg" className="w-full sm:w-auto font-manrope">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first project
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 font-manrope">
          {projects.map((project) => (
            <Card key={project._id?.toString()} className="overflow-hidden">
              {project.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/jsmasterykoushik"
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{project.name}</CardTitle>
                {project.featured && (
                  <span className="text-xs text-primary font-medium">
                    Featured
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/projects/edit-project/${project._id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <DeleteProjectButton
                    projectId={project._id?.toString() || ""}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
