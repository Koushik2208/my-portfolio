"use server";

import mongoose from "mongoose";
import Project, { IProject } from "@/database/project.model";
import handleError from "../handlers/error";
import { AddProjectSchema } from "../validations";
import action from "../handlers/action";

export async function addProject(
  params: AddProjectParams
): Promise<ActionResponse<IProject>> {
  const validationResult = await action({
    params,
    schema: AddProjectSchema,
    // No authorize: true → allows unauthenticated calls
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    name,
    description,
    image,
    url,
    github,
    techStack = [],
    category,
    featured,
  } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [project] = await Project.create(
      [
        {
          name,
          description,
          image,
          url,
          github,
          techStack,
          category,
          featured,
          // No author field since no auth
        },
      ],
      { session }
    );

    if (!project) throw new Error("Failed to create the project");

    await session.commitTransaction();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(project)),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
