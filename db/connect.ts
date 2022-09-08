import mongoose from "mongoose";

const connectDB = (url: any) => {
    return mongoose.connect(url);
}

module.exports = connectDB;