import mongoose, { Schema } from "mongoose";

const emailRegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const UserSchema = new Schema({
    email: { type: String, required: [true, "Email is required"], unique: true, match: emailRegExp },
    password: { type: String, required: [true, "Password is required"], minlength: 8 },
    role: { type: String || undefined, enum: ["admin", "faculty"], default: null },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number || undefined },
});

const UserModel = mongoose.models?.User || mongoose.model("User", UserSchema);

export default UserModel;