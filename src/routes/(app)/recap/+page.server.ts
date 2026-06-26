import { getDb } from '$lib/server/db';
import { contents } from '$lib/server/db/schema';
import { getStatus } from '$lib/content';
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

export async function load({ url }) {
	try {
		const db = getDb();
		const weekParam = url.searchParams.get('week');

		const allContents = await db
			.select()
			.from(contents)
			.where(sql`${contents.uploadDate} is not null`)
			.orderBy(desc(contents.uploadDate));

		const today = localDateStr(new Date());
		const rangeStart = getWeekStart(new Date(addDays(today, -28)));
		const rangeEnd = getWeekStart(new Date(addDays(today, 28)));

		const weeks: Array<{ startDate: string; endDate: string }> = [];
		const cursor = new Date(rangeStart);
		const stop = new Date(rangeEnd);

		while (cursor <= stop) {
			const startDate = localDateStr(cursor);
			const end = new Date(cursor);
			end.setDate(cursor.getDate() + 6);
			weeks.push({ startDate, endDate: localDateStr(end) });
			cursor.setDate(cursor.getDate() + 7);
		}

		const selectedWeek = weekParam
			? weeks.find((w) => w.startDate === weekParam) ?? null
			: weeks.find((w) => {
					const now = localDateStr(new Date());
					return now >= w.startDate && now <= w.endDate;
			  }) ?? null;

		let recap: Array<{ title: string; status: string; reelsUrl: string | null; hook: string | null }> = [];

		if (selectedWeek) {
			const weekContents = allContents.filter(
				(c) => c.uploadDate! >= selectedWeek.startDate && c.uploadDate! <= selectedWeek.endDate
			);

			for (const c of weekContents) {
				recap.push({
					title: c.title,
					status: getStatus(c) === 'Published' ? 'PASS' : 'SKIP',
					reelsUrl: c.reelsUrl,
					hook: c.hook
				});
			}
		}

		return { weeks, selectedWeek, recap };
	} catch (e) {
		console.error('Recap load failed:', e);
		return { weeks: [], selectedWeek: null, recap: [] };
	}
}
