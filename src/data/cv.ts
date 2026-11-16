import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Looks for the CV at build time and returns its public URL.
 * Checked in order: public/cv.pdf, then the first PDF in public/cv/.
 * Returns an empty string when there is none, which hides the download button.
 */
function findCv(): string {
  // Astro always runs from the project root.
  const publicDir = join(process.cwd(), 'public');
  if (existsSync(join(publicDir, 'cv.pdf'))) return '/cv.pdf';

  const dir = join(publicDir, 'cv');
  if (!existsSync(dir)) return '';
  const pdf = readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith('.pdf'))
    .sort()[0];
  return pdf ? `/cv/${encodeURIComponent(pdf)}` : '';
}

export const cvUrl: string = findCv();
