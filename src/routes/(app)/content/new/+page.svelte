<script lang="ts">
	import ContentForm from '$lib/components/content-form.svelte';

	let { data } = $props();
	let { content } = $derived(data);
</script>

<svelte:head><title>New Content | Arfa Content</title></svelte:head>

<ContentForm {content} formAction="?/create" />
