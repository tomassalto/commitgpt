import clipboardy from 'clipboardy';

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await clipboardy.write(text);
  } catch {
    throw new Error(
      'Failed to copy to clipboard.\n' +
      'On Linux, install xclip: sudo apt install xclip'
    );
  }
}
