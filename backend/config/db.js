    import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log(`mongo connected successfully: ${conn.connection.host}`)
  } catch (error) {
    console.error("Mongo failed:", error.message)
  
  }
};

export default connectDB