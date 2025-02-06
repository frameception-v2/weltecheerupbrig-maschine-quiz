"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE, QUIZ_QUESTIONS, QUIZ_LIMITATIONS } from "~/lib/constants";

function QuizCard({
  currentQuestion,
  selectedAnswer,
  handleAnswer,
  handleNext,
  progress
}: {
  currentQuestion: number;
  selectedAnswer: number | null;
  handleAnswer: (index: number) => void;
  handleNext: () => void;
  progress: number;
}) {
  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
        <CardDescription>{question.question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-2 bg-gray-100 rounded-full">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="space-y-2">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="w-full text-left justify-start"
              onClick={() => handleAnswer(index)}
            >
              {answer}
            </Button>
          ))}
        </div>

        <Button
          className="w-full mt-4"
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
    if (index === QUIZ_QUESTIONS[currentQuestion].correct) {
      setScore(s => s + 1);
    }
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestion]);

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  // ... keep existing SDK loading logic from original Frame component ...

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      paddingTop: context?.client.safeAreaInsets?.top ?? 0,
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0,
    }}>
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-gray-300">
          {PROJECT_TITLE}
        </h1>

        {!quizCompleted ? (
          <QuizCard
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            handleAnswer={handleAnswer}
            handleNext={handleNext}
            progress={progress}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Complete! 🎉</CardTitle>
              <CardDescription>
                You scored {score}/{QUIZ_QUESTIONS.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-semibold">Current Limitations:</h3>
                <ul className="list-disc pl-4 text-sm space-y-2">
                  {QUIZ_LIMITATIONS.map((limitation, index) => (
                    <li key={index}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
