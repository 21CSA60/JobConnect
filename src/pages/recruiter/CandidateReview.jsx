"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { User, Briefcase, CheckCircle, XCircle, ExternalLink, AlertCircle } from "lucide-react"

const CandidateReview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, jobs, updateApplicationStatus, loading } = useJob()

  const [application, setApplication] = useState(null)
  const [job, setJob] = useState(null)
  const [feedback, setFeedback] = useState({
    willingToRelocate: "",
    sufficientExperience: "",
    notes: "",
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (applications.length > 0 && id) {
      const app = applications.find((a) => a.id === Number.parseInt(id))
      if (app) {
        setApplication(app)

        const jobData = jobs.find((j) => j.id === app.jobId)
        if (jobData) {
          setJob(jobData)
        }
      }
    }
  }, [id, applications, jobs])

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e, status) => {
    e.preventDefault()
    setError("")

    // Validate feedback
    if (!feedback.willingToRelocate || !feedback.sufficientExperience) {
      setError("Please answer all feedback questions")
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, we would save the feedback to a database
      // For this demo, we'll just update the application status
      await updateApplicationStatus(Number.parseInt(id), status)

      navigate("/recruiter/dashboard", {
        state: {
          success: true,
          message: `Candidate ${status === "Shortlisted" ? "shortlisted" : "rejected"} successfully!`,
        },
      })
    } catch (err) {
      setError("Failed to update candidate status. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !application || !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">Loading candidate details...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/recruiter/dashboard" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Candidate Review</h1>
          <p className="text-blue-100">Review and provide feedback on this candidate</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                Candidate Details
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-medium">
                    {application.candidateName.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{application.candidateName}</h3>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Resume
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                Job Details
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{job.employerName}</p>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Type:</span> {job.type}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> {job.location}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Salary:</span> {job.salary}
                </div>
              </div>
            </div>
          </div>

          {job.questions && job.questions.length > 0 && application.answers && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Candidate Responses</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="space-y-4">
                  {job.questions.map((question, index) => (
                    <div key={index}>
                      <dt className="text-sm font-medium text-gray-500">{question}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{application.answers[index] || "No response"}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          <form>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Feedback Form</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Is the candidate willing to relocate?</label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="willingToRelocate"
                      value="Yes"
                      checked={feedback.willingToRelocate === "Yes"}
                      onChange={handleFeedbackChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="willingToRelocate"
                      value="No"
                      checked={feedback.willingToRelocate === "No"}
                      onChange={handleFeedbackChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Does the candidate have sufficient experience?
                </label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sufficientExperience"
                      value="Yes"
                      checked={feedback.sufficientExperience === "Yes"}
                      onChange={handleFeedbackChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sufficientExperience"
                      value="No"
                      checked={feedback.sufficientExperience === "No"}
                      onChange={handleFeedbackChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={feedback.notes}
                    onChange={handleFeedbackChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add any additional comments about this candidate..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "Rejected")}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "Shortlisted")}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Shortlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CandidateReview
