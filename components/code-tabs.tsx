import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { CodeLanguage } from "@/content/library";

const javaTokens = /("(?:\\.|[^"\\])*")|(\/\/.*$)|(\b(?:abstract|boolean|break|byte|case|catch|char|class|continue|default|do|double|else|enum|extends|false|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|null|package|private|protected|public|return|short|static|super|switch|this|throw|throws|true|try|void|while)\b)|(\b(?:ArrayDeque|ArrayList|Arrays|Collections|Deque|HashMap|HashSet|Integer|List|Map|Math|PriorityQueue|Queue|Set|String|StringBuilder|TreeMap|TreeNode|TreeSet)\b)|(\b\d+(?:\.\d+)?\b)/g;

function highlightJava(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = javaTokens.exec(line)) !== null) {
    if (match.index > cursor) nodes.push(line.slice(cursor, match.index));
    const token = match[0];
    const className = match[1]
      ? "code-token-string"
      : match[2]
        ? "code-token-comment"
        : match[3]
          ? "code-token-keyword"
          : match[4]
            ? "code-token-type"
            : "code-token-number";
    nodes.push(<span className={className} key={`${match.index}-${token}`}>{token}</span>);
    cursor = match.index + token.length;
  }
  if (cursor < line.length) nodes.push(line.slice(cursor));
  return nodes;
}

export function CodeTabs({ code }: { code: Record<CodeLanguage, string> }) {
  const [copied, setCopied] = useState(false);
  const javaCode = code.Java.replace(/^(?:\s*\/\/[^\n]*\n)+/, "").trimStart();
  const copy = async () => {
    await navigator.clipboard.writeText(javaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-editor">
      <div className="flex items-center justify-between border-b border-white/[.08] bg-white/[.025] px-4 py-2.5">
        <span className="inline-flex items-center gap-2 rounded-md bg-[#2c2c31] px-2.5 py-1.5 text-xs font-semibold text-zinc-100">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Java
        </span>
        <button onClick={copy} className="rounded-md p-1.5 text-zinc-500 transition hover:bg-white/[.08] hover:text-white" aria-label="Copy Java solution">
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
      <pre className="code-editor-scroll" aria-label="Java solution"><code className="code-editor-code">
        {javaCode.split("\n").map((line, index) => (
          <span className="code-editor-line" key={`${index}-${line}`}>
            <span className="code-editor-gutter" aria-hidden="true">{index + 1}</span>
            <span className="code-editor-content">{highlightJava(line)}</span>
          </span>
        ))}
      </code></pre>
    </div>
  );
}
