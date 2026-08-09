import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseFields = {
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  originalPublished: z.coerce.date().optional(),
  sourcePlatform: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  legacyId: z.string().optional()
};

const decisions = defineCollection({
  loader: glob({ base: './src/content/decisions', pattern: '**/*.md' }),
  schema: z.object({
    ...baseFields,
    judgment: z.string(),
    confidence: z.enum(['Low', 'Moderate', 'High']),
    stakes: z.enum(['Low', 'Medium', 'High']),
    reviewDate: z.coerce.date().optional()
  })
});

const positions = defineCollection({
  loader: glob({ base: './src/content/positions', pattern: '**/*.md' }),
  schema: z.object({
    ...baseFields,
    position: z.string(),
    conviction: z.enum(['Low', 'Moderate', 'High'])
  })
});

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
  schema: z.object({
    ...baseFields,
    series: z.string(),
    seriesOrder: z.number().int().positive().optional(),

    // Library catalogue relationship.
    // Optional during migration so existing guides do not break.
    subject: z.string().optional(),
    subjectOrder: z.number().int().positive().optional(),
    label: z.string().optional(),
    readingTime: z.number().int().positive().optional(),

    lastReviewed: z.coerce.date().optional(),
    migrationStatus: z.enum(['rewrite', 'merge', 'republish', 'archive', 'drop']).default('rewrite')
  })
});

const librarySubjects = defineCollection({
  loader: glob({ base: './src/content/library-subjects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    headline: z.string().optional(),
    order: z.number().int().positive(),
    draft: z.boolean().default(true)
  })
});

export const collections = {
  decisions,
  positions,
  guides,
  librarySubjects
};