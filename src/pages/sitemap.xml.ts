import { getCollection } from 'astro:content';

export async function GET() {
  const base = 'https://desmondkhoo.com';
  const staticPaths = ['/', '/decisions/', '/positions/', '/library/', '/about/', '/contact/'];

  const decisions = await getCollection('decisions', ({ data }) => !data.draft);
  const positions = await getCollection('positions', ({ data }) => !data.draft);
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const librarySubjects = await getCollection(
    'librarySubjects',
    ({ data }) => !data.draft
  );

  const publishedSubjectIds = new Set(
    guides
      .map((guide) => guide.data.subject)
      .filter((subject): subject is string => Boolean(subject))
  );

  const publishedLibrarySubjects = librarySubjects.filter(
    (subject) => publishedSubjectIds.has(subject.id)
  );

  const urls = [
    ...staticPaths.map((path) => ({ loc: `${base}${path}` })),

    ...decisions.map((entry) => ({
      loc: `${base}/decisions/${entry.id}/`,
      lastmod: (entry.data.updatedDate ?? entry.data.pubDate)?.toISOString()
    })),

    ...positions.map((entry) => ({
      loc: `${base}/positions/${entry.id}/`,
      lastmod: (entry.data.updatedDate ?? entry.data.pubDate)?.toISOString()
    })),

    ...publishedLibrarySubjects.map((subject) => ({
      loc: `${base}/library/${subject.id}/`
    })),

    ...guides.map((entry) => ({
      loc: `${base}/library/${entry.id}/`,
      lastmod: (
        entry.data.lastReviewed ??
        entry.data.updatedDate ??
        entry.data.pubDate
      )?.toISOString()
    }))
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        ({ loc, lastmod }) =>
          `  <url><loc>${loc}</loc>${
            lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
          }</url>`
      )
      .join('\n') +
    `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}