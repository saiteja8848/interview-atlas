"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  useEffect(() => { const saved = (localStorage.getItem("algocraft-mode") as "dark" | "light") || "dark"; setMode(saved); document.documentElement.dataset.mode = saved; }, []);
  const toggle = () => { const next = mode === "dark" ? "light" : "dark"; setMode(next); document.documentElement.dataset.mode = next; localStorage.setItem("algocraft-mode", next); };
  return <button onClick={toggle} aria-label={`Switch to ${mode === "dark" ? "day" : "night"} mode`} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:bg-white/[.07] hover:text-white">{mode === "dark" ? <Sun size={15}/> : <Moon size={15}/>}</button>;
}
