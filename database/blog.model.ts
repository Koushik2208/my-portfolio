import { model, models, Schema, Types } from "mongoose";

export interface IBlog {
  _id?: Types.ObjectId | string;
  title: string;
  description: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlogDoc extends IBlog, Document {}
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Blog = models?.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;
