# Upload instructions

This package migrates the current plain HTML/CSS site to Astro.

## 1. Back up the current repository

In GitHub, download a ZIP of the existing repository before changing anything.

## 2. Upload the Astro project alongside the old files

Upload every file and folder from this package to the repository root, preserving the directory structure.

For the first commit, **do not delete** the old root files yet:

- `index.html`
- `styles.css`
- `contact.html`
- the existing root `CNAME`

They do not interfere with Astro, and leaving them temporarily reduces the risk of downtime while the first Astro build runs.

## 3. Change GitHub Pages to Actions

After the Astro files are committed:

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open **Actions**.
4. Run or re-run `Deploy Astro to GitHub Pages`.
5. Wait until both build and deploy are green.
6. Test `https://desmondkhoo.com` and `https://www.desmondkhoo.com`.

## 4. Remove obsolete root files

Only after the Astro site is live, delete the old root:

- `index.html`
- `styles.css`
- `contact.html`
- root `CNAME`

Keep `public/CNAME`; Astro deploys that file with the built site.

Do not change the Cloudflare DNS records. They already point correctly to GitHub Pages.
