"use server";

import { ZodError, ZodSchema } from "zod";
import dbConnect from "../mongoose";
import { ValidationError } from "../http-errors";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean; // Now ignored — kept for future use
};

// Validates params and connects to DB
// Authentication is skipped (no session, no auth check)
async function action<T>({
  params,
  schema,
}: // authorize is ignored for now
ActionOptions<T>) {
  // 1. Validate params against schema (if provided)
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  // 2. Connect to database
  await dbConnect();

  // 3. Return validated params (no session)
  return { params };
}

export default action;
