import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, registerUser } from "../api/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])
  

  const login = async (data) => {
    const res = await loginUser(data)
    if (res.user) {
      setUser(res.user)
      localStorage.setItem("user", JSON.stringify(res.user))
      localStorage.setItem("token", res.token)
    }
    return res
  }

  const register = async (data) => {
    const res = await registerUser(data)
    if (res.user) {
      setUser(res.user)
      localStorage.setItem("user", JSON.stringify(res.user))
      localStorage.setItem("token", res.token)
    }
    return res
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  if (loading) return null

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)