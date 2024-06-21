import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }




const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

UserSchema.pre('save', async function (next) {
    const user = this as any;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        user.password = await hashPassword(user.password);
        next();
    } catch (err: any) {
        next(err);
    }
});


export const UserModel = mongoose.model("User", UserSchema);