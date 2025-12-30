import mongoose from 'mongoose';

export const connectDb = async()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected sccessfully");
    }
    catch(error) {
        console.log("Db connection failed ",error);
        process.exit(1);
    }
}