import Post from "../models/post.js"
import Comment from "../models/comment.js"

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body
    const image = req.file ? req.file.path : null

    if (!content && !image) {
      return res.status(400).json({ message: "Content or image required" })
    }

    const post = await Post.create({
      title,
      content,
      image,
      author: req.user.id,
    })

    await post.populate("author", "name role")
    res.status(201).json({ message: "Post created successfully", post })
  } catch (error) {
    console.error("Create post error:", error)
    res.status(500).json({ message: "Internal server error post" })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name role")
      .sort({ createdAt: -1 })

    const postsWithCount = await Promise.all(
      posts.map(async (post) => {
        const commentsCount = await Comment.countDocuments({ postId: post._id })
        return {
          ...post.toObject(),
          likesCount: post.likes.length,
          commentsCount,
        }
      })
    )

    res.json(postsWithCount)
  } catch (error) {
    console.error("Get posts error:", error)
    res.status(500).json({ message: "Failed to fetch posts" })
  }
}

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name role"
    )
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.json(post)
  } catch (error) {
    console.error("Get single post error:", error)
    res.status(500).json({ message: "Failed to fetch post" })
  }
}

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: "Post not found" })

    const userId = req.user.id
    const alreadyLiked = post.likes.includes(userId)

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId)
    } else {
      post.likes.push(userId)
    }

    await post.save()
    res.json({ likes: post.likes.length, liked: !alreadyLiked })
  } catch (error) {
    console.error("Like post error:", error)
    res.status(500).json({ message: "Failed to like post" })
  }
}