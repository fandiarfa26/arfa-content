import { getDb } from '$lib/server/db';
import { contents } from '$lib/server/db/schema';
import { getStatus } from '$lib/content';
import { desc } from 'drizzle-orm';

export async function load() {
	try {
		const db = getDb();
		const all = await db.select().from(contents).orderBy(desc(contents.updatedAt));

		const columns: Record<string, typeof all> = { Idea: [], Ready: [], Planned: [], Published: [] };
		for (const c of all) {
			columns[getStatus(c)].push(c);
		}

		return { columns };
	} catch (e) {
		console.error('Backlog load failed:', e);
		return { columns: { Idea: [], Ready: [], Planned: [], Published: [] } };
	}
}
