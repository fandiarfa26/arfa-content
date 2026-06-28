<script lang="ts">
	import { enhance } from '$app/forms';
	import { CATEGORIES } from '$lib/content';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import Eye from '@lucide/svelte/icons/eye';
	import Edit from '@lucide/svelte/icons/edit';
	import Copy from '@lucide/svelte/icons/copy';
	import { toast } from 'svelte-sonner';

	let {
		content,
		formAction,
		deleteAction,
		editMode = false
	}: {
		content: {
			title?: string | null;
			category?: string | null;
			hook?: string | null;
			problem?: string | null;
			experience?: string | null;
			lesson?: string | null;
			exampleScript?: string | null;
			cta?: string | null;
			caption?: string | null;
			hashtags?: string | null;
			uploadDate?: string | null;
			reelsUrl?: string | null;
			tiktokUrl?: string | null;
		};
		formAction: string;
		deleteAction?: string;
		editMode?: boolean;
	} = $props();

	let open = $state(false);
	let mode = $state<'form' | 'preview'>('preview');

	const sections: { label: string; value: string | null | undefined }[] = $derived([
		{ label: 'Title', value: content.title },
		{ label: 'Category', value: content.category },
		{ label: 'Hook', value: content.hook },
		{ label: 'Problem', value: content.problem },
		{ label: 'Experience', value: content.experience },
		{ label: 'Lesson', value: content.lesson },
		{ label: 'CTA', value: content.cta },
		{ label: 'Caption', value: content.caption },
		{ label: 'Hashtags', value: content.hashtags },
		{ label: 'Example Script', value: content.exampleScript },
		{ label: 'Upload Date', value: content.uploadDate },
		{ label: 'Reels URL', value: content.reelsUrl },
		{ label: 'TikTok URL', value: content.tiktokUrl }
	]);

	async function copyText(text: string, label: string) {
		await navigator.clipboard.writeText(text);
		toast.success(`${label} copied`);
	}
</script>

<div class="mx-auto max-w-2xl space-y-6">
	{#if editMode}
		<Button variant="outline" onclick={() => mode = mode === 'form' ? 'preview' : 'form'} class="w-full gap-2">
			{#if mode === 'preview'}
				<Edit class="size-4" /> Edit
			{:else}
				<Eye class="size-4" /> Preview
			{/if}
		</Button>
	{/if}

	{#if mode === 'preview'}
		<div class="space-y-4">
			{#each sections as { label, value }}
				{#if value}
					<Card.Root>
						<Card.Header class="flex flex-row items-center justify-between gap-2">
							<Card.Title class="text-sm">{label}</Card.Title>
							<Button variant="ghost" size="icon-xs" onclick={() => copyText(value, label)}>
								<Copy class="size-3" />
							</Button>
						</Card.Header>
						<Card.Content>
							<p class="text-muted-foreground whitespace-pre-wrap text-sm">{value}</p>
						</Card.Content>
					</Card.Root>
				{/if}
			{/each}
		</div>
	{/if}

	{#if mode === 'form'}
<form method="POST" action={formAction} use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				toast.error((result.data as { error?: string })?.error || 'Gagal');
			} else if (result.type === 'redirect') {
				toast.success(editMode ? 'Tersimpan' : 'Terbuat');
				await update();
			}
		};
	}}>
	<Card.Root>
		<Card.Content class="space-y-4">
			<div class="space-y-2">
				<Label for="title">Title</Label>
				<Input id="title" type="text" name="title" value={content.title ?? ''} required />
			</div>

			<div class="space-y-2">
				<Label for="category">Category</Label>
				<select id="category" name="category"
					class="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>
					<option value="">—</option>
					{#each CATEGORIES as cat}
						<option value={cat} selected={content.category === cat}>{cat}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-2">
				<Label for="hook">Hook</Label>
				<textarea id="hook" name="hook" rows="2"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.hook ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="problem">Problem</Label>
				<textarea id="problem" name="problem" rows="3"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.problem ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="experience">Experience</Label>
				<textarea id="experience" name="experience" rows="4"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.experience ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="lesson">Lesson</Label>
				<textarea id="lesson" name="lesson" rows="3"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.lesson ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="cta">CTA</Label>
				<textarea id="cta" name="cta" rows="2"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.cta ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="caption">Caption</Label>
				<textarea id="caption" name="caption" rows="4"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.caption ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="hashtags">Hashtags</Label>
				<textarea id="hashtags" name="hashtags" rows="2"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.hashtags ?? ''}</textarea>
			</div>

			<div class="space-y-2">
				<Label for="example_script">Example Script</Label>
				<textarea id="example_script" name="example_script" rows="3"
					class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>{content.exampleScript ?? ''}</textarea>
			</div>
		</Card.Content>
	</Card.Root>

	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Publish Information</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="space-y-2">
				<Label for="upload_date">Upload Date</Label>
				<Input id="upload_date" type="date" name="upload_date" value={content.uploadDate ?? ''} />
			</div>

			<div class="space-y-2">
				<Label for="reels_url">Reels URL</Label>
				<Input id="reels_url" type="url" name="reels_url" value={content.reelsUrl ?? ''} />
			</div>

			<div class="space-y-2">
				<Label for="tiktok_url">TikTok URL</Label>
				<Input id="tiktok_url" type="url" name="tiktok_url" value={content.tiktokUrl ?? ''} />
			</div>
		</Card.Content>
	</Card.Root>

	<div class="flex gap-3">
		<Button type="submit" class="flex-1">{editMode ? 'Save' : 'Create'}</Button>
		{#if editMode && deleteAction}
			<Button type="button" variant="destructive" onclick={() => open = true}>
				<Trash2 class="size-4" />
				Delete
			</Button>
		{/if}
	</div>
</form>
	{/if}
</div>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Hapus konten?</Dialog.Title>
			<Dialog.Description>Tindakan ini tidak bisa dibatalkan.</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action={deleteAction} use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						toast.error((result.data as { error?: string })?.error || 'Gagal');
					} else if (result.type === 'redirect') {
						toast.success('Dihapus');
						await update();
					}
				};
			}}>
			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => open = false}>Batal</Button>
				<Button type="submit" variant="destructive">Hapus</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
