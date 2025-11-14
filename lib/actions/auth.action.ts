// actions/auth/signup.ts
"use server";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/lib/validations";
import action from "../handlers/action";
import handleError from "../error";
import { User } from "@/database";
import { signIn } from "@/auth";

export const SignUpWithCredentials = async (
  params: AuthCredentials
): Promise<ActionResponse> => {
  const validatedResult = await action({ params, schema: SignUpSchema });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { name, email, password } = validatedResult.params!;

  // Since you're the only one — let's block after first user
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("User already exists — this portfolio is single-user only");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin", // you're the king
      isVerified: true,
    });

    await session.commitTransaction();
    return { success: true };
  } catch (error) {
    await session.abortTransaction();

    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export async function SignInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validatedResult = await action({ params, schema: SignUpSchema });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { email, password } = validatedResult.params!;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new Error("User not found");

    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) throw new Error("Invalid credentials");

    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
