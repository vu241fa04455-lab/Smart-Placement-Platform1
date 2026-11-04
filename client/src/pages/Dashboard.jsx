import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className="dashboard">
            <header>
                <h2>Smart Placement Platform</h2>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <div className="welcome">
                <h1>Welcome, {user?.name || "Student"}!</h1>
                <p>Prepare yourself for your dream placement.</p>
            </div>

            <div className="dashboard-cards">

                <div className="card" onClick={() => navigate("/student-profile")}>
                    <h2>Student Profile</h2>
                    <p>View and update your personal details, education and skills.</p>
                </div>

                <div className="card" onClick={() => navigate("/aptitude")}>
                    <h2>Aptitude Practice</h2>
                    <p>Improve your quantitative and logical skills.</p>
                </div>

                <div className="card" onClick={() => navigate("/coding")}>
                    <h2>Coding Practice</h2>
                    <p>Practice programming questions in C, Java and Python.</p>
                </div>

                <div className="card" onClick={() => navigate("/mock-interview")}>
                    <h2>Mock Interviews</h2>
                    <p>Prepare for technical and HR interviews.</p>
                </div>

                <div className="card" onClick={() => navigate("/resume")}>
                    <h2>Resume Builder</h2>
                    <p>Create and download your professional resume.</p>
                </div>

                <div className="card" onClick={() => navigate("/jobs")}>
                    <h2>Job Opportunities</h2>
                    <p>Explore jobs and internships.</p>
                </div>

                <div className="card" onClick={() => navigate("/performance")}>
                    <h2>My Performance</h2>
                    <p>Track your preparation progress.</p>
                </div>

                <div className="card" onClick={() => navigate("/my-applications")}>
                    <h2>My Applications</h2>
                    <p>View your submitted job applications and their status.</p>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;