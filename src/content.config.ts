import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const mindMood = defineCollection({
	// Load Markdown and MDX files in the `src/content/mind-mood/` directory.
	loader: glob({ base: './src/content/mind-mood', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			mood: z.enum(['Hopeful', 'Reflective', 'Grateful', 'Healing', 'Contemplative', 'Vulnerable']),
			tags: z.array(z.string()),
			excerpt: z.string(),
			cover: image().optional(),
			weiboOriginal: z.boolean().optional(),
		}),
});

export const collections = { blog, mindMood };
