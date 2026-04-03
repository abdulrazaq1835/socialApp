import { useState, useEffect } from "react"
import { getAllPosts } from "../api/api"
import { useAuth } from "../context/AuthContext"
import { Box, Container, Typography, Fade, Grid } from "@mui/material"
import Navbar from "../components/Navbar.jsx"
import PostCard from "../components/PostCard.jsx"

const Feed = () => {
  const [posts, setPosts] = useState([])
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    const data = await getAllPosts()
    if (Array.isArray(data)) {
      setPosts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Box sx={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
    
      <Box sx={{
        position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px',
        bgcolor: 'rgba(255, 107, 107, 0.1)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute', top: '40%', right: '-5%', width: '350px', height: '350px',
        bgcolor: 'rgba(78, 205, 196, 0.1)', borderRadius: '50%', filter: 'blur(70px)', zIndex: 0
      }} />

      <Navbar />
      
      <Container maxWidth="md" sx={{ pt: { xs: 10, sm: 12 }, pb: 8, position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box mb={4} textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="h4" fontWeight="800" sx={{
              background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              Welcome Back, {user?.name || 'Friend'}...
            </Typography>
            <Typography variant="body1" color="text.secondary">
              See what's happening in your network today.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
             <Box mt={4} display="flex" flexDirection="column" gap={3}>
                {posts.map((post, index) => (
                  <Fade in timeout={1000 + (index * 200)} key={post._id}>
                    <Box>
                      <PostCard post={post} onUpdate={fetchPosts} />
                    </Box>
                  </Fade>
                ))}
                
                {!loading && posts.length === 0 && (
                  <Box textAlign="center" py={8} bgcolor="rgba(255,255,255,0.5)" borderRadius="24px" border="1px dashed rgba(0,0,0,0.1)">
                    <Typography variant="h6" color="text.secondary">No posts yet. Be the first to share something!</Typography>
                  </Box>
                )}
             </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Feed