import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

let current = $state<Theme>('system');

function apply(theme: Theme) {
	if (!browser) return;
	const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
	document.documentElement.classList.toggle('dark', isDark);
}

export function getTheme(): Theme {
	return current;
}

export function setTheme(theme: Theme) {
	current = theme;
	if (!browser) return;
	localStorage.setItem('theme', theme);
	apply(theme);
}

export function toggleTheme() {
	const isDark = document.documentElement.classList.contains('dark');
	setTheme(isDark ? 'light' : 'dark');
}

export function initTheme() {
	if (!browser) return;
	const saved = localStorage.getItem('theme') as Theme | null;
	current = saved || 'system';
	apply(current);

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (current === 'system') apply('system');
	});
}
