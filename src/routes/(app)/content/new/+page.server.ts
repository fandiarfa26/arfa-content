import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { contents } from '$lib/server/db/schema';

export function load() {
	return { content: {} as Record<string, never> };
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		if (!title?.trim()) return fail(400, { error: 'Title is required' });

		const values: typeof contents.$inferInsert = { title: title.trim() };
		const fieldKeys = ['category', 'hook', 'problem', 'experience', 'lesson', 'cta', 'caption', 'hashtags', 'uploadDate', 'reelsUrl', 'tiktokUrl'] as const;

		for (const key of fieldKeys) {
			const formKey = key === 'uploadDate' ? 'upload_date' : key === 'reelsUrl' ? 'reels_url' : key === 'tiktokUrl' ? 'tiktok_url' : key;
			const val = data.get(formKey) as string | null;
			if (val?.trim()) (values as any)[key] = val.trim();
		}

		let id: number;
		try {
			const db = getDb();
			const [content] = await db.insert(contents).values(values).returning({ id: contents.id });
			id = content.id;
		} catch (e) {
			console.error('Create content failed:', e);
			return fail(500, { error: 'Gagal menyimpan' });
		}

		redirect(303, `/content/${id}`);
	}
};
