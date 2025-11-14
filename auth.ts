// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { SignInSchema } from "@/lib/validations";
import mongoose from "mongoose";
import { User } from "./database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate with Zod
          const { email, password } = await SignInSchema.parseAsync(
            credentials
          );

          await mongoose.connect(process.env.MONGODB_URI!);

          const user = await User.findOne({ email: email.toLowerCase() });
          if (!user) return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;

          // Return user object (NextAuth will create session)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "admin",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
