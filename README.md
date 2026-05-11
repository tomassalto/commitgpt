# commitgpt

AI-powered conventional commit message generator. Analyzes your staged changes and generates a commit message using [Groq](https://console.groq.com) (free, no credit card required).

```bash
git add .
commitgpt
# → feat(auth): add JWT refresh token rotation
```

## Install

```bash
npm install -g commitgpt
```

## Setup

Get a free API key at [console.groq.com](https://console.groq.com), then:

```bash
# macOS / Linux
export GROQ_API_KEY=your_key_here
# Add to ~/.bashrc or ~/.zshrc to persist

# Windows (PowerShell)
$env:GROQ_API_KEY = "your_key_here"
# Or set via System Environment Variables for persistence
```

## Usage

```bash
# Generate commit message and print it
commitgpt

# Generate and copy to clipboard
commitgpt --copy

# Generate and run git commit automatically
commitgpt --execute
```

## How it works

1. Reads `git diff --staged`
2. Sends the diff to Groq (llama3-8b-8192) with a Conventional Commits prompt
3. Prints (or commits) the result

Output follows the [Conventional Commits](https://www.conventionalcommits.org/) spec:
```
<type>(<scope>): <description>

feat(auth): add OAuth2 login support
fix(api): handle empty response from payment gateway
refactor(db): extract query builder into service layer
```

## Tech stack

- TypeScript (strict mode)
- [Commander.js](https://github.com/tj/commander.js) — CLI framework
- [Groq SDK](https://github.com/groq/groq-typescript) — AI inference
- GitHub Actions — CI/CD + npm publish

## License

MIT
