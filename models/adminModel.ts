import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: String,
        password: String,
        admin: Boolean,
    },
    { timestamps: true }
)

adminSchema.methods.generateAuthToken = (admin: any) => {
    const token = JWT.sign(
        { _id: admin._id, role: "admin" },
        "secretkey",
        {
            expiresIn: "1d",
        }
    )
    return token;
}

const Admin = mongoose.model("admin", adminSchema);

export default Admin;