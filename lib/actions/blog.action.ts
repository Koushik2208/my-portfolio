"use server";

import mongoose from "mongoose";
import Blog, { IBlog } from "@/database/blog.model";
import handleError from "../handlers/error";
import { AddBlogSchema, UpdateBlogSchema } from "../validations";
import action from "../handlers/action";

export async function addBlog(
  params: AddBlogParams
): Promise<ActionResponse<IBlog>> {
  const validationResult = await action({
    params,
    schema: AddBlogSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, description, image } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [blog] = await Blog.create(
      [
        {
          title,
          description,
          image,
        },
      ],
      { session }
    );

    if (!blog) throw new Error("Failed to create the blog");

    await session.commitTransaction();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(blog)),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getBlogs(): Promise<ActionResponse<IBlog[]>> {
  try {
    const validationResult = await action({});
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
    
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    
    return {
      success: true,
      data: JSON.parse(JSON.stringify(blogs)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getBlog(
  id: string
): Promise<ActionResponse<IBlog>> {
  try {
    const validationResult = await action({});
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(new Error("Invalid blog ID")) as ErrorResponse;
    }
    
    const blog = await Blog.findById(id).lean();
    
    if (!blog) {
      return handleError(new Error("Blog not found")) as ErrorResponse;
    }
    
    return {
      success: true,
      data: JSON.parse(JSON.stringify(blog)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateBlog(
  id: string,
  params: UpdateBlogParams
): Promise<ActionResponse<IBlog>> {
  const validationResult = await action({
    params,
    schema: UpdateBlogSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleError(new Error("Invalid blog ID")) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        ...validationResult.params,
      },
      { new: true, session }
    );

    if (!blog) {
      throw new Error("Blog not found");
    }

    await session.commitTransaction();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(blog)),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function deleteBlog(
  id: string
): Promise<ActionResponse<void>> {
  try {
    const validationResult = await action({});
    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(new Error("Invalid blog ID")) as ErrorResponse;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const blog = await Blog.findByIdAndDelete(id).session(session);

      if (!blog) {
        throw new Error("Blog not found");
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

