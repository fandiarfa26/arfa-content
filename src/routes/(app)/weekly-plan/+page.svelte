<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { data } = $props();
	let { weeks } = $derived(data);

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	function fmt(d: string) {
		const [, m, day] = d.split('-');
		return `${parseInt(day)} ${months[parseInt(m) - 1]}`;
	}
</script>

<svelte:head><title>Weekly Plan | Arfa Content</title></svelte:head>

{#each weeks as week}
	<Card.Root class="mb-6">
		<Card.Header>
			<div class="flex items-center justify-between">
				<Card.Title class="text-sm">{fmt(week.startDate)} — {fmt(week.endDate)}</Card.Title>
				<Card.Description>{week.items.length} content</Card.Description>
			</div>
		</Card.Header>

		<Card.Content>
			{#if week.items.length > 0}
				<div class="space-y-1">
					{#each week.items as item}
						<a href="/content/{item.id}" class="hover:bg-muted flex items-center justify-between rounded border px-3 py-2 text-sm transition-colors hover:underline">
							{item.title}
							<span class="text-muted-foreground text-xs">{fmt(item.uploadDate!)}</span>
						</a>
					{/each}
				</div>
			{:else}
				<p class="text-muted-foreground py-4 text-center text-sm">No content this week.</p>
			{/if}
		</Card.Content>
	</Card.Root>
{/each}

{#if weeks.length === 0}
	<p class="text-muted-foreground py-8 text-center text-sm">No content with upload date.</p>
{/if}
