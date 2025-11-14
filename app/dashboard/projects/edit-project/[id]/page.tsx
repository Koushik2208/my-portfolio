import { getProject } from "@/lib/actions/project.action";
import ProjectForm from "@/components/dashboard/ProjectForm";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const result = await getProject(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const projectData = {
    ...result.data,
    _id: id,
  };

  return <ProjectForm initialData={projectData} />;
}

