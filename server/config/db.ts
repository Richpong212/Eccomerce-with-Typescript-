import chalk from "chalk";
import mongoose from "mongoose";
import dev from ".";

const connectDB = async () => {
    try {
        await mongoose.connect(dev.db.url);
        console.log("MongoDB connected successfully"); 
    } catch (error) {
       console.log('DB is not connected'); 
       console.log(error);
       process.exit(1);
    }
}

export default connectDB;