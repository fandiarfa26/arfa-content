<script lang="ts">
	import ContentForm from '$lib/components/content-form.svelte';

	let { data } = $props();
	let { content } = $derived(data);
</script>

<ContentForm {content} formAction="?/create" />
