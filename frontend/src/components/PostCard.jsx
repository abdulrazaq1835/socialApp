import { useState } from "react"
import { likePost } from "../api/api"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import { useAuth } from "../context/AuthContext"
import CommentSection from "./CommentSection"

const PostCard = ({ post }) => {
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(post.likes?.includes(user?.id))
  const [likesCount, setLikesCount] = useState(post.likesCount || 0)

  const handleLike = async () => {
    const res = await likePost(post._id)
    setLiked(res.liked)
    setLikesCount(res.likes)
  }

  return (
    <Card elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {post.author?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography fontWeight="bold">{post.author?.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {post.title && (
          <Typography variant="h6" fontWeight="bold" mb={1}>
            {post.title}
          </Typography>
        )}

        {post.content && (
          <Typography variant="body1" mb={1}>
            {post.content}
          </Typography>
        )}
      </CardContent>

      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt="post image"
          sx={{ maxHeight: 400, objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Divider sx={{ mb: 1 }} />
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography>{likesCount}</Typography>

          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography>{post.commentsCount}</Typography>
        </Box>

        {showComments && <CommentSection postId={post._id} />}
      </CardContent>
    </Card>
  )
}

export default PostCard