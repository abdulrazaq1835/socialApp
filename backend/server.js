import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cors from 'cors'

dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://social-app-s863.vercel.app"
    ],
    credentials: true,
  })
)
app.get("/", (req, res) => {
  res.send("API is running.");

});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});