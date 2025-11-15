import { model, models, Schema } from "mongoose";

export interface IProject {
  _id?: string;
  name: string;
  description: string;
  image?: string;
  url?: string;
  github?: string;
  techStack?: string[];
  category?: string;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectDoc extends IProject, Document {}
const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    url: { type: String },
    github: { type: String },
    techStack: [{ type: String }],
    category: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = models?.Project || model<IProject>("Project", ProjectSchema);

export default Project;
