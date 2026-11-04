
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
    {
        question: "Find the next number: 2, 4, 6, 8, __?",
        options: ["9", "10", "12", "14"],
        answer: "10"
    },
    {
        question: "Find the next number: 5, 10, 15, 20, __?",
        options: ["22", "25", "30", "35"],
        answer: "25"
    },
    {
        question: "If CAT is written as DBU, how is DOG written?",
        options: ["EPH", "EOG", "DPH", "FQI"],
        answer: "EPH"
    },
    {
        question: "Which one is different from the others?",
        options: ["Apple", "Mango", "Carrot", "Banana"],
        answer: "Carrot"
    },
    {
        question: "A is the brother of B. B is the sister of C. How is A related to C?",
        options: ["Sister", "Brother", "Father", "Mother"],
        answer: "Brother"
    },
    {
        question: "Find the next number: 3, 6, 12, 24, __?",
        options: ["36", "42", "48", "50"],
        answer: "48"
    },
    {
        question: "If you face North and turn right, which direction are you facing?",
        options: ["South", "East", "West", "North"],
        answer: "East"
    },
    {
        question: "Which is the odd one out?",
        options: ["Circle", "Square", "Triangle", "Table"],
        answer: "Table"
    },
    {
        question: "Find the next letter: A, C, E, G, __?",
        options: ["H", "I", "J", "K"],
        answer: "I"
    },
    {
        question: "If today is Monday, what day will it be after 3 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Thursday"
    }
];

function Logical() {
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

            performance.logical = {
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
                <h1>Logical Reasoning</h1>

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

export default Logical;
