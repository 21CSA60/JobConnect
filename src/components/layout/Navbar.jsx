// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
// import { GraduationCap, Menu, X, User, LogOut } from "lucide-react"

// const Navbar = () => {
//   const { currentUser, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   const getDashboardLink = () => {
//     if (!currentUser) return "/login"

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

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
           
//             <GraduationCap className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
//               Home
//             </Link>
//             <Link to="/jobs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
//               Jobs
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   to={getDashboardLink()}
//                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
//                 >
//                   Dashboard
//                 </Link>
//                 <div className="relative group">
//                   <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
//                     <User className="h-5 w-5 mr-1" />
//                     {currentUser.name}
//                   </button>
//                   <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                     <div className="px-4 py-3">
//                       <p className="text-sm">Signed in as</p>
//                       <p className="text-sm font-medium truncate">{currentUser.email}</p>
//                       <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
//                     </div>
//                     <div className="py-1">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Sign out
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMenuOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link
//               to="/"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/jobs"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Jobs
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   to={getDashboardLink()}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <div className="border-t border-gray-200 pt-4 pb-3">
//                   <div className="px-4 flex items-center">
//                     <div className="flex-shrink-0">
//                       <User className="h-10 w-10 rounded-full bg-gray-100 p-2" />
//                     </div>
//                     <div className="ml-3">
//                       <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
//                       <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
//                       <div className="text-xs text-gray-500 capitalize">{currentUser.role}</div>
//                     </div>
//                   </div>
//                   <div className="mt-3 px-2 space-y-1">
//                     <button
//                       onClick={() => {
//                         handleLogout()
//                         setIsMenuOpen(false)
//                       }}
//                       className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar


// "use client"

// import { useState } from "react"
// import { Link, useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
// import { GraduationCap, Menu, X, LogOut, Settings, Bell, User } from "lucide-react"

// const Navbar = () => {
//   const { currentUser, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   const getDashboardLink = () => {
//     if (!currentUser) return "/login"
//     switch (currentUser.role) {
//       case "employer": return "/employer/dashboard"
//       case "candidate": return "/candidate/dashboard"
//       case "recruiter": return "/recruiter/dashboard"
//       default: return "/"
//     }
//   }

//   const isActive = (path) => location.pathname === path

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <GraduationCap className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
//             </Link>
//             <div className="hidden md:flex md:ml-10 md:space-x-6">
//               <Link to="/" className={isActive("/") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}>
//                 Home
//               </Link>
//               <Link to="/jobs" className={isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}>
//                 Jobs
//               </Link>
//               {isAuthenticated && (
//                 <Link to={getDashboardLink()} className={isActive(getDashboardLink()) ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}>
//                   Dashboard
//                 </Link>
//               )}
//             </div>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 {/* Notifications */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
//                     className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 relative"
//                   >
//                     <Bell className="h-5 w-5" />
//                     <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
//                   </button>
//                   {isNotificationsOpen && (
//                     <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-md shadow-md z-50">
//                       <div className="p-4 border-b">
//                         <h3 className="text-sm font-semibold">Notifications</h3>
//                       </div>
//                       <div className="max-h-60 overflow-y-auto divide-y">
//                         <div className="p-4 hover:bg-gray-50">
//                           <p className="text-sm font-medium">Your application was viewed</p>
//                           <p className="text-xs text-gray-500">Frontend Developer at Tech Solutions</p>
//                           <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
//                         </div>
//                         <div className="p-4 hover:bg-gray-50">
//                           <p className="text-sm font-medium">New job matches your profile</p>
//                           <p className="text-xs text-gray-500">3 new job matches</p>
//                           <p className="text-xs text-gray-400 mt-1">Yesterday</p>
//                         </div>
//                       </div>
//                       <div className="p-2 border-t text-xs text-blue-600 text-center hover:underline cursor-pointer">
//                         View all notifications
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* User Menu */}
//                 <div className="relative group">
//                   <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-800">
//                     <div className="h-8 w-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
//                       {currentUser.name?.charAt(0)}
//                     </div>
//                     <span className="text-sm">{currentUser.name?.split(" ")[0]}</span>
//                   </button>
//                   <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                     <div className="px-4 py-3 border-b">
//                       <p className="text-sm font-medium">{currentUser.name}</p>
//                       <p className="text-xs text-gray-500">{currentUser.email}</p>
//                       <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
//                     </div>
//                     <Link to="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
//                       <Settings className="h-4 w-4 mr-2" />
//                       Profile Settings
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       <LogOut className="h-4 w-4 mr-2" />
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 text-gray-400 hover:text-gray-600"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
//           <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive("/") ? "text-blue-600" : "text-gray-700"}>
//             Home
//           </Link>
//           <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className={isActive("/jobs") ? "text-blue-600" : "text-gray-700"}>
//             Jobs
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)} className={isActive(getDashboardLink()) ? "text-blue-600" : "text-gray-700"}>
//                 Dashboard
//               </Link>
//               <Link to="/profile" onClick={() => setIsMenuOpen(false)} className={isActive("/profile") ? "text-blue-600" : "text-gray-700"}>
//                 Profile Settings
//               </Link>
//               <button
//                 onClick={() => {
//                   handleLogout()
//                   setIsMenuOpen(false)
//                 }}
//                 className="w-full text-left text-gray-700 hover:text-blue-600"
//               >
//                 Sign out
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">
//                 Login
//               </Link>
//               <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white bg-blue-600 px-4 py-2 rounded-md block text-center">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar
// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Link, useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
// import { GraduationCap, Menu, X, LogOut, Settings, Bell } from "lucide-react"

// const Navbar = () => {
//   const { currentUser, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

//   const notificationsRef = useRef(null)
//   const userMenuRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutsideOrScroll = (event) => {
//       if (
//         notificationsRef.current &&
//         !notificationsRef.current.contains(event.target)
//       ) {
//         setIsNotificationsOpen(false)
//       }
//       if (
//         userMenuRef.current &&
//         !userMenuRef.current.contains(event.target)
//       ) {
//         setIsUserMenuOpen(false)
//       }
//     }
  
//     document.addEventListener("mousedown", handleClickOutsideOrScroll)
//     window.addEventListener("scroll", handleClickOutsideOrScroll)
  
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideOrScroll)
//       window.removeEventListener("scroll", handleClickOutsideOrScroll)
//     }
//   }, [])
  

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   const getDashboardLink = () => {
//     if (!currentUser) return "/login"
//     switch (currentUser.role) {
//       case "employer": return "/employer/dashboard"
//       case "candidate": return "/candidate/dashboard"
//       case "recruiter": return "/recruiter/dashboard"
//       default: return "/"
//     }
//   }

//   const isActive = (path) => location.pathname === path

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <GraduationCap className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
//             </Link>
            
//           </div>
//           <div className="hidden md:flex md:ml-10 md:space-x-6 ">
//               <Link to="/" className={isActive("/") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}>
//                 Home
//               </Link>
//               <Link to="/jobs" className={isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}>
//                 Jobs
//               </Link>
//               {isAuthenticated && (
//                 <Link to={getDashboardLink()} className={isActive(getDashboardLink()) ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}>
//                   Dashboard
//                 </Link>
//               )}
//             </div>
//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 {/* Notifications */}
//                 <div className="relative" ref={notificationsRef}>
//                   <button
//                     onClick={() => setIsNotificationsOpen((prev) => !prev)}
//                     className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 relative"
//                   >
//                     <Bell className="h-5 w-5" />
//                     <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
//                   </button>
//                   {isNotificationsOpen && (
//                     <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-md shadow-md z-50">
//                       <div className="p-4 border-b">
//                         <h3 className="text-sm font-semibold">Notifications</h3>
//                       </div>
//                       <div className="max-h-60 overflow-y-auto divide-y">
//                         <div className="p-4 hover:bg-gray-50">
//                           <p className="text-sm font-medium">Your application was viewed</p>
//                           <p className="text-xs text-gray-500">Frontend Developer at Tech Solutions</p>
//                           <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
//                         </div>
//                         <div className="p-4 hover:bg-gray-50">
//                           <p className="text-sm font-medium">New job matches your profile</p>
//                           <p className="text-xs text-gray-500">3 new job matches</p>
//                           <p className="text-xs text-gray-400 mt-1">Yesterday</p>
//                         </div>
//                       </div>
//                       <div className="p-2 border-t text-xs text-blue-600 text-center hover:underline cursor-pointer">
//                         View all notifications
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* User Menu */}
//                 <div className="relative" ref={userMenuRef}>
//                   <button
//                     onClick={() => setIsUserMenuOpen((prev) => !prev)}
//                     className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-800"
//                   >
//                     <div className="h-8 w-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
//                       {currentUser.name?.charAt(0)}
//                     </div>
//                     <span className="text-sm">{currentUser.name?.split(" ")[0]}</span>
//                   </button>
//                   {isUserMenuOpen && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                       <div className="px-4 py-3 border-b">
//                         <p className="text-sm font-medium">{currentUser.name}</p>
//                         <p className="text-xs text-gray-500">{currentUser.email}</p>
//                         <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
//                       </div>
//                       <Link to="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
//                         <Settings className="h-4 w-4 mr-2" />
//                         Profile Settings
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Sign out
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 text-gray-400 hover:text-gray-600"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
//           <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive("/") ? "text-blue-600" : "text-gray-700"}>
//             Home
//           </Link>
//           <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className={isActive("/jobs") ? "text-blue-600" : "text-gray-700"}>
//             Jobs
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)} className={isActive(getDashboardLink()) ? "text-blue-600" : "text-gray-700"}>
//                 Dashboard
//               </Link>
//               <Link to="/profile" onClick={() => setIsMenuOpen(false)} className={isActive("/profile") ? "text-blue-600" : "text-gray-700"}>
//                 Profile Settings
//               </Link>
//               <button
//                 onClick={() => {
//                   handleLogout()
//                   setIsMenuOpen(false)
//                 }}
//                 className="w-full text-left text-gray-700 hover:text-blue-600"
//               >
//                 Sign out
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">
//                 Login
//               </Link>
//               <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white bg-blue-600 px-4 py-2 rounded-md block text-center">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar
"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { GraduationCap, Menu, X, LogOut, Settings, Bell, ChevronDown } from "lucide-react"

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [showAllNotifications, setShowAllNotifications] = useState(false)

  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Your application was viewed",
      description: "Frontend Developer at Tech Solutions",
      time: "2 hours ago",
      read: false,
      link: "/candidate/dashboard",
    },
    {
      id: 2,
      title: "New job matches your profile",
      description: "3 new job matches",
      time: "Yesterday",
      read: false,
      link: "/jobs",
    },
    {
      id: 3,
      title: "Application status updated",
      description: "You've been shortlisted for Backend Engineer",
      time: "2 days ago",
      read: true,
      link: "/candidate/dashboard",
    },
    {
      id: 4,
      title: "Interview scheduled",
      description: "UX Designer at Design Masters",
      time: "3 days ago",
      read: true,
      link: "/candidate/dashboard",
    },
    {
      id: 5,
      title: "New message from recruiter",
      description: "Regarding your application for DevOps Engineer",
      time: "1 week ago",
      read: true,
      link: "/candidate/dashboard",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
        setShowAllNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getDashboardLink = () => {
    if (!currentUser) return "/login"
    switch (currentUser.role) {
      case "employer":
        return "/employer/dashboard"
      case "candidate":
        return "/candidate/dashboard"
      case "recruiter":
        return "/recruiter/dashboard"
      default:
        return "/"
    }
  }

  const isActive = (path) => location.pathname === path

  const handleNotificationClick = (link) => {
    setIsNotificationsOpen(false)
    setShowAllNotifications(false)
    navigate(link)
  }

  const toggleAllNotifications = (e) => {
    e.preventDefault()
    setShowAllNotifications(!showAllNotifications)
  }

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className={`text-sm ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`text-sm ${isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
            >
              Jobs
            </Link>
            {isAuthenticated && (
              <Link
                to={getDashboardLink()}
                className={`text-sm ${isActive(getDashboardLink()) ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-md shadow-lg z-50 ${showAllNotifications ? "max-h-[80vh]" : ""}`}
                    >
                      <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="text-sm font-semibold">Notifications</h3>
                        <button
                          onClick={() => setIsNotificationsOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className={`${showAllNotifications ? "max-h-[60vh]" : "max-h-60"} overflow-y-auto divide-y`}>
                        {(showAllNotifications ? notifications : notifications.slice(0, 3)).map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.link)}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                          >
                            <div className="flex justify-between">
                              <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                                {notification.title}
                              </p>
                              {!notification.read && <span className="h-2 w-2 bg-blue-600 rounded-full"></span>}
                            </div>
                            <p className="text-xs text-gray-500">{notification.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>

                      <div
                        className="p-3 border-t text-xs text-blue-600 text-center hover:underline cursor-pointer flex items-center justify-center"
                        onClick={toggleAllNotifications}
                      >
                        {showAllNotifications ? (
                          <>
                            Show less
                            <ChevronDown className="h-3 w-3 ml-1 transform rotate-180" />
                          </>
                        ) : (
                          <>
                            View all notifications
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-800"
                  >
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage || "/placeholder.svg"}
                        alt={currentUser.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                        {currentUser.name?.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm hidden sm:block">{currentUser.name?.split(" ")[0]}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md">
          <Link to="/" className={`block py-2 ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700"}`}>
            Home
          </Link>
          <Link
            to="/jobs"
            className={`block py-2 ${isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-700"}`}
          >
            Jobs
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to={getDashboardLink()}
                className={`block py-2 ${isActive(getDashboardLink()) ? "text-blue-600 font-medium" : "text-gray-700"}`}
              >
                Dashboard
              </Link>

              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex items-center py-2">
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage || "/placeholder.svg"}
                      alt={currentUser.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                      {currentUser.name?.charAt(0)}
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                </div>

                <Link to="/profile" className="flex items-center py-2 text-gray-700">
                  <Settings className="h-5 w-5 mr-2" />
                  Profile Settings
                </Link>

                <button onClick={handleLogout} className="flex items-center w-full py-2 text-gray-700">
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-200 my-2 pt-2 flex flex-col space-y-2">
              <Link to="/login" className="text-gray-700 py-2">
                Login
              </Link>
              <Link to="/signup" className="text-white bg-blue-600 px-4 py-2 rounded-md text-center">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
