"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowRight, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const supabase = supabaseClient();
  const [quiz, setQuiz] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getQuiz = async () => {
      const response = await supabase.from("quizes").select("*");
      setQuiz(response.data);
    };
    getQuiz();
  }, []);

  console.log(quiz);
  const handleRedirect = (quizId) => {
    router.push(`/quiz/${quizId}`);
  };
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <Sparkles className="h-4 w-4" />
            Quiz Library
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Available Quizzes
          </h1>
          <p className="text-slate-500 text-sm">
            Browse and manage all created quizzes from your dashboard.
          </p>
        </div>
        {!quiz ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-slate-200 p-6 space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </Card>
            ))}
          </div>
        ) : quiz.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-200 bg-white p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-slate-100 rounded-full text-slate-400">
                <HelpCircle className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No quizzes found
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              There are currently no quizzes available in the database.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quiz.map((item) => {
              return (
                <Card
                  key={item.id}
                  onClick={() => handleRedirect(item.id)}
                  className="group border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-md flex flex-col justify-between"
                >
                  <CardHeader className="pt-6 pb-4">
                    <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                      {item.quizName}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="pt-0 pb-6 border-t border-slate-100/60 mt-auto flex items-center justify-between text-slate-500">
                    <span className="text-xs font-medium text-slate-400">
                      Quiz ID: {item.id}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs font-semibold hover:text-primary"
                    >
                      View
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
