import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import ts from "typescript";

const workspace = process.cwd();
const libraryPath = path.join(workspace, "content", "library.ts");
const repositoryPath = path.join(workspace, "content", "repository-solutions.ts");
const outputPath = path.join(workspace, "content", "video-library.ts");
const python = "C:/Users/saite/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const ytDlpRoot = path.join(process.env.TEMP || "C:/Temp", "interview-atlas-video-tools");
const execFileAsync = promisify(execFile);

const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const stringValue = (node) => node && ts.isStringLiteral(node) ? node.text : undefined;
const property = (node, name) => node.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText() === name);

const manualQuestions = new Map();
const librarySource = fs.readFileSync(libraryPath, "utf8");
const sourceFile = ts.createSourceFile(libraryPath, librarySource, ts.ScriptTarget.Latest, true);
const visit = (node) => {
  if (ts.isObjectLiteralExpression(node)) {
    const title = stringValue(property(node, "title")?.initializer);
    const difficulty = stringValue(property(node, "difficulty")?.initializer);
    const description = stringValue(property(node, "description")?.initializer);
    const tags = property(node, "tags")?.initializer;
    if (title && difficulty && description && tags && ts.isArrayLiteralExpression(tags)) {
      const topic = stringValue(tags.elements[0]) || "Arrays";
      manualQuestions.set(slugify(title), { title, slug: slugify(title), topic });
    }
  }
  ts.forEachChild(node, visit);
};
visit(sourceFile);

const repositoryText = fs.readFileSync(repositoryPath, "utf8");
const repositoryJson = repositoryText.match(/export const repositoryProblems: RepositoryProblem\[\] = ([\s\S]*?);\nexport const repositorySolutions/);
if (!repositoryJson) throw new Error("Could not read the repository problem catalogue.");
const repositoryQuestions = JSON.parse(repositoryJson[1]);
const questions = new Map(manualQuestions);
for (const item of repositoryQuestions) questions.set(item.slug, { title: item.title, slug: item.slug, topic: item.topic, sourceCode: item.sourceCode });

const featuredIds = {
  "two-sum": { id: "KLlXCFG5TnA", channel: "NeetCode" },
  "valid-parentheses": { id: "WTzjTskDFMg", channel: "NeetCode" },
  "reverse-linked-list": { id: "G0_I8j4G-j0", channel: "NeetCode" },
  "binary-search": { id: "s4DPM8ct1pI", channel: "NeetCode" },
  "maximum-depth-of-binary-tree": { id: "hTM3phVI6YQ", channel: "NeetCode" },
};

const youtubeId = (url) => {
  const matched = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
  return matched?.[1];
};
const videoFromSource = (sourceCode = "") => {
  const match = sourceCode.match(/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s"\\]+/i);
  return match ? youtubeId(match[0]) : undefined;
};
const searchYoutube = async (title) => {
  try {
    const { stdout } = await execFileAsync(
      python,
      ["-m", "yt_dlp", "--flat-playlist", "--no-warnings", "--print", "%(id)s" + String.fromCharCode(9) + "%(title)s" + String.fromCharCode(9) + "%(channel)s", `ytsearch1:${title} LeetCode solution`],
      {
        cwd: workspace,
        encoding: "utf8",
        timeout: 30000,
        env: { ...process.env, PYTHONPATH: ytDlpRoot },
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    const result = stdout.trim();
    const [id, videoTitle, channel] = result.split("\t");
    return /^[A-Za-z0-9_-]{11}$/.test(id || "") ? { id, title: videoTitle || title, channel: channel || "YouTube" } : undefined;
  } catch (error) {
    console.error(`Lookup failed for ${title}:`, error.stderr || error.message);
    return undefined;
  }
};

const directVideos = {};
const queued = [];
for (const question of questions.values()) {
  const featured = featuredIds[question.slug];
  const sourceId = videoFromSource(question.sourceCode);
  if (featured) directVideos[question.slug] = { ...featured, title: question.title };
  else if (sourceId) directVideos[question.slug] = { id: sourceId, title: question.title, channel: "Reference video" };
  else queued.push(question);
}

const lookupLimit = Number(process.env.VIDEO_LOOKUP_LIMIT || queued.length);
const lookupQueue = queued.slice(0, lookupLimit);
console.log(`Using ${Object.keys(directVideos).length} direct videos from the existing catalogue. Looking up ${lookupQueue.length} remaining problems...`);
let nextIndex = 0;
const lookupWorker = async () => {
  while (nextIndex < lookupQueue.length) {
    const index = nextIndex++;
    const question = lookupQueue[index];
    const result = await searchYoutube(question.title);
    if (result) directVideos[question.slug] = result;
    console.log(`[${index + 1}/${lookupQueue.length}] ${question.title}: ${result ? result.id : "not found"}`);
  }
};
await Promise.all(Array.from({ length: 4 }, lookupWorker));

const moduleText = `// Generated from direct YouTube search results. Re-run scripts/generate-video-library.mjs to refresh.\nexport type ProblemVideo = { id: string; title: string; channel: string };\nexport const problemVideos: Record<string, ProblemVideo> = ${JSON.stringify(directVideos, null, 2)};\n`;
fs.writeFileSync(outputPath, moduleText, "utf8");
console.log(`Wrote ${Object.keys(directVideos).length} direct videos to ${outputPath}`);
