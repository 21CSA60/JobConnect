"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useJob } from "../../contexts/JobContext"
import { Briefcase, Clock, CheckCircle, XCircle, Search } from "lucide-react"

const CandidateDashboard = () => {
  const { currentUser } = useAuth()
  const { getApplicationsByCandidate, jobs, loading } = useJob()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    if (currentUser) {
      const userApplications = getApplicationsByCandidate(currentUser.id)

      // Enrich applications with job details
      const enrichedApplications = userApplications.map((app) => {
        const job = jobs.find((j) => j.id === app.jobId)
        return {
          ...app,
          jobTitle: job?.title || "Unknown Job",
          jobType: job?.type || "N/A",
          jobLocation: job?.location || "N/A",
          employerName: job?.employerName || "Unknown Employer",
        }
      })

      setApplications(enrichedApplications)
    }
  }, [currentUser, getApplicationsByCandidate, jobs])

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </span>
        )
      case "Shortlisted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Shortlisted
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Candidate Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back, {currentUser?.name}! Manage your job applications and profile.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/jobs"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Search className="h-4 w-4 mr-2" />
            Find Jobs
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">My Applications</h2>
          <p className="mt-1 text-sm text-gray-500">Track the status of your job applications</p>
        </div>

        {applications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {applications.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{application.jobTitle}</h3>
                        <p className="text-sm text-gray-500">{application.employerName}</p>
                      </div>
                    </div>
                    <div>{getStatusBadge(application.status)}</div>
                  </div>

                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{application.jobType}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        {application.jobLocation}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Applied on{" "}
                        <time dateTime={application.appliedAt}>
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </time>
                      </p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Link
                      to={`/jobs/${application.jobId}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View Job Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500 mb-6">You haven't applied to any jobs yet. Start your job search today!</p>
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateDashboard
