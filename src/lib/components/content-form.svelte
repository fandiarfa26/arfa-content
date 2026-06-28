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
</script>

<form method="POST" action={formAction} use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				toast.error((result.data as { error?: string })?.error || 'Gagal');
			} else if (result.type === 'redirect') {
				toast.success(editMode ? 'Tersimpan' : 'Terbuat');
				await update();
			}
		};
	}} class="mx-auto max-w-2xl space-y-6">
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
