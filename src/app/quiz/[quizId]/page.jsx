"use client";

import { useParams } from "next/navigation";
import { supabaseClient } from "../../../../lib/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, HelpCircle, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Page = () => {
  const params = useParams();
  const supabase = supabaseClient();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  useEffect(() => {
    const getQuizQuestion = async () => {
      const response = await supabase
        .from("quiz_question")
        .select("*, questions_answers(*)")
        .eq("quizId", params.quizId);
      setQuestions(response.data);
    };
    getQuizQuestion();
  }, [params.quizId]);

  const handleAnswer = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId})
  }
  const answer = () => {
    let totalPoint = 0;
    let myScore = 0;
    for (let i = 0; i < questions.length; i++) {
      totalPoint = totalPoint + questions[i].point;
      const correctAnswer = questions[i].questions_answers.find((answer) => {
        return answer.isCorrect;
      });
      console.log(correctAnswer);
      if (answers[correctAnswer.questionId] === correctAnswer.id) {
        myScore = myScore + questions[i].point;
      }
    }
    setResult({ totalPoint, myScore});
  };
  console.log(questions, "question");

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <Sparkles className="h-4 w-4" />
            Quiz Details
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Quiz Questions
          </h1>
          <p className="text-slate-500 text-sm">
            Review questions, points, and answer options for this quiz.
          </p>
        </div>
        {!questions ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="border-slate-200 p-6 space-y-4 animate-pulse bg-white">
                <div className="h-6 w-3/4 rounded-md bg-slate-200" />
                <div className="h-4 w-1/4 rounded-md bg-slate-200" />
                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-10 rounded-md bg-slate-100" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-200 bg-white p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-slate-100 rounded-full text-slate-400">
                <HelpCircle className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">No questions found</h3>
            <p className="text-slate-500 text-sm mt-1">
              There are no questions attached to this quiz ID.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {questions.map((question, qIndex) => {
              return (
                <Card
                  key={question.id}
                  className="border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md bg-white overflow-hidden"
                >
                  <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                          {qIndex + 1}
                        </span>
                        <CardTitle className="text-lg font-semibold text-slate-900 leading-snug">
                          {question.question || "Untitled Question"}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="shrink-0 gap-1.5 bg-amber-50 text-amber-700 border-amber-200/60 font-semibold px-3 py-1">
                        <Trophy className="h-3.5 w-3.5 text-amber-500" />
                        {question.point} pts
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Answer Options
                      </span>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {question.questions_answers?.map((answer, index) => {
                          return (
                            <div
                              key={answer.id ?? index}
                              onClick={() => handleAnswer(question.id, index)}
                              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium text-slate-700"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-500 uppercase">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="truncate">{answer.answer}</span>
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
        )}
      <Button onClick={answer}>Answer</Button>
      </div>
    </div>
  );
};

export default Page;