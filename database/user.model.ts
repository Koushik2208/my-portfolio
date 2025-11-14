import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDoc extends IUser, Document {}
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
