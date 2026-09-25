"use client";

import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";

const CreateQuizPage = () => {
  const supabase = supabaseClient();
  const [quiz, setQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      points: 1000,
      answers: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);
  const handleQuizName = (event) => setQuiz(event.target.value);
  const createQuiz = async () => {
    const response = await supabase.from("quizes").insert({ quizName: quiz });
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        point: 1000,
        answers: ["", "", "", ""],
        correctIndex: 0,
      },
    ]);
  };
  const updateQuestion = (qIndex, field, value) => {
    const newQuestion = questions.map((question, index) => {
      const finalValue = field === "points" ? Number(value) : value;
      return index === qIndex ? { ...question, [field]: value } : question;
    });
    setQuestions(newQuestion);
  };
  console.log(questions)
   return (
    <div>
      <input
        placeholder="Quiz name"
        value={quiz}
        onChange={(e) => handleQuizName(e)}
      />
      <button onClick={createQuiz}>Create</button>
      <div>
        {questions.map((question, index) => {
          return (
            <div key={index}>
              <input
                placeholder="question"
                onChange={(e) =>
                  updateQuestion(index, 'question', e.target.value)
                }
              />
              <input
                placeholder="point"
                type="number"
                onChange={(e) =>
                  updateQuestion(index, 'point', Number(e.target.value))
                }
              />
              <div>
                {question.answers.map((answer, answerIndex) => {
                  return (
                    <div >
                      <input type="checkbox"
                      checked={question.correctIndex === answerIndex}
                       onChange={(e) =>
                  updateQuestion(index, 'correctIndex', answerIndex)
                }
                />
                      <input placeholder="answer..."/>
                    </div>
                  )
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={addQuestion}>
        Add Question
      </button>
    </div>
  );
};
export default CreateQuizPage;
