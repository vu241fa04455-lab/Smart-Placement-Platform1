
import React from "react";
import { useNavigate } from "react-router-dom";

function Performance() {
    const navigate = useNavigate();

    const savedPerformance = JSON.parse(
        localStorage.getItem("performance") || "{}"
    );

    const quantitative = savedPerformance.quantitative || { score: 0, total: 10 };
    const logical = savedPerformance.logical || { score: 0, total: 10 };
    const verbal = savedPerformance.verbal || { score: 0, total: 10 };
    const coding = savedPerformance.coding || { score: 0, total: 10 };
    const mockInterview = savedPerformance.mockInterview || { score: 0, total: 10 };

    const aptitudeScore =
        quantitative.score + logical.score + verbal.score;

    const aptitudeTotal =
        quantitative.total + logical.total + verbal.total;

    const performance = [
        {
            title: "Aptitude Practice",
            score: aptitudeScore,
            total: aptitudeTotal,
            description: "Quantitative, Logical and Verbal Ability"
        },
        {
            title: "Coding Practice",
            score: coding.score,
            total: coding.total,
            description: "C, Java and Python programming"
        },
        {
            title: "Mock Interviews",
            score: mockInterview.score,
            total: mockInterview.total,
            description: "Technical and HR interview preparation"
        }
    ];

    const totalScore = performance.reduce(
        (sum, item) => sum + item.score, 0
    );

    const totalQuestions = performance.reduce(
        (sum, item) => sum + item.total, 0
    );

    const overallPercentage = Math.round(
        (totalScore / totalQuestions) * 100
    );

    return (
        <div className="performance-page">
            <header className="aptitude-header">
                <h2>Smart Placement Platform</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </header>

            <div className="performance-content">
                <h1>My Performance</h1>
                <p>Track your placement preparation progress.</p>

                <div className="performance-cards">
                    {performance.map((item, index) => (
                        <div className="performance-card" key={index}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>

                            <h3>
                                Score: {item.score} / {item.total}
                            </h3>

                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{
                                        width: `${item.total > 0
                                            ? (item.score / item.total) * 100
                                            : 0}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="overall-performance">
                    <h2>Overall Performance</h2>
                    <h1>{overallPercentage}%</h1>
                    <p>Keep practicing to improve your scores!</p>
                </div>
            </div>
        </div>
    );
}

export default Performance;
