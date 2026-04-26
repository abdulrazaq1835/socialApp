import express from "express"
import {
  createPost,
  getAllPosts,
  getSinglePost,
  likePost,
  deletePost,
} from "../controllers/postControllers.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import upload from "../middlewares/uploadMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, upload.single("image"),  createPost)
router.get("/", getAllPosts)

router.get("/:id", getSinglePost)
router.put("/:id/like", authMiddleware, likePost)
router.delete("/:id", authMiddleware, deletePost)

export default router