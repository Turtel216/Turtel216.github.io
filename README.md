# dimitrios-papakonstantinou.com

Personal CV site, built with Astro, TypeScript and Tailwind CSS. Deployed to GitHub Pages.

## Commands

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Start the dev server at `localhost:4321`       |
| `npm run build`   | Type-check and build the static site to `dist` |
| `npm run preview` | Serve the built site locally                   |

## Editing content

- **Profile, about, skills, experience, education, publication, contact**: `src/data/site.ts`.
  Sample copy is marked `PLACEHOLDER`; search for that word to find everything left to replace.
- **Projects**: one Markdown file per project in `src/content/projects/`.

### Adding a project

1. Copy `src/content/projects/_template.md` to a new file, for example `my-project.md`.
   The file name becomes the URL (`/projects/my-project/`).
2. Fill in the frontmatter and the body. The available fields are documented in the template
   and validated by the schema in `src/content.config.ts`.
3. Set `category`:
   - `data` or `web`: shown as a card in the Projects section, with its own page.
   - `compiler`: shown as a row in the compact Compiler engineering section, linking to the
     repository. The Markdown body is not used.

Files starting with an underscore are ignored, and `draft: true` keeps a project out of the build.

### Adding a CV download

Put the file at `public/cv.pdf` (or any PDF in `public/cv/`). The build picks it up automatically and shows a "Download CV" button
in the hero (see `src/data/cv.ts`). If the folder is empty or missing, the button is hidden.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the site on every push to `main`.
In the repository settings, **Pages > Build and deployment > Source** must be set to
**GitHub Actions**. The custom domain is configured through `public/CNAME`.
