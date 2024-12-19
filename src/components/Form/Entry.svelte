<script lang="ts">
    import type { Snippet } from 'svelte';

    const { children, id = '', label, error = undefined }: { children: Snippet; id: string; label: string; error?: string } = $props();
</script>

<div class="flex flex-col gap-2">
    <label for={id}>{label}</label>
    {@render children()}
    {#if error}
        <span>Error text</span>
    {/if}
</div>
