import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/app";
import "@/app/globals.css";

document.documentElement.dataset.mode = localStorage.getItem("algocraft-mode") || "dark";
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
