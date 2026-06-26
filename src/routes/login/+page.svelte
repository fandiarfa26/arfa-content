<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';

	let { form } = $props();
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-center text-2xl">Arfa Content</Card.Title>
			<Card.Description class="text-center">
				Masukkan password untuk melanjutkan
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'failure') {
							toast.error((result.data as { error?: string })?.error || 'Password salah');
							await update();
						} else if (result.type === 'redirect') {
							toast.success('Berhasil masuk');
							await update();
						}
					};
				}} class="space-y-4">
				<Input type="password" name="password" placeholder="Password" required />

				{#if form?.error}
					<p class="text-destructive text-sm">{form.error}</p>
				{/if}

				<Button type="submit" class="w-full">Masuk</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
