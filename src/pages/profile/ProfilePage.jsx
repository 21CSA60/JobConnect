// "use client"

// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
// import { User, Mail, Phone, MapPin, Briefcase, Building, GraduationCap, Code, AlertCircle } from "lucide-react"

// const ProfilePage = () => {
//   const { currentUser, updateProfile } = useAuth()
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     bio: "",
//     // Role-specific fields
//     skills: "",
//     education: "",
//     experience: "",
//     company: "",
//     position: "",
//     specialization: "",
//   })

//   const [isEditing, setIsEditing] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   useEffect(() => {
//     if (currentUser) {
//       // Initialize form with current user data
//       setFormData({
//         name: currentUser.name || "",
//         email: currentUser.email || "",
//         phone: currentUser.phone || "",
//         address: currentUser.address || "",
//         bio: currentUser.bio || "",
//         // Role-specific fields
//         skills: currentUser.skills || "",
//         education: currentUser.education || "",
//         experience: currentUser.experience || "",
//         company: currentUser.company || "",
//         position: currentUser.position || "",
//         specialization: currentUser.specialization || "",
//       })
//     }
//   }, [currentUser])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setSuccess("")

//     // Basic validation
//     if (!formData.name || !formData.email) {
//       setError("Name and email are required")
//       return
//     }

//     try {
//       setIsSubmitting(true)
//       await updateProfile(formData)
//       setSuccess("Profile updated successfully!")
//       setIsEditing(false)
//     } catch (err) {
//       setError("Failed to update profile. Please try again.")
//       console.error(err)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const getDashboardLink = () => {
//     if (!currentUser) return "/"

//     switch (currentUser.role) {
//       case "employer":
//         return "/employer/dashboard"
//       case "candidate":
//         return "/candidate/dashboard"
//       case "recruiter":
//         return "/recruiter/dashboard"
//       default:
//         return "/"
//     }
//   }

//   // Render role-specific fields
//   const renderRoleSpecificFields = () => {
//     if (!currentUser) return null

//     switch (currentUser.role) {
//       case "candidate":
//         return (
//           <>
//             <div>
//               <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
//                 Skills
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Code className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="skills"
//                   name="skills"
//                   value={formData.skills}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. JavaScript, React, Node.js"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="education" className="block text-sm font-medium text-gray-700">
//                 Education
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <GraduationCap className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="education"
//                   name="education"
//                   value={formData.education}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. BS Computer Science, Stanford University"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                 Work Experience
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Briefcase className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="experience"
//                   name="experience"
//                   value={formData.experience}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. 3 years as Frontend Developer"
//                 />
//               </div>
//             </div>
//           </>
//         )
//       case "employer":
//         return (
//           <>
//             <div>
//               <label htmlFor="company" className="block text-sm font-medium text-gray-700">
//                 Company
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Building className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. Tech Solutions Inc."
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="position" className="block text-sm font-medium text-gray-700">
//                 Position
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Briefcase className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="position"
//                   name="position"
//                   value={formData.position}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. HR Manager"
//                 />
//               </div>
//             </div>
//           </>
//         )
//       case "recruiter":
//         return (
//           <>
//             <div>
//               <label htmlFor="company" className="block text-sm font-medium text-gray-700">
//                 Company
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Building className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. Talent Finders LLC"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
//                 Specialization
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Briefcase className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="specialization"
//                   name="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="e.g. Tech and Engineering"
//                 />
//               </div>
//             </div>
//           </>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="mb-8">
//         <Link to={getDashboardLink()} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//           &larr; Back to Dashboard
//         </Link>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="bg-blue-600 text-white p-6">
//           <div className="flex items-center">
//             <User className="h-8 w-8 mr-3" />
//             <h1 className="text-2xl font-bold">Profile Settings</h1>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <AlertCircle className="h-5 w-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <AlertCircle className="h-5 w-5 text-green-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-green-700">{success}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={true} // Email cannot be changed for demo
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="you@example.com"
//                   required
//                 />
//               </div>
//               <p className="mt-1 text-xs text-gray-500">Email address cannot be changed</p>
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Phone className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="+1 (555) 123-4567"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <MapPin className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="123 Main St, City, Country"
//                 />
//               </div>
//             </div>

//             {/* Role-specific fields */}
//             {renderRoleSpecificFields()}

//             <div>
//               <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                 Bio
//               </label>
//               <div className="mt-1">
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   rows={4}
//                   value={formData.bio}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:bg-gray-50 disabled:text-gray-500"
//                   placeholder="Tell us about yourself..."
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end">
//             {isEditing ? (
//               <>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//                 >
//                   {isSubmitting ? "Saving..." : "Save Changes"}
//                 </button>
//               </>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building,
  GraduationCap,
  Code,
  AlertCircle,
  Camera,
  Eye,
  Save,
  X,
  Lock,
  Bell
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    skills: "",
    education: "",
    experience: "",
    company: "",
    position: "",
    specialization: "",
    profileImage: "", // For storing the uploaded image URL
  })

  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        bio: currentUser.bio || "",
        skills: currentUser.skills || "",
        education: currentUser.education || "",
        experience: currentUser.experience || "",
        company: currentUser.company || "",
        position: currentUser.position || "",
        specialization: currentUser.specialization || "",
        profileImage: currentUser.profileImage || "",
      })
    }
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        // Simulate image upload (replace with actual upload logic)
        const imageUrl = URL.createObjectURL(file)
        setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
      } catch (error) {
        setError("Failed to upload image. Please try again.")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!formData.name || !formData.email) {
      setError("Name and email are required")
      return
    }

    try {
      setIsSubmitting(true)
      await updateProfile(formData)
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
    } catch (err) {
      setError("Failed to update profile. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDashboardLink = () => {
    switch (currentUser?.role) {
      case "employer": return "/employer/dashboard"
      case "candidate": return "/candidate/dashboard"
      case "recruiter": return "/recruiter/dashboard"
      default: return "/"
    }
  }

  const handleTabChange = (tab) => {
    if (isEditing) {
      const confirmExit = confirm("You have unsaved changes. Are you sure you want to switch tabs?")
      if (!confirmExit) {
        return
      }
    }
    setActiveTab(tab)
  }

  const renderRoleSpecificFields = () => {
    if (!currentUser) return null
    switch (currentUser.role) {
      case "candidate":
        return (
          <>
            <Field icon={Code} label="Skills" id="skills" value={formData.skills} onChange={handleChange} disabled={!isEditing} placeholder="e.g. JavaScript, React" />
            <Field icon={GraduationCap} label="Education" id="education" value={formData.education} onChange={handleChange} disabled={!isEditing} placeholder="e.g. BSc Computer Science" />
            <Field icon={Briefcase} label="Experience" id="experience" value={formData.experience} onChange={handleChange} disabled={!isEditing} placeholder="e.g. 2 years frontend" />
          </>
        )
      case "employer":
        return (
          <>
            <Field icon={Building} label="Company" id="company" value={formData.company} onChange={handleChange} disabled={!isEditing} placeholder="e.g. Acme Corp" />
            <Field icon={Briefcase} label="Position" id="position" value={formData.position} onChange={handleChange} disabled={!isEditing} placeholder="e.g. HR Manager" />
          </>
        )
      case "recruiter":
        return (
          <>
            <Field icon={Building} label="Company" id="company" value={formData.company} onChange={handleChange} disabled={!isEditing} placeholder="e.g. Talent Finders" />
            <Field icon={Briefcase} label="Specialization" id="specialization" value={formData.specialization} onChange={handleChange} disabled={!isEditing} placeholder="e.g. Tech hiring" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to={getDashboardLink()} className="text-blue-600 hover:text-blue-800 font-medium flex items-center mb-6">
        ← Back to Dashboard
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center">
          <User className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex">
            {["profile", "security", "notifications"].map(tab => (
              <button key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition ${activeTab === tab ? "border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {error && (
          <AlertBox type="error" message={error} />
        )}
        {success && (
          <AlertBox type="success" message={success} />
        )}

        {activeTab === "profile" && (
          <div className="p-6 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    currentUser?.name.charAt(0)
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white text-blue-600 shadow-md">
                    <label htmlFor="profileImage">
                      <Camera className="h-5 w-5" />
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-lg font-medium">{currentUser?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{currentUser?.role}</p>
              {!isEditing && (
                <button
                  onClick={() => confirm("Do you want to edit your profile?") && setIsEditing(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 text-sm border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4 mr-2" /> View
                </button>
              )}
            </div>

            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Field icon={User} label="Full Name" id="name" value={formData.name} onChange={handleChange} disabled={!isEditing} placeholder="John Doe" required />
                <Field icon={Mail} label="Email" id="email" value={formData.email} onChange={handleChange} disabled placeholder="you@example.com" />
                <Field icon={Phone} label="Phone" id="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} placeholder="+1 555 123 4567" />
                <Field icon={MapPin} label="Address" id="address" value={formData.address} onChange={handleChange} disabled={!isEditing} placeholder="123 Main St" />

                {renderRoleSpecificFields()}

                <div>
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea id="bio" name="bio" rows="4" value={formData.bio} onChange={handleChange} disabled={!isEditing} className="form-input w-full" placeholder="Tell us about yourself..." />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="inline-flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" /> {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
            <input className="form-input w-full" type="password" placeholder="Current Password" />
            <input className="form-input w-full" type="password" placeholder="New Password" />
            <input className="form-input w-full" type="password" placeholder="Confirm New Password" />
            <div className="flex justify-end">
              <button className="inline-flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <Lock className="h-4 w-4 mr-2" /> Update Password
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
            {["email-notifications", "job-alerts", "application-updates"].map((id) => (
              <label key={id} className="flex items-center gap-3 text-sm text-gray-700">
                <input type="checkbox" className="accent-blue-600" defaultChecked /> {id.replace(/-/g, " ")}
              </label>
            ))}
            <div className="flex justify-end">
              <button className="inline-flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <Bell className="h-4 w-4 mr-2" /> Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Reusable form field
const Field = ({ icon: Icon, label, id, value, onChange, disabled, placeholder, required = false }) => (
  <div>
    <label htmlFor={id} className="form-label">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className="form-input pl-10 w-full"
      />
    </div>
  </div>
)

// Reusable alert
const AlertBox = ({ type, message }) => {
  const isError = type === "error"
  return (
    <div className={`p-4 m-6 border-l-4 ${isError ? "bg-red-50 border-red-400 text-red-700" : "bg-green-50 border-green-400 text-green-700"}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className={`h-5 w-5 ${isError ? "text-red-400" : "text-green-400"}`} />
        </div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
