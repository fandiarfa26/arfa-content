<script lang="ts">
	import { browser } from '$app/environment';
	import { toggleTheme } from '$lib/theme.svelte';
	import * as Card from '$lib/components/ui/card';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import LogOut from '@lucide/svelte/icons/log-out';

	let isDark = $state(false);

	$effect(() => {
		if (browser) isDark = document.documentElement.classList.contains('dark');
	});

	function handleToggle() {
		toggleTheme();
		isDark = document.documentElement.classList.contains('dark');
	}
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title>Settings</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-4">
		<button onclick={handleToggle} class="border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 flex w-full items-center justify-start gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-all">
			{#if isDark}
				<Sun class="size-4" />
				Light Mode
			{:else}
				<Moon class="size-4" />
				Dark Mode
			{/if}
		</button>

		<form action="/logout" method="POST">
			<button type="submit" class="border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 flex w-full items-center justify-start gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-all">
				<LogOut class="size-4" />
				Logout
			</button>
		</form>
	</Card.Content>
</Card.Root>
