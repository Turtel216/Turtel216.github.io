import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Projects are Markdown files in src/content/projects/.
 * Files whose name starts with an underscore (such as _template.md) are ignored.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences, shown on the card and at the top of the project page. */
    summary: z.string(),
    /**
     * data     -> main "Projects" section, with its own page
     * web      -> main "Projects" section, with its own page
     * compiler -> compact "Compiler engineering" section, links straight to the repository
     */
    category: z.enum(['data', 'web', 'compiler']),
    /** Technologies, shown as tags. */
    stack: z.array(z.string()).default([]),
    /** Short outcome statements, shown as a list on the card and the project page. */
    highlights: z.array(z.string()).default([]),
    /** Free-form period, for example "2025" or "2024 - 2025". */
    period: z.string().optional(),
    /** Your part in the project, for example "Sole author" or "Data Engineer in a team of four". */
    role: z.string().optional(),
    /** Short state of the project, for example "Early development". Shown as a label. */
    status: z.string().optional(),
    repo: z.url().optional(),
    demo: z.url().optional(),
    /** Set for closed-source work: shows a note instead of a repository link. */
    proprietary: z.boolean().default(false),
    /** Lower numbers are listed first. */
    order: z.number().default(100),
    /** Drafts are left out of the built site. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
