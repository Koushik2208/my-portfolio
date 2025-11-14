import { getBlog } from "@/lib/actions/blog.action";
import BlogForm from "@/components/dashboard/BlogForm";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const result = await getBlog(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const blogData = {
    ...result.data,
    _id: id,
  };

  return <BlogForm initialData={blogData} />;
}

