
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyApplications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                navigate("/");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/applications/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setApplications(response.data);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load applications. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [navigate]);

    return (
        <div className="jobs-page">
            <header className="aptitude-header">
                <h2>Smart Placement Platform</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </header>

            <div className="jobs-content">
                <h1>My Applications</h1>
                <p>Track the status of your submitted job applications.</p>

                {loading && <p>Loading applications...</p>}

                {error && <p>{error}</p>}

                {!loading && !error && applications.length === 0 && (
                    <p>No applications submitted yet.</p>
                )}

                <div className="jobs-list">
                    {applications.map((application) => (
                        <div className="job-card" key={application._id}>
                            <h2>{application.job}</h2>
                            <h3>{application.company}</h3>

                            <p>Applicant: {application.name}</p>
                            <p>Email: {application.email}</p>

                            <p>
                                Status: <strong>{application.status}</strong>
                            </p>

                            <p>
                                Applied Date:{" "}
                                {new Date(application.appliedDate).toLocaleDateString()}
                            </p>

                            <a
                                href={application.resume}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Resume
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyApplications;
