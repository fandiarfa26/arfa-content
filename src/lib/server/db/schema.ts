import { pgTable, serial, text, date, timestamp } from 'drizzle-orm/pg-core';

export const contents = pgTable('contents', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	category: text('category'),
	hook: text('hook'),
	problem: text('problem'),
	experience: text('experience'),
	lesson: text('lesson'),
	cta: text('cta'),
	caption: text('caption'),
	hashtags: text('hashtags'),
	uploadDate: date('upload_date'),
	reelsUrl: text('reels_url'),
	tiktokUrl: text('tiktok_url'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
