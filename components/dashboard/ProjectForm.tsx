"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AddProjectSchema } from "@/lib/validations";
import { addProject } from "@/lib/actions/project.action";
import { IProject } from "@/database/project.model";

type ProjectFormData = z.infer<typeof AddProjectSchema>;

export default function ProjectForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(AddProjectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    alert(JSON.stringify(data));
    setStatus("loading");
    setMessage("");

    try {
      const result: ActionResponse<IProject> = await addProject(
        data as AddProjectParams
      );

      if (result.success) {
        setStatus("success");
        setMessage("Project added successfully!");
        reset();
      } else {
        setStatus("error");
        setMessage("Failed to add project");
      }
    } catch (error: unknown) {
      const err = error as Error;
      setStatus("error");
      setMessage(err.message ?? "An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      {/* Name */}
      <div>
        <input
          placeholder="Project name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <textarea
          placeholder="Description"
          rows={4}
          {...register("description")}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <input
          placeholder="Image URL (optional)"
          {...register("image")}
          className="w-full p-2 border rounded"
        />
        {errors.image && (
          <p className="text-red-600 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Live URL */}
      <div>
        <input
          placeholder="Live URL (optional)"
          {...register("url")}
          className="w-full p-2 border rounded"
        />
        {errors.url && (
          <p className="text-red-600 text-sm">{errors.url.message}</p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <input
          placeholder="GitHub URL (optional)"
          {...register("github")}
          className="w-full p-2 border rounded"
        />
        {errors.github && (
          <p className="text-red-600 text-sm">{errors.github.message}</p>
        )}
      </div>

      {/* Tech Stack */}
      {/* <div>
        <input
          placeholder="Tech stack (comma separated)"
          {...register("techStack")}
          className="w-full p-2 border rounded"
        />
        <p className="text-xs text-gray-500">
          e.g., Next.js, Tailwind, TypeScript
        </p>
      </div> */}

      {/* Category */}
      {/* <div>
        <input
          placeholder="Category (optional)"
          {...register("category")}
          className="w-full p-2 border rounded"
        />
      </div> */}

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("featured")} id="featured" />
        <label htmlFor="featured" className="cursor-pointer">
          Featured project
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={`mt-4 py-2 rounded font-medium text-white transition
          ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {status === "loading" ? "Adding…" : "Add Project"}
      </button>

      {/* Feedback */}
      {status === "success" && (
        <p className="text-green-600 font-medium text-center">{message}</p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-medium text-center">{message}</p>
      )}
    </form>
  );
}
