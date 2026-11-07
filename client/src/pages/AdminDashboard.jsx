
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user") || "null");

            if (!token || !user || user.role !== "admin") {
                alert("Access denied. Admins only.");
                navigate("/");
                return;
            }

            try {
                const response = await axios.get(
                    "https://smart-placement-platform1-backend.onrender.com/api/applications/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setApplications(response.data);

            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    "Failed to load applications"
                );

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    navigate("/");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem("token");

        try {
            setUpdating(id);

            const response = await axios.put(
                `https://smart-placement-platform1-backend.onrender.com/api/applications/update-status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications((previousApplications) =>
                previousApplications.map((app) =>
                    app._id === id ? response.data.application : app
                )
            );

            alert("Application status updated successfully!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update application status"
            );
        } finally {
            setUpdating("");
        }
    };

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (app) => app.status === "Pending"
    ).length;

    const selectedApplications = applications.filter(
        (app) => app.status === "Selected"
    ).length;

    const rejectedApplications = applications.filter(
        (app) => app.status === "Rejected"
    ).length;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Smart Placement Platform - Admin</h2>
                <button onClick={logout}>Logout</button>
            </header>

            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                <p>Welcome, Admin!</p>

                {loading ? (
                    <p>Loading dashboard...</p>
                ) : (
                    <>
                        <div className="dashboard-cards">
                            <div className="dashboard-card">
                                <h2>Total Applications</h2>
                                <h1>{totalApplications}</h1>
                            </div>

                            <div className="dashboard-card">
                                <h2>Pending Applications</h2>
                                <h1>{pendingApplications}</h1>
                            </div>

                            <div className="dashboard-card">
                                <h2>Selected Applications</h2>
                                <h1>{selectedApplications}</h1>
                            </div>

                            <div className="dashboard-card">
                                <h2>Rejected Applications</h2>
                                <h1>{rejectedApplications}</h1>
                            </div>
                        </div>

                        <h2>All Job Applications</h2>

                        {applications.length === 0 ? (
                            <p>No applications available.</p>
                        ) : (
                            <div className="jobs-list">
                                {applications.map((app) => (
                                    <div className="job-card" key={app._id}>
                                        <h2>{app.job}</h2>
                                        <h3>{app.company}</h3>

                                        <p>Name: {app.name}</p>
                                        <p>Email: {app.email}</p>
                                        <p>
                                            Status: <strong>{app.status}</strong>
                                        </p>

                                        <p>
                                            Applied Date:{" "}
                                            {new Date(app.appliedDate).toLocaleDateString()}
                                        </p>

                                        <a
                                            href={app.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View Resume
                                        </a>

                                        <div className="status-buttons">
                                            <button
                                                className="pending-btn"
                                                onClick={() => updateStatus(app._id, "Pending")}
                                                disabled={updating === app._id}
                                            >
                                                Pending
                                            </button>

                                            <button
                                                className="selected-btn"
                                                onClick={() => updateStatus(app._id, "Selected")}
                                                disabled={updating === app._id}
                                            >
                                                Selected
                                            </button>

                                            <button
                                                className="rejected-btn"
                                                onClick={() => updateStatus(app._id, "Rejected")}
                                                disabled={updating === app._id}
                                            >
                                                Rejected
                                            </button>
                                        </div>

                                        {updating === app._id && (
                                            <p>Updating status...</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
