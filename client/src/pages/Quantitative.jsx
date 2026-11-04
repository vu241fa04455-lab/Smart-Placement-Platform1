
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
    {
        question: "What is 20% of 200?",
        options: ["20", "30", "40", "50"],
        answer: "40"
    },
    {
        question: "What is 15 + 25?",
        options: ["35", "40", "45", "50"],
        answer: "40"
    },
    {
        question: "What is the square of 12?",
        options: ["124", "144", "134", "154"],
        answer: "144"
    },
    {
        question: "What is 100 divided by 4?",
        options: ["20", "25", "30", "40"],
        answer: "25"
    },
    {
        question: "What is the value of 5 × 8?",
        options: ["35", "40", "45", "50"],
        answer: "40"
    },
    {
        question: "What is 50% of 80?",
        options: ["20", "30", "40", "50"],
        answer: "40"
    },
    {
        question: "What is the next number: 2, 4, 6, 8, __?",
        options: ["9", "10", "12", "14"],
        answer: "10"
    },
    {
        question: "What is 9 × 9?",
        options: ["72", "81", "90", "99"],
        answer: "81"
    },
    {
        question: "What is the cube of 3?",
        options: ["9", "18", "27", "36"],
        answer: "27"
    },
    {
        question: "What is 75 + 25?",
        options: ["90", "95", "100", "105"],
        answer: "100"
    }
];

function Quantitative() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        if (!selectedAnswer) {
            alert("Please select an answer!");
            return;
        }

        let newScore = score;

        if (selectedAnswer === questions[currentQuestion].answer) {
            newScore = score + 1;
            setScore(newScore);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
        } else {
            setScore(newScore);

            const performance = JSON.parse(
                localStorage.getItem("performance") || "{}"
            );

            performance.quantitative = {
                score: newScore,
                total: questions.length
            };

            localStorage.setItem(
                "performance",
                JSON.stringify(performance)
            );

            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        return (
            <div className="quiz-container">
                <div className="quiz-box">
                    <h1>Quiz Completed!</h1>
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <p>
                        {score >= 7
                            ? "Excellent! Keep it up!"
                            : "Good try! Practice more to improve."}
                    </p>
                    <button onClick={handleRestart}>Try Again</button>
                    <button onClick={() => navigate("/aptitude")}>
                        Back to Aptitude
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-box">
                <h1>Quantitative Aptitude</h1>

                <p className="question-count">
                    Question {currentQuestion + 1} of {questions.length}
                </p>

                <h2>{questions[currentQuestion].question}</h2>

                <div className="quiz-options">
                    {questions[currentQuestion].options.map((option, index) => (
                        <label
                            key={index}
                            className={selectedAnswer === option ? "selected" : ""}
                        >
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => setSelectedAnswer(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <button onClick={handleNext}>
                    {currentQuestion === questions.length - 1
                        ? "Submit Quiz"
                        : "Next Question"}
                </button>
            </div>
        </div>
    );
}

export default Quantitative;
