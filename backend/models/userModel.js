import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the username!"],
            min: 3,
            max: 50,
            unique: [true, "That username is already taken!"],
        },
        email: {
            type: String,
            required: [true, "Please add the ser email adress!"],
            min:6,
            max: 50,
            unique: [true, "That email adress is already taken!"],
        },
        password: {
            type: String,
            required: [true, "Please add the password!"],
            min: 5,
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export {UserModel};