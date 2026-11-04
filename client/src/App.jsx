import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Aptitude from "./pages/Aptitude";
import Quantitative from "./pages/Quantitative";
import Logical from "./pages/Logical";
import Verbal from "./pages/Verbal";
import Coding from "./pages/Coding";
import MockInterview from "./pages/MockInterview";
import Resume from "./pages/Resume";
import Jobs from "./pages/Jobs";
import Performance from "./pages/Performance";
import MyApplications from "./pages/MyApplications";
import StudentProfile from "./pages/StudentProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/aptitude" element={<Aptitude />} />
                <Route path="/aptitude/quantitative" element={<Quantitative />} />
                <Route path="/aptitude/logical" element={<Logical />} />
                <Route path="/aptitude/verbal" element={<Verbal />} />
                <Route path="/coding" element={<Coding />} />
                <Route path="/mock-interview" element={<MockInterview />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/student-profile" element={<StudentProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;