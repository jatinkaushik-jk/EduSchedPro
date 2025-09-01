"use server"
import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connections && mongoose.connections[0].readyState) {
    console.log("Already connected to database");
    return;
  }
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URI as string, {
      dbName: "EduSchedPro",
    });
    console.log("Database successfully connected");
  } catch (error) {
    console.error("Database connection failed!", error);
  }
}

export default dbConnect;