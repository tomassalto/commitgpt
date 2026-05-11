import { spawnSync } from 'child_process';

const MAX_DIFF_CHARS = 24_000;

export function getStagedDiff(): string {
  const result = spawnSync('git', ['diff', '--staged'], { encoding: 'utf-8' });

  if (result.error || result.status !== 0) {
    throw new Error('Failed to run git. Make sure you are inside a git repository.');
  }

  const diff = result.stdout;

  if (!diff || diff.trim() === '') {
    throw new Error(
      'No staged changes found.\n' +
      'Stage your changes first with: git add <files>  or  git add .'
    );
  }

  if (diff.length > MAX_DIFF_CHARS) {
    console.warn(
      `\nWarning: diff is large (${diff.length} chars). Truncating to ${MAX_DIFF_CHARS} chars ` +
      `to fit within the model context window. Some changes may not be reflected.\n`
    );
    return diff.slice(0, MAX_DIFF_CHARS);
  }

  return diff;
}
