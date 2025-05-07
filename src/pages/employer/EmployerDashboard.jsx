"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useJob } from "../../contexts/JobContext"
import { Briefcase, Plus, Users, Clock, Calendar } from "lucide-react"

const EmployerDashboard = () => {
  const { currentUser } = useAuth()
  const { getJobsByEmployer, getApplicationsByJob, loading } = useJob()
  const [postedJobs, setPostedJobs] = useState([])

  useEffect(() => {
    if (currentUser) {
      const jobs = getJobsByEmployer(currentUser.id)

      // Enrich jobs with application counts
      const enrichedJobs = jobs.map((job) => {
        const applications = getApplicationsByJob(job.id)
        return {
          ...job,
          applicantCount: applications.length,
        }
      })

      setPostedJobs(enrichedJobs)
    }
  }, [currentUser, getJobsByEmployer, getApplicationsByJob])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
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
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Employer Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back, {currentUser?.name}! Manage your job postings and candidates.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/employer/create-job"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Job Postings</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{postedJobs.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Applicants</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {postedJobs.reduce((total, job) => total + job.applicantCount, 0)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Time to Hire</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">14 days</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posted Jobs */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Posted Jobs</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your job postings and view applicants</p>
        </div>

        {postedJobs.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {postedJobs.map((job) => (
              <li key={job.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">
                          {job.type} • {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                        Active
                      </span>
                      <Link to={`/jobs/${job.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View
                      </Link>
                    </div>
                  </div>

                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {job.applicantCount} applicants
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Posted on {formatDate(job.createdAt)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Link
                        to={`/employer/shortlisted`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        View Candidates
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first job posting</p>
            <Link
              to="/employer/create-job"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployerDashboard
