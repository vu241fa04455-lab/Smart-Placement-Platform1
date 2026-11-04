
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Verbal() {
    const navigate = useNavigate();

    const questions = [
        {
            question: "Choose the synonym of Happy.",
            options: ["Sad", "Joyful", "Angry", "Tired"],
            answer: "Joyful"
        },
        {
            question: "Choose the antonym of Hot.",
            options: ["Warm", "Cold", "Heat", "Boiling"],
            answer: "Cold"
        },
        {
            question: "Choose the correct spelling.",
            options: ["Beautifull", "Beutiful", "Beautiful", "Butiful"],
            answer: "Beautiful"
        },
        {
            question: "Fill in the blank: She ___ going to college.",
            options: ["am", "are", "is", "be"],
            answer: "is"
        },
        {
            question: "What is the plural of Child?",
            options: ["Childs", "Children", "Childes", "Childrens"],
            answer: "Children"
        },
        {
            question: "Choose the synonym of Big.",
            options: ["Small", "Tiny", "Large", "Short"],
            answer: "Large"
        },
        {
            question: "Choose the antonym of Early.",
            options: ["Soon", "Late", "Quick", "Fast"],
            answer: "Late"
        },
        {
            question: "Fill in the blank: They ___ playing cricket.",
            options: ["is", "am", "are", "was"],
            answer: "are"
        },
        {
            question: "Choose the correct article: ___ apple.",
            options: ["A", "An", "The", "No article"],
            answer: "An"
        },
        {
            question: "What is the past tense of Go?",
            options: ["Going", "Gone", "Went", "Goes"],
            answer: "Went"
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

        let newScore = score;

        if (selectedAnswer === questions[currentQuestion].answer) {
            newScore = score + 1;
            setScore(newScore);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
        } else {
            const performance = JSON.parse(
                localStorage.getItem("performance") || "{}"
            );

            performance.verbal = {
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
                        <h1>Quiz Completed!</h1>
                        <h2>Your Score: {score} / {questions.length}</h2>
                        <button onClick={restartQuiz}>Restart Quiz</button>
                        <button onClick={() => navigate("/aptitude")}>
                            Back to Aptitude
                        </button>
                    </>
                ) : (
                    <>
                        <h1>Verbal Ability Quiz</h1>
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Verbal;
