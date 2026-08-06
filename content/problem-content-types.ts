export type ProblemExample = {
  input: string;
  output: string;
  explanation: string;
};

export type ProblemApproach = {
  explanation: string;
  complexity: string;
  code: string;
};

export type OptimizedProblemApproach = ProblemApproach & {
  steps: string[];
};

export type ProblemContent = {
  statement: string;
  examples: ProblemExample[];
  constraints: string[];
  brute: ProblemApproach & { drawback: string };
  optimized: OptimizedProblemApproach;
};
