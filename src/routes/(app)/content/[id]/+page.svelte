<script lang="ts">
	import ContentForm from '$lib/components/content-form.svelte';

	let { data } = $props();
	let { content } = $derived(data);
</script>

<svelte:head><title>{content.title} | Arfa Content</title></svelte:head>

<ContentForm {content} formAction="?/update" deleteAction="?/delete" editMode />
