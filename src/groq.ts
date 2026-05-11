import Groq from 'groq-sdk';
import { validateApiKey } from './config';

const MODEL = 'llama-3.1-8b-instant';

function buildPrompt(diff: string): string {
  return `You are an expert software engineer. Analyze the following git diff and generate a single conventional commit message.

RULES:
- Use the Conventional Commits specification: <type>(<scope>): <short description>
- Type must be one of: feat, fix, docs, style, refactor, perf, test, chore, ci, build
- Scope is optional but strongly preferred (e.g., the module, file, or component name)
- Short description: imperative mood, lowercase, no period, max 72 characters total
- Output ONLY the commit message line — no explanation, markdown, quotes, or code blocks

EXAMPLES:
feat(auth): add JWT refresh token rotation
fix(api): handle null response from payment gateway
refactor(db): extract connection pooling into separate module
docs(readme): add installation instructions for Windows

GIT DIFF:
${diff}

COMMIT MESSAGE:`;
}

export async function generateCommitMessage(diff: string): Promise<string> {
  const apiKey = validateApiKey();
  const client = new Groq({ apiKey });

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: buildPrompt(diff) }],
    temperature: 0.3,
    max_tokens: 100,
    stop: ['\n', '\r'],
  });

  const message = response.choices[0]?.message?.content?.trim();

  if (!message) {
    throw new Error('Groq returned an empty response. Please try again.');
  }

  return message.replace(/^["'`]|["'`]$/g, '');
}
