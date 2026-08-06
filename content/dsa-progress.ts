import { slugify } from "@/content/library";

const storageKey = "algocraft-dsa-completed-questions-v1";
export const dsaProgressEvent = "algocraft:dsa-progress-updated";

export function getQuestionProgressKey(topicTitle: string, questionTitle: string) {
  return `${slugify(topicTitle)}::${slugify(questionTitle)}`;
}

export function getCompletedQuestionKeys() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    return new Set(Array.isArray(saved) ? saved.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

export function isQuestionCompleted(topicTitle: string, questionTitle: string) {
  return getCompletedQuestionKeys().has(getQuestionProgressKey(topicTitle, questionTitle));
}

export function toggleQuestionCompletion(topicTitle: string, questionTitle: string) {
  const completed = getCompletedQuestionKeys();
  const key = getQuestionProgressKey(topicTitle, questionTitle);

  if (completed.has(key)) completed.delete(key);
  else completed.add(key);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // Keep the current session responsive even if browser storage is unavailable.
  }

  window.dispatchEvent(new Event(dsaProgressEvent));
  return completed.has(key);
}
