
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Jobs() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const token = localStorage.getItem("token");

    const [selectedJob, setSelectedJob] = useState(null);
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [resume, setResume] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const jobs = [
        {
            title: "Frontend Developer Intern",
            company: "ABC Technologies",
            location: "Hyderabad",
            type: "Internship",
            skills: "HTML, CSS, JavaScript, React"
        },
        {
            title: "Python Developer",
            company: "XYZ Solutions",
            location: "Bangalore",
            type: "Full Time",
            skills: "Python, Django, SQL"
        },
        {
            title: "Java Developer Intern",
            company: "Tech Solutions",
            location: "Chennai",
            type: "Internship",
            skills: "Java, OOP, MySQL"
        },
        {
            title: "Software Developer",
            company: "Digital Systems",
            location: "Pune",
            type: "Full Time",
            skills: "C++, Java, Data Structures"
        }
    ];

    const handleApply = (job) => {
        if (!token) {
            alert("Please login first");
            navigate("/");
            return;
        }

        setSelectedJob(job);
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Please login first");
            navigate("/");
            return;
        }

        setLoading(true);
        setMessage("");

        const application = {
            name,
            email,
            resume,
            job: selectedJob.title,
            company: selectedJob.company
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/applications/submit",
                application,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);
            setResume("");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to submit application"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="jobs-page">
            <header className="aptitude-header">
                <h2>Smart Placement Platform</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </header>

            <div className="jobs-content">
                <h1>Job Opportunities</h1>
                <p>Explore job openings and internship opportunities.</p>

                <div className="jobs-list">
                    {jobs.map((job, index) => (
                        <div className="job-card" key={index}>
                            <h2>{job.title}</h2>
                            <h3>{job.company}</h3>
                            <p>Location: {job.location}</p>
                            <p>Type: {job.type}</p>
                            <p>Required Skills: {job.skills}</p>

                            <button onClick={() => handleApply(job)}>
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                {selectedJob && (
                    <div className="application-form">
                        <h2>Apply for {selectedJob.title}</h2>
                        <h3>{selectedJob.company}</h3>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                readOnly
                                required
                            />

                            <input
                                type="url"
                                placeholder="Enter your resume link"
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedJob(null)}
                            >
                                Cancel
                            </button>
                        </form>

                        {message && <p>{message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Jobs;
