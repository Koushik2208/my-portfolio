import { getBlogs } from "@/lib/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { Image } from "@imagekit/next";
import DeleteBlogButton from "@/components/dashboard/DeleteBlogButton";

export default async function BlogsPage() {
  const result = await getBlogs();

  if (!result.success) {
    return (
      <div className="container mx-auto">
        <p className="text-destructive">Failed to load blogs</p>
      </div>
    );
  }

  const blogs = result.data || [];

  return (
    <div className="container mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Blogs</h1>
        <Link href="/dashboard/blogs/add-blog" className="w-full sm:w-auto">
          <Button className="font-manrope w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-4xl p-8 shadow-2xl border-0">
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">No blogs yet</h2>
                <p className="text-muted-foreground font-manrope">
                  Get started by creating your first blog post
                </p>
              </div>
              <Link href="/dashboard/blogs/add-blog">
                <Button size="lg" className="w-full sm:w-auto font-manrope">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 font-manrope">
          {blogs.map((blog) => (
            <Card key={blog._id?.toString()} className="overflow-hidden">
              {blog.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/jsmasterykoushik"
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {blog.description}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/blogs/edit-blog/${blog._id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <DeleteBlogButton blogId={blog._id?.toString() || ""} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
