"use client";

import { useState } from "react";

type Question = {
  id: number;
  title: string;
  prompt: string;
  isGood: boolean;
  whyGood: string;
  whyBad: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Weak AI prompt",
    prompt: "Write about Artificial Intelligence.",
    isGood: false,
    whyGood:
      "A stronger prompt would pick a focus, audience, tone, length, and maybe ask for step-by-step reasoning.",
    whyBad:
      "This is bad because it has no goal, no context, no audience, and no format. The AI has to guess everything.",
  },
  {
    id: 2,
    title: "Improved AI study prompt",
    prompt:
      "Write a 100-word paragraph that explains to university students how Artificial Intelligence can help them study more efficiently, using a friendly and simple tone.",
    isGood: true,
    whyGood:
      "This is good because it sets a clear goal, audience, tone, and word limit, and asks for a specific format (a short paragraph).",
    whyBad:
      "Calling this bad would ignore that it already includes goal, audience, tone, and constraints.",
  },
  {
    id: 3,
    title: "Vague coding help",
    prompt: "Fix my code.",
    isGood: false,
    whyGood:
      "A better prompt would share the code, language, error messages, and ask for step-by-step explanation.",
    whyBad:
      "This is bad because there is no context, no code snippet, no error, and no clear task beyond a generic 'fix it'.",
  },
];

type Phase = "intro" | "quiz" | "results";

type Answer = {
  questionId: number;
  choice: "good" | "bad";
  isCorrect: boolean;
};

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idea, setIdea] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const current = QUESTIONS[index];
  const score = answers.filter((a) => a.isCorrect).length;

  const startQuiz = () => {
    setPhase("quiz");
    setIndex(0);
    setAnswers([]);
  };

  const recordAnswer = (choice: "good" | "bad") => {
    const isCorrect = (current.isGood && choice === "good") || (!current.isGood && choice === "bad");
    setAnswers((prev) => [...prev, { questionId: current.id, choice, isCorrect }]);
    if (index === QUESTIONS.length - 1) {
      setPhase("results");
    } else {
      setIndex((i) => i + 1);
    }
  };

  const redo = () => {
    setPhase("intro");
    setIndex(0);
    setAnswers([]);
  };

  const explanationFor = (q: Question, choice: "good" | "bad") => {
    if (q.isGood) {
      return choice === "good" ? q.whyGood : q.whyBad;
    }
    return choice === "bad" ? q.whyBad : q.whyGood;
  };

  return (
    <div className="min-h-screen bg-[#f7f3ff] flex items-center justify-center px-4 py-10">
      <main className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <section className="md:w-1/2 bg-white px-8 py-8 md:px-10 md:py-12 border-r border-violet-100 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-16 w-1.5 bg-violet-500 rounded-full" />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-violet-800 leading-tight">
                GOOD vs BAD
                <br />
                PROMPT QUIZ
              </h1>
            </div>
            <p className="text-sm md:text-base text-slate-600 mb-4">
              Use the quiz to spot weak prompts and turn them into clear, structured instructions.
            </p>
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-4">
              <h2 className="text-xs font-semibold tracking-wide text-violet-600 uppercase mb-2">
                Key elements of a good prompt
              </h2>
              <ul className="text-xs md:text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>Context &amp; goal</li>
                <li>Clear task &amp; audience</li>
                <li>Format (list, table, paragraph)</li>
                <li>Tone and constraints (length, level)</li>
                <li>Examples or step-by-step instructions</li>
              </ul>
            </div>
            <div className="bg-slate-900 text-slate-50 rounded-2xl px-4 py-3 text-xs md:text-sm">
              The clearer your instructions are, the better the AI can stay on-topic and match your style.
            </div>
          </div>

          {phase === "intro" && (
            <div className="mt-4">
              <label className="block text-xs font-semibold tracking-wide text-slate-500 uppercase mb-2">
                Your prompt idea (optional)
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="E.g. Explain how AI can help me revise for exams in a friendly way."
                className="w-full h-24 resize-none rounded-2xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <button
                onClick={startQuiz}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-violet-700 transition-colors"
              >
                Start quiz
              </button>
            </div>
          )}
        </section>

        <section className="md:w-1/2 bg-gradient-to-b from-[#f7f3ff] via-white to-[#f7f3ff] px-8 py-8 md:px-10 md:py-12 flex flex-col gap-6">
          {phase === "intro" && (
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-slate-600 mb-3">
                When the quiz starts you&apos;ll see a series of prompts. For each one, decide if it&apos;s a <span className="font-semibold text-violet-700">good</span> or <span className="font-semibold text-pink-700">bad</span> prompt.
              </p>
              <p className="text-sm text-slate-600">
                At the end you&apos;ll get a score plus explanations for anything you missed.
              </p>
            </div>
          )}

          {phase === "quiz" && (
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-violet-600 uppercase mb-2">
                  Question {index + 1} of {QUESTIONS.length}
                </p>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">{current.title}</h2>
                <div className="bg-white border border-violet-100 rounded-2xl p-4 text-sm text-slate-800 shadow-sm">
                  {current.prompt}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => recordAnswer("good")}
                  className="flex-1 rounded-full border border-emerald-500 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  Good prompt
                </button>
                <button
                  onClick={() => recordAnswer("bad")}
                  className="flex-1 rounded-full border border-rose-500 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                >
                  Bad prompt
                </button>
              </div>
            </div>
          )}

          {phase === "results" && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-white border border-violet-100 rounded-2xl p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-violet-600 uppercase mb-1">
                  Your score
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {score} / {QUESTIONS.length}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  {score === QUESTIONS.length
                    ? "Nice work  you can already spot strong prompts."
                    : "Review the explanations below to see how to sharpen your prompts."}
                </p>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-80 pr-1">
                {answers.map((a) => {
                  const q = QUESTIONS.find((q) => q.id === a.questionId)!;
                  const correctLabel = q.isGood ? "Good" : "Bad";
                  const explanation = explanationFor(q, a.choice);
                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-3 text-xs md:text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-900">{q.title}</p>
                        <span
                          className={
                            a.isCorrect
                              ? "text-[11px] font-semibold text-emerald-600"
                              : "text-[11px] font-semibold text-rose-600"
                          }
                        >
                          {a.isCorrect ? "Correct" : "Review"}
                        </span>
                      </div>
                      <p className="text-slate-700 mb-1">{q.prompt}</p>
                      <p className="text-slate-600 mb-1">
                        You answered: <span className="font-semibold">{a.choice === "good" ? "Good" : "Bad"}</span> prompt. Correct answer: <span className="font-semibold">{correctLabel}</span> prompt.
                      </p>
                      <p className="text-slate-600">{explanation}</p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={redo}
                className="self-start mt-1 inline-flex items-center justify-center rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-violet-700 transition-colors"
              >
                Redo quiz
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
