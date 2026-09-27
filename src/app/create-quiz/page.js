"use client";

import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";

const CreateQuizPage = () => {
  const supabase = supabaseClient();
  const [quiz, setQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      point: 1000,
      answers: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);
  const handleQuizName = (event) => setQuiz(event.target.value);
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
  const updateAnswers = (questionIndex, answerIndex, value) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return {
          ...question,
          answers: question.answers.map((answer, aIndex) => {
            if (aIndex === answerIndex) {
              return value;
            } else {
              return answer;
            }
          }),
        };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  };
  const createQuiz = async () => {
    const response = await supabase
      .from("quizes")
      .insert({ quizName: quiz })
      .select("*")
      .single();
    console.log(response);
  };
  console.log(questions);
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
                  updateQuestion(index, "question", e.target.value)
                }
              />
              <input
                placeholder="point"
                type="number"
                onChange={(e) =>
                  updateQuestion(index, "point", Number(e.target.value))
                }
              />
              <div>
                {question.answers.map((answer, answerIndex) => {
                  return (
                    <div key={answerIndex}>
                      <input
                        type="checkbox"
                        checked={question.correctIndex === answerIndex}
                        onChange={(e) =>
                          updateQuestion(index, "correctIndex", answerIndex)
                        }
                      />
                      <input
                        placeholder="answer..."
                        value={answer}
                        onChange={(e) =>
                          updateAnswers(index, answerIndex, e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
};
export default CreateQuizPage;
