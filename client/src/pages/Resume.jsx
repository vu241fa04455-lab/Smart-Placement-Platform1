
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Resume() {
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        objective: "",
        education: "",
        skills: "",
        projects: "",
        certifications: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                navigate("/");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const profile = response.data.profile;

                setDetails((previous) => ({
                    ...previous,
                    name: profile.name || "",
                    email: profile.email || "",
                    phone: profile.mobile || "",
                    education: profile.education || "",
                    skills: profile.skills || "",
                    projects: profile.projects || ""
                }));

            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    "Unable to load student profile"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <h2>Loading your profile...</h2>;
    }

    return (
        <div className="resume-page">
            <header className="aptitude-header">
                <h2>Smart Placement Platform</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </header>

            <div className="resume-content">
                <h1>Resume Builder</h1>
                <p>Your Student Profile details are automatically filled below.</p>

                <div className="resume-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={details.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={details.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Mobile Number"
                        value={details.phone}
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={details.address}
                        onChange={handleChange}
                    />

                    <textarea
                        name="objective"
                        placeholder="Career Objective"
                        value={details.objective}
                        onChange={handleChange}
                    />

                    <textarea
                        name="education"
                        placeholder="Education Details"
                        value={details.education}
                        onChange={handleChange}
                    />

                    <textarea
                        name="skills"
                        placeholder="Technical Skills"
                        value={details.skills}
                        onChange={handleChange}
                    />

                    <textarea
                        name="projects"
                        placeholder="Projects"
                        value={details.projects}
                        onChange={handleChange}
                    />

                    <textarea
                        name="certifications"
                        placeholder="Certifications"
                        value={details.certifications}
                        onChange={handleChange}
                    />
                </div>

                <div className="resume-preview">
                    <h1>{details.name || "Your Name"}</h1>
                    <p>{details.email}</p>
                    <p>{details.phone}</p>
                    <p>{details.address}</p>

                    <h2>Career Objective</h2>
                    <p>{details.objective}</p>

                    <h2>Education</h2>
                    <p>{details.education}</p>

                    <h2>Technical Skills</h2>
                    <p>{details.skills}</p>

                    <h2>Projects</h2>
                    <p>{details.projects}</p>

                    <h2>Certifications</h2>
                    <p>{details.certifications}</p>
                </div>

                <button onClick={handlePrint}>
                    Download Resume / Print
                </button>
            </div>
        </div>
    );
}

export default Resume;
