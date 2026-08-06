import { dsaCurriculum, getEditorialGuide, getStudyContent } from "@/content/library";
import type { ProblemContent } from "@/content/problem-content-types";

const questions = new Map(
  dsaCurriculum.flatMap((topic) => topic.questions.map((question) => [question.title, question] as const)),
);

export function getProblemContent(title: string): ProblemContent {
  const question = questions.get(title);
  if (!question) throw new Error(`Missing curriculum question: ${title}`);

  const study = getStudyContent(question);
  const editorial = getEditorialGuide(question);

  return {
    statement: study.statement,
    examples: [
      {
        input: "Use the first sample input from the problem.",
        output: "Produce the corresponding expected result.",
        explanation: `Trace the ${question.title} invariant from the input to the returned value.`,
      },
      {
        input: "Use the smallest valid boundary case.",
        output: "Return the boundary-case result.",
        explanation: "This confirms that initialization and termination handle the minimum input correctly.",
      },
    ],
    constraints: [
      "Use the input bounds and value ranges stated by the original problem.",
      "Return the required result without modifying the input unless the statement permits it.",
    ],
    brute: {
      explanation: editorial.brute,
      drawback: editorial.drawback,
      complexity: editorial.bruteComplexity,
      code: study.bruteCode.Java,
    },
    optimized: {
      explanation: `${editorial.optimized} ${editorial.improvement}`,
      complexity: editorial.optimizedComplexity,
      steps: editorial.codeSteps,
      code: study.optimizedCode.Java,
    },
  };
}
