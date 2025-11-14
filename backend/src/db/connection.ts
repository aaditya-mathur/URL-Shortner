import mongoose from "mongoose";

export const dbConnection = async (connectionUrl: string): Promise<void> => {
  try {
    await mongoose.connect(connectionUrl);
    console.log(`DB connection Successfull`);
  } catch (error) {
    console.error(`DB connection failed : ${error}`);
    process.exit(1);
  }
};
