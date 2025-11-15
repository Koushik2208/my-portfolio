"use server";

import mongoose from "mongoose";
import Project, { IProject, IProjectDoc } from "@/database/project.model";
import handleError from "../handlers/error";
import { AddProjectSchema, UpdateProjectSchema } from "../validations";
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

export async function getProjects(): Promise<ActionResponse<IProjectDoc[]>> {
  try {
    console.log("getProjects");
    const validationResult = await action({});
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    console.log(projects, "projects");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(projects)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getProject(
  id: string
): Promise<ActionResponse<IProject>> {
  try {
    const validationResult = await action({});
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(new Error("Invalid project ID")) as ErrorResponse;
    }

    const project = await Project.findById(id).lean();

    if (!project) {
      return handleError(new Error("Project not found")) as ErrorResponse;
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(project)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateProject(
  id: string,
  params: UpdateProjectParams
): Promise<ActionResponse<IProject>> {
  const validationResult = await action({
    params,
    schema: UpdateProjectSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleError(new Error("Invalid project ID")) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...validationResult.params,
      },
      { new: true, session }
    );

    if (!project) {
      throw new Error("Project not found");
    }

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

export async function deleteProject(id: string): Promise<ActionResponse<void>> {
  try {
    const validationResult = await action({});
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(new Error("Invalid project ID")) as ErrorResponse;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const project = await Project.findByIdAndDelete(id).session(session);

      if (!project) {
        throw new Error("Project not found");
      }

      await session.commitTransaction();

      return {
        success: true,
        data: undefined,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
