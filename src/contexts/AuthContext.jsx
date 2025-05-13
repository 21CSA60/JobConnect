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
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          setCurrentUser(null)
        } else {
          const userData = JSON.parse(localStorage.getItem("userData") || "{}")
          // Convert any 'recruiter' role to 'employer'
          if (userData.role === 'recruiter') {
            userData.role = 'employer'
            userData.isRecruiter = true
          }
          setCurrentUser(userData)
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        setCurrentUser(null)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      let userData

      if (email === "employer@example.com") {
        userData = {
          id: 1,
          name: "Employer User",
          email,
          role: "employer",
          phone: "+1 (555) 123-4567",
          address: "123 Business Ave, New York, NY",
          company: "Tech Solutions Inc.",
          position: "HR Manager",
          bio: "Experienced HR professional with a focus on tech recruitment.",
          profileImage: null,
          isRecruiter: false
        }
      } else if (email === "candidate@example.com") {
        userData = {
          id: 2,
          name: "Candidate User",
          email,
          role: "candidate",
          phone: "+1 (555) 987-6543",
          address: "456 Job Seeker St, San Francisco, CA",
          skills: "JavaScript, React, Node.js",
          education: "BS Computer Science, Stanford University",
          experience: "3 years as Frontend Developer",
          bio: "Passionate developer looking for new opportunities in tech.",
          profileImage: null
        }
      } else if (email === "recruiter@example.com") {
        // Convert recruiter login to employer with recruiter privileges
        userData = {
          id: 3,
          name: "Recruiter User",
          email,
          role: "employer",
          phone: "+1 (555) 456-7890",
          address: "789 Recruiter Blvd, Chicago, IL",
          company: "Talent Finders LLC",
          position: "Senior Recruiter",
          specialization: "Tech and Engineering",
          bio: "Helping companies find the best talent for over 5 years.",
          profileImage: null,
          isRecruiter: true
        }
      } else {
        userData = {
          id: 4,
          name: "Demo User",
          email,
          role: "candidate",
          phone: "",
          address: "",
          skills: "",
          education: "",
          experience: "",
          bio: "",
          profileImage: null
        }
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(userData))
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
      const { fullName, email, password, gender, address, userType } = userData

      // Convert recruiter signups to employer with recruiter privileges
      const role = userType.toLowerCase() === "recruiter" ? "employer" : userType.toLowerCase()
      const isRecruiter = userType.toLowerCase() === "recruiter"

      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: fullName,
        email,
        role,
        gender,
        address,
        phone: "",
        bio: "",
        profileImage: userData.profileImage || null,
        isRecruiter,
        ...(role === "candidate" && {
          skills: "",
          education: "",
          experience: "",
        }),
        ...(role === "employer" && {
          company: "",
          position: "",
          specialization: isRecruiter ? "" : undefined,
        })
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(newUser))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message || "Failed to sign up")
      throw err
    }
  }

  const updateProfile = async (updatedData) => {
    try {
      setError(null)
      const updatedUser = {
        ...currentUser,
        ...updatedData,
      }
      localStorage.setItem("userData", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message || "Failed to update profile")
      throw err
    }
  }

  const updateProfileImage = async (imageFile) => {
    try {
      setError(null)
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageUrl = reader.result
          const updatedUser = {
            ...currentUser,
            profileImage: imageUrl,
          }
          localStorage.setItem("userData", JSON.stringify(updatedUser))
          setCurrentUser(updatedUser)
          resolve(updatedUser)
        }
        reader.onerror = reject
        reader.readAsDataURL(imageFile)
      })
    } catch (err) {
      setError(err.message || "Failed to update profile image")
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
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
    updateProfile,
    updateProfileImage,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}