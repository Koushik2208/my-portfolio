"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlog } from "@/lib/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteBlogButtonProps {
  blogId: string;
}

export default function DeleteBlogButton({ blogId }: DeleteBlogButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteBlog(blogId);

      if (result.success) {
        toast.success("Blog deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}

