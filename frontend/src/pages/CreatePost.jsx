import { useState } from "react"
import { createPost } from "../api/api.js"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Container,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ImageIcon from "@mui/icons-material/Image"
import Navbar from "../components/Navbar"

const CreatePostPage = () => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!content && !image) {
      toast.error("Please add content or an image")
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      if (title) formData.append("title", title)
      if (content) formData.append("content", content)
      if (image) formData.append("image", image)
      await createPost(formData)
      toast.success("Post created successfully!")
      navigate("/feed")
    } catch (error) {
      toast.error("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bgcolor="#f0f2f5" minHeight="100vh">
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: 10, pb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <IconButton onClick={() => navigate("/feed")}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Create Post
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={5}
            margin="normal"
          />

          {preview && (
            <Box mt={2}>
              <img
                src={preview}
                alt="preview"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <IconButton component="label" color="primary">
              <ImageIcon />
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </IconButton>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || (!content && !image)}
              sx={{ borderRadius: 2, px: 4 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : "Post"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default CreatePostPage