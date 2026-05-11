#!/usr/bin/env node

import { program } from 'commander';
import { spawnSync } from 'child_process';
import { getStagedDiff } from './git';
import { generateCommitMessage } from './groq';
import { validateApiKey } from './config';
import { copyToClipboard } from './clipboard';

program
  .name('commitgpt')
  .description('Generate conventional commit messages using Groq AI')
  .version('1.0.0')
  .option('-e, --execute', 'automatically run git commit with the generated message')
  .option('-c, --copy', 'copy the generated message to clipboard')
  .action(async (options: { execute?: boolean; copy?: boolean }) => {
    try {
      validateApiKey();

      const diff = getStagedDiff();

      console.log('\nAnalyzing staged changes...\n');

      const message = await generateCommitMessage(diff);

      console.log('Generated commit message:\n');
      console.log(`  ${message}\n`);

      if (options.copy) {
        await copyToClipboard(message);
        console.log('Copied to clipboard.');
      }

      if (options.execute) {
        const result = spawnSync('git', ['commit', '-m', message], { stdio: 'inherit' });
        if (result.status !== 0) {
          throw new Error('git commit failed.');
        }
      }
    } catch (err: unknown) {
      console.error((err as Error).message);
      process.exit(1);
    }
  });

program.parse(process.argv);
