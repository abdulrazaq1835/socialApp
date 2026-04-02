import { useState, useEffect } from "react"
import { getComments, addComment } from "../api/api"
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material"

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    const data = await getComments(postId)
    if (Array.isArray(data)) {
      setComments(data)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleAddComment = async () => {
    if (!text.trim()) return
    setLoading(true)
    await addComment(postId, text)
    setText("")
    setLoading(false)
    fetchComments()
  }

  return (
    <Box mt={2}>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          disabled={loading || !text.trim()}
          sx={{ borderRadius: 2 }}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : "Post"}
        </Button>
      </Box>

      {comments.map((comment) => (
        <Box key={comment._id} display="flex" gap={1} mb={1.5}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 14 }}>
            {comment.userId?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {comment.userId?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment.text}
            </Typography>
          </Box>
        </Box>
      ))}

      {comments.length === 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          No comments yet
        </Typography>
      )}
    </Box>
  )
}

export default CommentSection