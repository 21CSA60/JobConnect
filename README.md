### JobConnect - Job Portal Application Tracking System

JobConnect is a comprehensive job portal and applicant tracking system (ATS) built with React and Vite. It provides a platform for employers to post jobs, candidates to apply for positions, and recruiters to review applications.

## 🌟 Features

### For All Users

- User authentication with role-based access (JWT)
- Browse and search job listings
- View detailed job information
- User profile management
- Responsive design for all devices


### For Candidates

- Apply to jobs with resume upload
- Track application status
- Manage profile and skills


### For Employers

- Post and manage job listings
- Review applications
- Shortlist candidates


### For Recruiters

- Review and evaluate candidates
- Provide feedback on applications
- Manage hiring workflow


## 🛠️ Technologies Used

- **Frontend**: React (Vite), React Router
- **State Management**: Context API
- **Authentication**: JWT
- **Styling**: Tailwind CSS
- **Icons**: Lucide React


## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- npm (v6.0.0 or later)


## 🚀 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**


```shellscript
git clone https://github.com/sooryaprasads/JobConnect.git
cd JobConnect
```

2. **Install dependencies**


```shellscript
# Install core dependencies
npm install react-router-dom jwt-decode lucide-react

# Install Tailwind CSS and UI dependencies
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms tailwindcss-animate

# Install development dependencies
npm install -D @vitejs/plugin-react
```

3. **Initialize Tailwind CSS**


```shellscript
npx tailwindcss init -p
```

4. **Configure Tailwind CSS**


Update the `tailwind.config.js` file with the content provided in the project.

5. **Start the development server**


```shellscript
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 📝 Usage

### Demo Credentials

For demonstration purposes, you can use the following credentials:

Roles:                                               
**Employer**  
Email: [employer@example.com](mailto:employer@example.com)   

**Candidate**  
Email: [candidate@example.com](mailto:candidate@example.com)  

**Recruiter**  
Email: [recruiter@example.com](mailto:recruiter@example.com)  

**Password** : Can use random passwords.

## ⚒Workflow

1. **As a Candidate**:

    1. Browse available jobs
    2. Apply for jobs with your resume
    3. Track your application status
    4. Update your profile



2. **As an Employer**:

    1. Post new job listings
    2. Review applications
    3. Shortlist candidates
    4. Manage your company profile



3. **As a Recruiter**:

    1. Review candidate applications
    2. Provide feedback
    3. Shortlist or reject candidates



## 📁 Project Structure

```plaintext
JobConnect/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── job/
│   │   └── layout/
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── JobContext.jsx
│   ├── pages/
│   │   ├── candidate/
│   │   ├── employer/
│   │   ├── profile/
│   │   ├── recruiter/
│   │   └── [public pages]
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```
## Future Enhancements

- Integration with real backend API
- Email notifications
- Advanced search and filtering
- Resume parsing
- Interview scheduling
- Analytics dashboard
- Mobile application

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)



## 📬 Contact

Project Link: [https://github.com/sooryaprasads/JobConnect](https://github.com/sooryaprasads/JobConnect)