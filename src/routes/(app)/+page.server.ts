import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { contents } from '$lib/server/db/schema';
import { getStatus } from '$lib/content';

export async function load() {
	try {
		const db = getDb();
		const allContents = await db.select().from(contents);

		const counts = { Idea: 0, Ready: 0, Planned: 0, Published: 0 };
		const categoryCounts: Record<string, number> = {};

		for (const c of allContents) {
			counts[getStatus(c)]++;
			const cat = c.category ?? 'other';
			categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
		}

		return { counts, categoryCounts };
	} catch (e) {
		console.error('Dashboard load failed:', e);
		return { counts: { Idea: 0, Ready: 0, Planned: 0, Published: 0 }, categoryCounts: {} };
	}
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		if (!title?.trim()) return fail(400, { error: 'Title is required' });

		let id: number;
		try {
			const db = getDb();
			const [content] = await db.insert(contents).values({ title: title.trim() }).returning({ id: contents.id });
			id = content.id;
		} catch (e) {
			console.error('Create content failed:', e);
			return fail(500, { error: 'Gagal menyimpan' });
		}

		redirect(303, `/content/${id}`);
	}
};
