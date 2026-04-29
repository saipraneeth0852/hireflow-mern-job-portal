import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            memoryServer = await MongoMemoryServer.create({
                instance: { dbName: "hireflow" },
            });
            mongoUri = memoryServer.getUri();
            console.log("Using in-memory MongoDB for local development");
        }

        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected...')
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}


export default connectDB
