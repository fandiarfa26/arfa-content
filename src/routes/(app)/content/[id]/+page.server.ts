import { error, fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { contents } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { safeId } from '$lib/server/db/helpers';

export async function load({ params }) {
	const id = safeId(params.id);

	try {
		const db = getDb();
		const [content] = await db.select().from(contents).where(eq(contents.id, id));

		if (!content) error(404, 'Not found');
		return { content };
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		console.error('Content load failed:', e);
		error(500, 'Gagal memuat konten');
	}
}

export const actions = {
	update: async ({ request, params }) => {
		const id = safeId(params.id);
		const data = await request.formData();

		const fields = {
			title: data.get('title') as string,
			category: (data.get('category') as string) || null,
			hook: (data.get('hook') as string) || null,
			problem: (data.get('problem') as string) || null,
			experience: (data.get('experience') as string) || null,
			lesson: (data.get('lesson') as string) || null,
			exampleScript: (data.get('example_script') as string) || null,
			cta: (data.get('cta') as string) || null,
			caption: (data.get('caption') as string) || null,
			hashtags: (data.get('hashtags') as string) || null,
			uploadDate: (data.get('upload_date') as string) || null,
			reelsUrl: (data.get('reels_url') as string) || null,
			tiktokUrl: (data.get('tiktok_url') as string) || null
		};

		if (!fields.title?.trim()) return fail(400, { error: 'Title is required' });

		try {
			const db = getDb();
			await db.update(contents).set({ ...fields, updatedAt: new Date() }).where(eq(contents.id, id));
		} catch (e) {
			console.error('Update content failed:', e);
			return fail(500, { error: 'Gagal menyimpan' });
		}

		redirect(303, '/backlog');
	},

	delete: async ({ params }) => {
		const id = safeId(params.id);

		try {
			const db = getDb();
			await db.delete(contents).where(eq(contents.id, id));
		} catch (e) {
			console.error('Delete content failed:', e);
			return fail(500, { error: 'Gagal menghapus' });
		}

		redirect(303, '/backlog');
	}
};
