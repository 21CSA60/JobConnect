import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { JobProvider } from "./contexts/JobContext"
import ProtectedRoute from "./components/common/ProtectedRoute"

// Public Pages
import Home from "./pages/Home"
import AllJobs from "./pages/AllJobs"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import JobDetails from "./pages/JobDetails"

// Role-Based Protected Pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard"
import EmployerDashboard from "./pages/employer/EmployerDashboard"
import CreateJobPost from "./pages/employer/CreateJobPost"
import JobApply from "./pages/candidate/JobApply"
import ShortlistedCandidates from "./pages/employer/ShortlistedCandidates"

// User Profile
import ProfilePage from "./pages/profile/ProfilePage"

// Layout
import Layout from "./components/layout/Layout"

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<AllJobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Profile Route - Accessible to all authenticated users */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={["candidate", "employer"]}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Candidate Routes */}
              <Route
                path="/candidate/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:id/apply"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <JobApply />
                  </ProtectedRoute>
                }
              />

              {/* Employer Routes */}
              <Route
                path="/employer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/create-job"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <CreateJobPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/shortlisted"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ShortlistedCandidates />
                  </ProtectedRoute>
                }
              />

              {/* Redirect old recruiter routes to employer dashboard */}
              <Route
                path="/recruiter/*"
                element={<Navigate to="/employer/dashboard" replace />}
              />

              {/* Messages Route - Placeholder for future implementation */}
              <Route
                path="/messages"
                element={
                  <ProtectedRoute allowedRoles={["candidate", "employer"]}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                      <h1 className="text-2xl font-bold mb-4">Messages</h1>
                      <p className="text-gray-600">This feature is coming soon!</p>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </JobProvider>
      </AuthProvider>
    </Router>
  )
}