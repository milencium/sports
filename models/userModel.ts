import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let userSchema = new mongoose.Schema(
    {
        username: String,
        age: Number,
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        password: String,
        access: Boolean,
    },
    { timestamps: true }
)

userSchema.methods.generateAuthToken = (user: any) => {
    const token = JWT.sign({ _id: user._id, role: 'user' }, "secretkey", {
        expiresIn: "7d",
    })
    return token
}

const Users = mongoose.model("user", userSchema);


export default Users;

