
import React from "react";
import { useNavigate } from "react-router-dom";

function Aptitude() {
    const navigate = useNavigate();

    return (
        <div className="aptitude-page">
            <header className="aptitude-header">
                <h2>Smart Placement Platform</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </header>

            <div className="aptitude-content">
                <h1>Aptitude Practice</h1>
                <p>Choose a section to improve your placement skills.</p>

                <div className="aptitude-cards">

                    <div className="aptitude-card">
                        <h2>Quantitative Aptitude</h2>
                        <p>
                            Practice mathematics, percentages, profit and loss,
                            time and work.
                        </p>
                        <button onClick={() => navigate("/aptitude/quantitative")}>
                            Start Practice
                        </button>
                    </div>

                    <div className="aptitude-card">
                        <h2>Logical Reasoning</h2>
                        <p>
                            Improve puzzles, number series, coding and decoding skills.
                        </p>
                        <button onClick={() => navigate("/aptitude/logical")}>
                            Start Practice
                        </button>
                    </div>

                    <div className="aptitude-card">
                        <h2>Verbal Ability</h2>
                        <p>
                            Practice grammar, vocabulary, synonyms and comprehension.
                        </p>
                        <button onClick={() => navigate("/aptitude/verbal")}>
                            Start Practice
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Aptitude;
