const mongoUri = process?.env?.MONGO_URI;
import mongoose from "mongoose";

export const dbConnect = async () => {
  if (!mongoUri) {
    return Promise.reject(`Please provide DB connection creds!`);
  }

  try {
    const { connection } = await mongoose.connect(`${mongoUri}`);
    if (connection?.readyState === 1) {
      console.log(`DB connected succesfully!`);
    }
  } catch (error: any) {
    return Promise.reject(error?.message || `DB connection error!`);
  }
};
