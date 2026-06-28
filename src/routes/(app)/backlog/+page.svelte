<script lang="ts">
	import { categoryColor } from '$lib/content';
	import * as Card from '$lib/components/ui/card';

	let { data } = $props();
	let { columns } = $derived(data);

	const statuses = ['Idea', 'Ready', 'Planned', 'Published'];
</script>

<svelte:head><title>Backlog | Arfa Content</title></svelte:head>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
	{#each statuses as status}
		<div class="bg-muted/50 flex flex-col rounded-lg border p-3">
			<div class="mb-3 text-xs font-semibold uppercase tracking-wider">{status} ({columns[status].length})</div>
			<div class="flex flex-col gap-2">
				{#each columns[status] as item}
					<a href="/content/{item.id}" class="block rounded-md" style="border-left: 3px solid {categoryColor(item.category)}">
						<Card.Root class="border-l-0 rounded-l-none rounded-r-xl py-3">
							<Card.Content class="p-0 px-3">
								<span class="text-sm">{item.title}</span>
							</Card.Content>
						</Card.Root>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
