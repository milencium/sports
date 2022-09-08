require('dotenv').config()
import express, { json } from "express";
//routes import
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import sportsRoutes from "./routes/sportsRoutes";
//connection
const app = express();
const port = process.env.PORT || 3001;
//MongoDB
const connectDB = require('./db/connect');

app.use(json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sports", sportsRoutes);

const start = async () => {
    try {
        //connection
        await connectDB(process.env.MONGO_URI);
        //servers
        app.listen(port, () => {
            console.log("Server is up and running")
        });
    } catch (error) {
        console.log(error);
    }
}


start();






