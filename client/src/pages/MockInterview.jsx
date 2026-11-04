
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MockInterview() {
    const navigate = useNavigate();

    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which language is used for styling web pages?",
            options: ["Python", "CSS", "Java", "C"],
            answer: "CSS"
        },
        {
            question: "What is the full form of OOP?",
            options: [
                "Object Oriented Programming",
                "Open Online Programming",
                "Object Operating Program",
                "Online Object Process"
            ],
            answer: "Object Oriented Programming"
        },
        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: "Queue"
        },
        {
            question: "Which keyword is used to create an object in Java?",
            options: ["class", "new", "static", "void"],
            answer: "new"
        },
        {
            question: "Tell me about yourself is commonly asked in which interview?",
            options: ["HR Interview", "Coding Test", "Written Test", "Group Study"],
            answer: "HR Interview"
        },
        {
            question: "What is your greatest strength?",
            options: [
                "I give up easily",
                "I am a quick learner",
                "I avoid teamwork",
                "I do not like learning"
            ],
            answer: "I am a quick learner"
        },
        {
            question: "What does DBMS stand for?",
            options: [
                "Database Management System",
                "Data Backup Management Software",
                "Digital Base Machine System",
                "Database Main Server"
            ],
            answer: "Database Management System"
        },
        {
            question: "Which SQL command is used to retrieve data?",
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            answer: "SELECT"
        },
        {
            question: "Why should we hire you?",
            options: [
                "I am not interested in learning",
                "I can learn quickly and work sincerely",
                "I do not like responsibilities",
                "I cannot work in a team"
            ],
            answer: "I can learn quickly and work sincerely"
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleNext = () => {
        if (selectedAnswer === "") {
            alert("Please select an answer");
            return;
        }

        let updatedScore = score;

        if (selectedAnswer === questions[currentQuestion].answer) {
            updatedScore = score + 1;
            setScore(updatedScore);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
        } else {
            const performance = JSON.parse(
                localStorage.getItem("performance") || "{}"
            );

            performance.mockInterview = {
                score: updatedScore,
                total: questions.length
            };

            localStorage.setItem(
                "performance",
                JSON.stringify(performance)
            );

            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="quiz-container">
            <div className="quiz-box">
                {showResult ? (
                    <>
                        <h1>Mock Interview Completed!</h1>
                        <h2>Your Score: {score} / {questions.length}</h2>

                        <button onClick={restartQuiz}>Restart Interview</button>

                        <button onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </button>
                    </>
                ) : (
                    <>
                        <h1>Mock Interview</h1>

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
                                ? "Submit"
                                : "Next"}
                        </button>

                        <button onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MockInterview;
