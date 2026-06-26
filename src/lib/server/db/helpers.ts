import { error } from '@sveltejs/kit';

export function safeId(value: string | undefined): number {
	const id = Number(value);
	if (isNaN(id) || id < 1) error(400, 'Invalid ID');
	return id;
}
