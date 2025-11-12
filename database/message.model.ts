import { model, models, Schema, Document } from "mongoose";

// 🧠 TypeScript interface: describes how a Message looks in code
export interface IMessage {
  name: string;
  email: string;
  message: string;
  status: "read" | "unread";
  createdAt?: Date;
  updatedAt?: Date;
}

// 🧩 Combines your interface with Mongoose's built-in document features
export interface IMessageDoc extends IMessage, Document {}

// 🏗️ Define the schema (structure) for a Message
const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["read", "unread"],
      default: "unread",
    },
  },
  { timestamps: true } // ⏰ Auto-creates createdAt and updatedAt fields
);

// ♻️ Reuse model if it already exists (prevents re-compiling during hot reloads)
const Message = models?.Message || model<IMessage>("Message", MessageSchema);

// 🚀 Export the model for use in APIs
export default Message;
