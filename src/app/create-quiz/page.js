"use client";

import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, HelpCircle, CheckCircle2, Sparkles, Trophy } from "lucide-react";

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
      const finalValue = field === "point" ? Number(value) : value;
      return qIndex === index ? { ...question, [field]: finalValue } : question;
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

    const quizId = response.data.id;

    for (let i = 0; i < questions.length; i++) {
      const response = await supabase
        .from("quiz_question")
        .insert({
          question: questions[i].question,
          quizId: quizId,
          point: questions[i].point,
        })
        .select("*");
      const questionId = response.data[0].id;
      for (let j = 0; j < questions[i].answers.length; j++) {
        await supabase.from("questions_answers").insert({
          questionId: questionId,
          answer: questions[i].answers[j],
          isCorrect: questions[i].correctIndex === j,
        });
      }
      console.log(response, "question");
    }
  };

  console.log(questions);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header and Quiz Info */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5 flex-1 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-medium text-sm mb-1">
              <Sparkles className="h-4 w-4" />
              Quiz Builder
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create New Quiz
            </h1>
            <p className="text-slate-500 text-sm">
              Design your questions, assign points, and set correct answers
              below.
            </p>
          </div>

          <Button
            onClick={createQuiz}
            size="lg"
            className="shadow-sm font-semibold px-6"
          >
            Create Quiz
          </Button>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label
                htmlFor="quiz-name"
                className="text-base font-semibold text-slate-800"
              >
                Quiz Title
              </Label>
              <Input
                id="quiz-name"
                placeholder="e.g. World History Trivia, JavaScript Fundamentals..."
                value={quiz}
                onChange={(e) => handleQuizName(e)}
                className="h-11 text-base bg-white border-slate-200 focus-visible:ring-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            return (
              <Card
                key={index}
                className="border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md bg-white"
              >
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      Question {index + 1}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    {/* Question Text Field */}
                    <div className="space-y-2 md:col-span-3">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                        Question Prompt
                      </Label>
                      <Input
                        placeholder="What is the capital of France?"
                        value={question.question ?? ""}
                        onChange={(e) =>
                          updateQuestion(index, "question", e.target.value)
                        }
                        className="border-slate-200 bg-white"
                      />
                    </div>

                    {/* Points Field */}
                    <div className="space-y-2 md:col-span-1">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-slate-400" />
                        Points
                      </Label>
                      <Input
                        placeholder="point"
                        type="number"
                        value={question.point ?? ""}
                        onChange={(e) =>
                          updateQuestion(index, "point", e.target.value)
                        }
                        className="border-slate-200 bg-white"
                      />
                    </div>
                  </div>

                  {/* Answers Section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                        Answer Options
                      </Label>
                      <span className="text-xs text-slate-400 font-normal">
                        Select the checkbox to mark the correct answer
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {question.answers.map((answer, answerIndex) => {
                        const isSelected =
                          question.correctIndex === answerIndex;
                        return (
                          <div
                            key={answerIndex}
                            className={`flex items-center gap-3 rounded-lg border p-2.5 transition-colors ${
                              isSelected
                                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                                : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                            }`}
                          >
                            <Checkbox
                              id={`q-${index}-a-${answerIndex}`}
                              checked={isSelected}
                              onCheckedChange={() =>
                                updateQuestion(
                                  index,
                                  "correctIndex",
                                  answerIndex,
                                )
                              }
                              className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <Input
                              placeholder={`Option ${answerIndex + 1}`}
                              value={answer ?? ""}
                              onChange={(e) =>
                                updateAnswers(
                                  index,
                                  answerIndex,
                                  e.target.value,
                                )
                              }
                              className="border-slate-200 bg-white focus-visible:ring-1"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add Question Button */}
        <div className="pt-2">
          <Button
            onClick={addQuestion}
            variant="outline"
            className="w-full border-dashed border-2 border-slate-300 bg-transparent py-6 text-slate-600 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
