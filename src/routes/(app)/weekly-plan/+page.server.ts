import { getDb } from '$lib/server/db';
import { contents } from '$lib/server/db/schema';
import { desc, sql } from 'drizzle-orm';

function localDateStr(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

function getWeekStart(d: Date): string {
	const start = new Date(d);
	start.setDate(d.getDate() - d.getDay());
	return localDateStr(start);
}

function addDays(dateStr: string, n: number): string {
	const d = new Date(dateStr);
	d.setDate(d.getDate() + n);
	return localDateStr(d);
}

export async function load() {
	try {
		const db = getDb();
		const allContents = await db
			.select()
			.from(contents)
			.where(sql`${contents.uploadDate} is not null`)
			.orderBy(desc(contents.uploadDate));

		const today = localDateStr(new Date());
		const rangeStart = getWeekStart(new Date(today));
		const rangeEnd = getWeekStart(new Date(addDays(today, 28)));

		const weeks: Array<{ startDate: string; endDate: string; items: typeof allContents }> = [];
		const cursor = new Date(rangeStart);
		const stop = new Date(rangeEnd);

		while (cursor <= stop) {
			const startDate = localDateStr(cursor);
			const end = new Date(cursor);
			end.setDate(cursor.getDate() + 6);
			const endDate = localDateStr(end);

			const items = allContents.filter((c) => c.uploadDate! >= startDate && c.uploadDate! <= endDate);
			weeks.push({ startDate, endDate, items });

			cursor.setDate(cursor.getDate() + 7);
		}

		return { weeks };
	} catch (e) {
		console.error('Weekly plan load failed:', e);
		return { weeks: [] };
	}
}
