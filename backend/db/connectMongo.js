import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,)
        console.log("connected to db");
    } catch (error) {
        console.log("cannot connect to db",error.message);
    }
};

export default connectMongo;