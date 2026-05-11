export function validateApiKey(): string {
  const key = process.env.GROQ_API_KEY;
  if (!key || key.trim() === '') {
    throw new Error(
      'GROQ_API_KEY is not set.\n' +
      'Get your free API key at https://console.groq.com\n' +
      'Then run: export GROQ_API_KEY=your_key_here\n' +
      '  (add to ~/.bashrc or ~/.zshrc to persist, or set it in Windows Environment Variables)'
    );
  }
  return key;
}
