import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let reservationSchema = new mongoose.Schema(
    {
        reservationTime: Number,
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: [true, 'Please provide user '],
        }
    },
    { timestamps: true }
)

const Reservation = mongoose.model("reservation", reservationSchema);

export default Reservation;