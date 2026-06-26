export type ContentStatus = 'Idea' | 'Ready' | 'Planned' | 'Published';

export const CATEGORIES = ['npm', 'run', 'test'] as const;
export type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
	npm: '#22c55e',
	run: '#3b82f6',
	test: '#eab308'
};

export function categoryColor(category: string | null): string {
	return category && CATEGORY_COLORS[category] ? CATEGORY_COLORS[category] : '#9ca3af';
}

export function getStatus(content: {
	reelsUrl: string | null;
	tiktokUrl: string | null;
	uploadDate: string | null;
	category: string | null;
	hook: string | null;
	problem: string | null;
	experience: string | null;
	lesson: string | null;
	cta: string | null;
}): ContentStatus {
	if (content.reelsUrl || content.tiktokUrl) return 'Published';
	if (content.uploadDate) return 'Planned';
	if (content.category && content.hook && content.problem && content.experience && content.lesson && content.cta) return 'Ready';
	return 'Idea';
}

export function isContentReady(content: {
	category: string | null;
	hook: string | null;
	problem: string | null;
	experience: string | null;
	lesson: string | null;
	cta: string | null;
}): boolean {
	return !!(content.category && content.hook && content.problem && content.experience && content.lesson && content.cta);
}
