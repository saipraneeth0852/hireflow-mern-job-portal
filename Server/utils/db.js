import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGODB_URI;
        const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST } = process.env;
        if (!mongoUri && MONGODB_USER && MONGODB_PASSWORD && MONGODB_HOST) {
            mongoUri = `mongodb+srv://${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_HOST}/hireflow?retryWrites=true&w=majority`;
        }

        if (!mongoUri) {
            if (process.env.NODE_ENV === 'production') throw new Error('MONGODB_URI is required in production (no in-memory fallback)');
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
