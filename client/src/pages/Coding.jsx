
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Coding() {
    const navigate = useNavigate();

    const questions = [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "fun", "define"],
            answer: "def"
        },
        {
            question: "Which symbol is used to end a statement in C?",
            options: [".", ",", ";", ":"],
            answer: ";"
        },
        {
            question: "Which method is used to print output in Java?",
            options: ["print()", "System.out.println()", "echo()", "display()"],
            answer: "System.out.println()"
        },
        {
            question: "Which data type stores whole numbers in Python?",
            options: ["float", "str", "int", "list"],
            answer: "int"
        },
        {
            question: "Which loop executes at least once in C?",
            options: ["for", "while", "do-while", "foreach"],
            answer: "do-while"
        },
        {
            question: "Which keyword is used to create a class in Java?",
            options: ["class", "create", "object", "new"],
            answer: "class"
        },
        {
            question: "What is the output of 5 + 3 in Python?",
            options: ["53", "8", "2", "15"],
            answer: "8"
        },
        {
            question: "Which operator is used for comparison of equality in C?",
            options: ["=", "==", "!=", ">"],
            answer: "=="
        },
        {
            question: "Which keyword is used to inherit a class in Java?",
            options: ["implements", "extends", "inherits", "super"],
            answer: "extends"
        },
        {
            question: "Which function is the starting point of a C program?",
            options: ["start()", "begin()", "main()", "run()"],
            answer: "main()"
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

            performance.coding = {
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
                        <h1>Coding Quiz Completed!</h1>
                        <h2>Your Score: {score} / {questions.length}</h2>

                        <button onClick={restartQuiz}>Restart Quiz</button>

                        <button onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </button>
                    </>
                ) : (
                    <>
                        <h1>Coding Practice</h1>

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

export default Coding;
