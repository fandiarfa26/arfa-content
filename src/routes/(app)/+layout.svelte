<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import ClipboardList from '@lucide/svelte/icons/clipboard-list';
	import Calendar from '@lucide/svelte/icons/calendar';
	import FileText from '@lucide/svelte/icons/file-text';
	import Settings from '@lucide/svelte/icons/settings';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toggleTheme } from '$lib/theme.svelte';

	let { children } = $props();

	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function handleToggle() {
		if (!browser) return;
		toggleTheme();
		isDark = document.documentElement.classList.contains('dark');
	}

	function isActive(href: string) {
		const path = $page.url.pathname;
		return href === '/' ? path === '/' : path.startsWith(href);
	}

	const nav = [
		{ href: '/', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/backlog', label: 'Backlog', icon: ClipboardList },
		{ href: '/weekly-plan', label: 'Weekly Plan', icon: Calendar },
		{ href: '/recap', label: 'Recap', icon: FileText },
		{ href: '/settings', label: 'Settings', icon: Settings }
	];
</script>

<div class="flex min-h-screen">
	<aside class="bg-sidebar text-sidebar-foreground hidden w-56 flex-col border-r p-4 md:flex">
		<div class="mb-8 text-lg font-bold tracking-tight">Arfa Content</div>
		<nav class="flex flex-col gap-1">
			{#each nav as item}
				<a
					href={item.href}
					class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
					class:bg-sidebar-accent={isActive(item.href)}
					class:text-sidebar-accent-foreground={isActive(item.href)}
				>
					<item.icon class="size-4" />
					{item.label}
				</a>
			{/each}
		</nav>
		<div class="mt-auto space-y-1">
			<button onclick={handleToggle} class="hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors">
				{#if isDark}
					<Sun class="size-4" />
					Light
				{:else}
					<Moon class="size-4" />
					Dark
				{/if}
			</button>
			<form action="/logout" method="POST">
				<button type="submit" class="hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors">
					<LogOut class="size-4" />
					Logout
				</button>
			</form>
		</div>
	</aside>

	<main class="flex-1 overflow-auto pb-20 md:pb-0">
		<div class="mx-auto max-w-6xl px-4 py-6">
			{@render children()}
		</div>
	</main>

	<nav class="bg-sidebar text-sidebar-foreground fixed bottom-0 left-0 right-0 flex border-t md:hidden">
		{#each nav as item}
			<a
				href={item.href}
				class="flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors"
				class:bg-sidebar-accent={isActive(item.href)}
				class:text-sidebar-accent-foreground={isActive(item.href)}
			>
				<item.icon class="size-4" />
				{item.label}
			</a>
		{/each}
	</nav>
</div>
