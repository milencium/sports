import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let sportsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        }
    },
)


const Sports = mongoose.model("sports", sportsSchema);

export default Sports;