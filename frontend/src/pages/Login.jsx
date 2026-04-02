import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await login(form)
    setLoading(false)
    if (res.user) {
      navigate("/feed")
    } else {
      setError(res.message || "Login failed")
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f0f3"
      
    >
      <Paper elevation={3} sx={{ px: 4,py:8, width: 400, borderRadius: 3 }}>
        <Typography color="#333" variant="h4" fontWeight="medium" textAlign="left" sx={{ fontFamily: "Poppins, sans-serif" }} mb={3}>
          LogIn
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
        <Typography textAlign="center" mt={2}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#d219aa" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login