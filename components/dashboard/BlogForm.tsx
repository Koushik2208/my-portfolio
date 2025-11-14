"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AddBlogSchema } from "@/lib/validations";
import { addBlog, updateBlog } from "@/lib/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/FileUpload";
import Editor from "@/components/Editor";
import { Card } from "@/components/ui/card";

type BlogFormData = z.infer<typeof AddBlogSchema>;

interface BlogFormProps {
  initialData?: BlogFormData & { _id?: string };
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const form = useForm<BlogFormData>({
    resolver: zodResolver(AddBlogSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    setStatus("loading");

    try {
      let result: ActionResponse<any>;
      
      if (isEditMode && initialData?._id) {
        result = await updateBlog(initialData._id, data);
      } else {
        result = await addBlog(data);
      }

      if (result.success) {
        toast.success(
          isEditMode ? "Blog updated successfully!" : "Blog created successfully!"
        );
        startTransition(() => {
          router.push("/dashboard/blogs");
        });
      } else {
        setStatus("error");
        toast.error(
          isEditMode ? "Failed to update blog" : "Failed to create blog"
        );
      }
    } catch (error: unknown) {
      const err = error as Error;
      setStatus("error");
      toast.error(err.message ?? "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted px-4 py-8">
      <Card className="w-full max-w-4xl p-8 shadow-2xl border-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Edit Blog" : "Create New Blog"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditMode
              ? "Update your blog post"
              : "Write a new blog post"}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 font-manrope"
          >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description (Markdown Editor) */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Write your blog content in markdown..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={status === "loading"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={status === "loading" || isPending}
              className="w-full sm:w-auto"
            >
              {status === "loading" || isPending
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Blog"
                : "Create Blog"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                startTransition(() => {
                  router.push("/dashboard/blogs");
                });
              }}
              disabled={status === "loading" || isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
    </div>
  );
}

