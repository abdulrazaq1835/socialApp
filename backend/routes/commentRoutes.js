import express from "express"
import {
  addComment,
  getCommentsByPost,
} from "../controllers/commentControllers.js  ";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/:postId", authMiddleware, addComment)
router.get("/:postId", getCommentsByPost)

export default router