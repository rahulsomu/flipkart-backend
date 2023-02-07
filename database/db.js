import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("connected to database");
    });
  } catch (error) {
    console.log("Error in connecting to database", error.message);
  }
};
