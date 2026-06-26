import { pgTable, serial, text, date, integer, timestamp } from 'drizzle-orm/pg-core';

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
	weeklyPlanId: integer('weekly_plan_id'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const weeklyPlans = pgTable('weekly_plans', {
	id: serial('id').primaryKey(),
	startDate: date('start_date').notNull(),
	endDate: date('end_date').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
