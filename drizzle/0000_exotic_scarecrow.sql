CREATE TABLE "contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text,
	"hook" text,
	"problem" text,
	"experience" text,
	"lesson" text,
	"cta" text,
	"caption" text,
	"hashtags" text,
	"upload_date" date,
	"reels_url" text,
	"tiktok_url" text,
	"weekly_plan_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weekly_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
