import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Admin123@flipkart-backend.rqfjf4v.mongodb.net/flipkart?retryWrites=true&w=majority",
      () => {
        console.log("connected to database");
      }
    );
  } catch (error) {
    console.log("Error in connecting to database", error.message);
  }
};
