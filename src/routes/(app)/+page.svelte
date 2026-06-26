<script lang="ts">
	import { enhance } from '$app/forms';
	import { CATEGORIES, categoryColor } from '$lib/content';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import Plus from '@lucide/svelte/icons/plus';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let { counts, categoryCounts, activePlan } = $derived(data);
</script>

<div class="grid grid-cols-2 gap-3 md:grid-cols-4">
	{#each Object.entries(counts) as [status, count]}
		<Card.Root>
			<Card.Header class="pb-0">
				<Card.Description class="text-xs font-medium uppercase tracking-wider">{status}</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="text-3xl font-bold">{count}</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>

<div class="mt-6">
	<h2 class="mb-3 text-sm font-semibold">Category Distribution</h2>
	<div class="flex flex-wrap gap-2">
		{#each CATEGORIES as cat}
			{@const count = categoryCounts[cat] ?? 0}
			{#if count > 0}
				<div class="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium" style="background-color: {categoryColor(cat)}20; color: {categoryColor(cat)}">
					<span class="h-2 w-2 rounded-full" style="background-color: {categoryColor(cat)}"></span>
					{cat} ({count})
				</div>
			{/if}
		{/each}
		{#if (categoryCounts['other'] ?? 0) > 0}
			<div class="text-muted-foreground flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800">
				<span class="h-2 w-2 rounded-full bg-gray-400"></span>
				other ({categoryCounts['other']})
			</div>
		{/if}
	</div>
</div>

{#if activePlan}
	<div class="mt-6">
		<h2 class="mb-2 text-sm font-semibold">Active Weekly Plan</h2>
		<Card.Root>
			<Card.Content>
				<div class="text-muted-foreground text-xs">
					{activePlan.startDate} — {activePlan.endDate}
				</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}

<div class="mt-6">
	<h2 class="mb-3 text-sm font-semibold">Quick Capture</h2>
	<form method="POST" action="?/create" use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				toast.error((result.data as { error?: string })?.error || 'Gagal');
			} else if (result.type === 'redirect') {
				toast.success('Ide tersimpan');
				await update();
			}
		};
	}} class="flex gap-2">
		<Input type="text" name="title" placeholder="Tambah ide..." class="flex-1" />
		<Button type="submit">Add</Button>
	</form>
</div>

<div class="fixed right-4 bottom-20 z-50 md:hidden">
	<a href="/content/new" class="bg-primary text-primary-foreground hover:bg-primary/90 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors">
		<Plus class="size-6" />
	</a>
</div>
