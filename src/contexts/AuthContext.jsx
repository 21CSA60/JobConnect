"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          setCurrentUser(null)
        } else {
          setCurrentUser(decoded)
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
      } catch (error) {
        localStorage.removeItem("token")
        setCurrentUser(null)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with different roles
      let userData

      if (email === "employer@example.com") {
        userData = { id: 1, name: "Employer User", email, role: "employer" }
      } else if (email === "candidate@example.com") {
        userData = { id: 2, name: "Candidate User", email, role: "candidate" }
      } else if (email === "recruiter@example.com") {
        userData = { id: 3, name: "Recruiter User", email, role: "recruiter" }
      } else {
        // Default to candidate for demo
        userData = { id: 4, name: "Demo User", email, role: "candidate" }
      }

      // Create a JWT token (in a real app, this would come from the server)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(userData)
      return userData
    } catch (err) {
      setError(err.message || "Failed to login")
      throw err
    }
  }

  const signup = async (userData) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful signup
      const { fullName, email, password, gender, address, userType } = userData

      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: fullName,
        email,
        role: userType.toLowerCase(),
        gender,
        address,
      }

      // Create a JWT token (in a real app, this would come from the server)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message || "Failed to sign up")
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
