import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!start) {
      fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      )
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);
        });
    }
  }, [start]);

  const handleOption = (option) => {
    setLoading(true);

    questions[activeQuestion].answer = option;
    setTimeout(function () {
      setActiveQuestion(activeQuestion + 1);
      if (questions[activeQuestion].correct_answer === option) {
        setScore(score + 1);
      }

      setLoading(false);
    }, 600);
  };

  const startAgain = () => {
    setStart(false);
    setActiveQuestion(0);
    setScore(0);
  };

  return (
    <div className="app">
      {start ? (
        <div className="box-center game">
          {questions[activeQuestion] ? (
            <div className="question">
              <h2>{questions[activeQuestion].category}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: questions[activeQuestion].question,
                }}
              />

              {loading ? (
                <div className="loading">
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="button-area">
                  <button onClick={() => handleOption("True")} className="true">
                    TRUE
                  </button>
                  <button
                    onClick={() => handleOption("False")}
                    className="false"
                  >
                    FALSE
                  </button>
                </div>
              )}

              <div className="count-question">
                {activeQuestion + 1}/{questions.length}
              </div>
            </div>
          ) : (
            <div className="result">
              <h2>You score</h2>
              <h3>
                {score}/{questions.length}
              </h3>
              {questions.map((item) => (
                <div className="final">
                  <div className="score">
                    {item.correct_answer == item.answer ? "(+)" : "( - )"}
                  </div>
                  <div
                    className="question"
                    dangerouslySetInnerHTML={{
                      __html: item.question,
                    }}
                  />
                </div>
              ))}
              <div className="center">
                <button onClick={startAgain}>PLAY AGAIN?</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="box-center begin">
          <h2>Wellcome to the Trivia Challange!</h2>

          <p>You will be presented with 10 True or False questions.</p>

          <p>Can you score 100%?</p>

          <button onClick={() => setStart(true)}>BEGIN</button>
        </div>
      )}
    </div>
  );
}

export default App;
