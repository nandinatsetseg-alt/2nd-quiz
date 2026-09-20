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
      return index === qIndex ? { ...question, [field]: value } : question;
    });
    setQuestions(newQuestion);
  };
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
            <div>
              <input
                placeholder="question"
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CreateQuizPage;
