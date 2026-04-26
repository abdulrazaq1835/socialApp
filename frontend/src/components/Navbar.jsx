import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from "@mui/icons-material/Logout"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <AppBar position="fixed" elevation={0} sx={{ 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      color: "black" 
    }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
        <Typography 
          variant="h5" 
          fontWeight="900" 
          onClick={() => navigate("/")}
          sx={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            letterSpacing: '-0.5px'
          }}
        >
         Vibe Connect
        </Typography>
        
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
          {user && (
            <Box display="flex" alignItems="center" gap={1} sx={{
              px: 2, py: 0.5, bgcolor: 'rgba(78, 205, 196, 0.1)', borderRadius: '20px', border: '1px solid rgba(78, 205, 196, 0.2)'
            }}>
               <Avatar sx={{ width: 24, height: 24, bgcolor: '#4ECDC4', fontSize: '0.9rem' }}>
                 {user.name?.charAt(0).toUpperCase()}
               </Avatar>
               <Typography variant="body2" fontWeight="600" color="#2d3436">
                 {user.name}
               </Typography>
            </Box>
          )}

          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => navigate("/create-post")}
            sx={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: '700',
              px: { xs: 2, sm: 3 },
              boxShadow: '0 4px 15px 0 rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px 0 rgba(255, 107, 107, 0.4)',
              }
            }}
          >
            <Box component="span" display={{ xs: 'none', sm: 'block' }}>Post</Box>
          </Button>

          <Button 
            variant="outlined" 
            onClick={handleLogout}
            sx={{
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: '600',
              minWidth: 'auto',
              px: { xs: 1.5, sm: 2 },
              borderColor: 'rgba(255, 107, 107, 0.5)',
              color: '#FF6B6B',
              '&:hover': { 
                borderColor: '#FF6B6B', 
                backgroundColor: 'rgba(255, 107, 107, 0.08)' 
              }
            }}
          >
            <LogoutIcon fontSize="small" sx={{ mr: { xs: 0, sm: 1 } }} />
            <Box component="span" display={{ xs: 'none', sm: 'block' }}>Logout</Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar