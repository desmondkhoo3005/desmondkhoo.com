# desmondkhoo.com

An independent archive of better judgment.

**Think better. Live better.**

This is an Astro 7 static site with three Markdown content collections:

- `src/content/decisions/` — what I chose
- `src/content/positions/` — what I believe
- `src/content/guides/` — what I have learned

## Publishing a new article

1. Duplicate the closest `.md` file in the appropriate collection.
2. Replace its frontmatter and body.
3. Keep `draft: true` while working.
4. Set `draft: false` and add `pubDate` when ready.
5. Commit to `main`. GitHub Actions builds and deploys automatically.

## Local preview

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

The project deploys to GitHub Pages through `.github/workflows/deploy.yml` and preserves the custom domain through `public/CNAME`.

In GitHub: **Settings → Pages → Source → GitHub Actions**.

## Ownership

The Markdown files are the master copies of the writing. Keep a local clone and a separate backup. GitHub and GitHub Pages are storage and delivery layers, not the only source of truth.
