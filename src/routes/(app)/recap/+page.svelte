<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Copy from '@lucide/svelte/icons/copy';

	let { data } = $props();
	let { weeks, selectedWeek, recap } = $derived(data);

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	function fmt(d: string) {
		const [, m, day] = d.split('-');
		return `${parseInt(day)} ${months[parseInt(m) - 1]}`;
	}

	function selectWeek(e: Event) {
		const val = (e.target as HTMLSelectElement).value;
		goto(val ? `/recap?week=${val}` : '/recap');
	}

	function cliOutput(): string {
		const lines = recap.map((r) => `${r.status} ${r.title}`).join('\n');
		const passed = recap.filter((r) => r.status === 'PASS').length;
		const skipped = recap.filter((r) => r.status === 'SKIP').length;
		const duration = selectedWeek ? `${fmt(selectedWeek.startDate)} — ${fmt(selectedWeek.endDate)}` : '';
		return `$ npm run test\n\n${lines}\n\nTasks: ${passed} passed, ${skipped} skipped\nDuration: ${duration}\n\nContinue next week...`;
	}

	function threadsOutput(): string {
		const parts: string[] = [];
		parts.push('```\n' + cliOutput() + '\n```');

		for (const r of recap) {
			const lines = [`${r.title}`];
			if (r.hook) lines.push(r.hook);
			if (r.reelsUrl) lines.push(r.reelsUrl);
			parts.push(lines.join('\n\n'));
		}

		return parts.join('\n\n---\n\n');
	}

	function copy(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="mb-6">
	<label for="week" class="mb-1 block text-sm font-medium">Week</label>
	<select id="week" onchange={selectWeek}
		class="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full max-w-xs rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
	>
		<option value="">Select week</option>
		{#each weeks as w}
			<option value={w.startDate} selected={selectedWeek?.startDate === w.startDate}>{fmt(w.startDate)} — {fmt(w.endDate)}</option>
		{/each}
	</select>
</div>

{#if recap.length > 0}
	<Card.Root class="mb-6">
		<Card.Header>
			<div class="flex items-center justify-between">
				<Card.Title class="text-sm font-semibold">CLI Recap</Card.Title>
				<Button variant="ghost" size="sm" onclick={() => copy(cliOutput())}>
					<Copy class="size-3.5" />
					Copy
				</Button>
			</div>
		</Card.Header>
		<Card.Content>
			<pre class="bg-muted overflow-x-auto rounded-lg border p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono">{cliOutput()}</pre>
		</Card.Content>
	</Card.Root>

	<Card.Root class="mb-6">
		<Card.Header>
			<div class="flex items-center justify-between">
				<Card.Title class="text-sm font-semibold">Threads Recap</Card.Title>
				<Button variant="ghost" size="sm" onclick={() => copy(threadsOutput())}>
					<Copy class="size-3.5" />
					Copy
				</Button>
			</div>
		</Card.Header>
		<Card.Content>
			<pre class="bg-muted overflow-x-auto rounded-lg border p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono">{threadsOutput()}</pre>
		</Card.Content>
	</Card.Root>
{:else if selectedWeek}
	<p class="text-muted-foreground text-sm">No content this week.</p>
{:else}
	<p class="text-muted-foreground text-sm">Select a week above to generate recap.</p>
{/if}
