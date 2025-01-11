import React, { useState, useEffect } from "react";
import axios from "axios";

const TriviaApp = () => {
    // State to store question data
    const [questionData, setQuestionData] = useState([]);
    const [currquesindex, setcurrquesindex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracks clicked answer

    // Fetch question data using Axios
    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await axios.get(
                "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
            );
            setQuestionData(response.data.results);
        };

        fetchQuestion();
    }, []);

    const handlenextques = () => {
        setSelectedAnswer(null); // Reset the selected answer
        setcurrquesindex((prevIndex) => (prevIndex + 1) % 10);
    };

    if (questionData.length === 0) {
        return <p>Loading...</p>;
    }

    const currentQuestion = questionData[currquesindex];
    const allanswers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
    ];
    const sortedans = allanswers.sort(() => Math.random()-0.5);

    return (
        <div>
            <h1>TRIVIA APP</h1>
            <h2>{currentQuestion.category}</h2>
            <h3>{currentQuestion.question}</h3>
            <div>
                {sortedans.map((ans, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedAnswer(ans)}
                        style={{
                            color:
                                selectedAnswer === null
                                    ? "black"
                                    : ans === currentQuestion.correct_answer
                                    ? "green"
                                    : ans === selectedAnswer
                                    ? "red"
                                    : "black",
                        }}
                    >
                        {ans}
                    </button>
                ))}
            </div>
            <button onClick={handlenextques}>next</button>
        </div>
    );
};

export default TriviaApp;
