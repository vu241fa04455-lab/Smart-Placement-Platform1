
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentProfile() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const token = localStorage.getItem("token");

    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [mobile, setMobile] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState("");
    const [projects, setProjects] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                alert("Please login first");
                navigate("/");
                return;
            }

            try {
                const response = await axios.get(
                    "https://smart-placement-platform1-backend.onrender.com/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const profile = response.data.profile;

                setName(profile.name || "");
                setEmail(profile.email || "");
                setMobile(profile.mobile || "");
                setEducation(profile.education || "");
                setSkills(profile.skills || "");
                setProjects(profile.projects || "");

            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    "Failed to load profile"
                );
            }
        };

        fetchProfile();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                "https://smart-placement-platform1-backend.onrender.com/api/profile",
                {
                    name,
                    mobile,
                    education,
                    skills,
                    projects
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const updatedUser = {
                ...user,
                name: response.data.profile.name,
                email: response.data.profile.email,
                mobile: response.data.profile.mobile
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Profile saved successfully!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to save profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <header className="aptitude-header">
                <h2>Smart Placement Platform</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </header>

            <div className="profile-container">
                <h1>Student Profile</h1>
                <p>Complete your profile to improve your placement opportunities.</p>

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                    />

                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />

                    <label>Education</label>
                    <input
                        type="text"
                        placeholder="Example: B.Tech CSE - 2nd Year"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        required
                    />

                    <label>Skills</label>
                    <textarea
                        placeholder="Example: HTML, CSS, Java, Python"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        required
                    />

                    <label>Projects</label>
                    <textarea
                        placeholder="Enter your project details"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StudentProfile;
