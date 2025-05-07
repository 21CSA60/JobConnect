"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { Briefcase, AlertCircle, Plus, Trash } from "lucide-react"

const CreateJobPost = () => {
  const navigate = useNavigate()
  const { createJob } = useJob()

  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    location: "",
    salary: "",
    description: "",
    questions: [""],
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions]
    newQuestions[index] = value
    setFormData((prev) => ({
      ...prev,
      questions: newQuestions,
    }))
  }

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, ""],
    }))
  }

  const removeQuestion = (index) => {
    const newQuestions = [...formData.questions]
    newQuestions.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      questions: newQuestions,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.title || !formData.type || !formData.location || !formData.salary || !formData.description) {
      setError("Please fill in all required fields")
      return
    }

    // Filter out empty questions
    const filteredQuestions = formData.questions.filter((q) => q.trim() !== "")

    try {
      setIsSubmitting(true)

      const jobData = {
        ...formData,
        questions: filteredQuestions,
      }

      await createJob(jobData)

      navigate("/employer/dashboard", {
        state: { success: true, message: "Job posted successfully!" },
      })
    } catch (err) {
      setError("Failed to create job posting. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/employer/dashboard" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">Create New Job Posting</h1>
          </div>
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. New York, NY or Remote"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary Range <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. $80,000 - $100,000"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Describe the job responsibilities, requirements, benefits, etc."
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Custom Candidate Questions</label>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Question
                </button>
              </div>
              <div className="mt-2 space-y-3">
                {formData.questions.map((question, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g. Are you willing to relocate?"
                    />
                    {formData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Add questions that candidates will need to answer when applying
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/employer/dashboard"
              className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Job Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateJobPost
