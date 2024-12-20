<script lang="ts">
    import type { Snippet } from 'svelte';

    const { children, id = '', label, error = undefined }: { children: Snippet; id?: string; label: string; error?: string } = $props();
</script>

<div class="flex flex-col">
    <label class="mb-2 text-lg font-bold lg:text-xl" for={id}>{label}</label>
    {@render children()}
    <!-- class:invisible udělá to, že to schová a error ?? '...' jestliže je error undefined tak tam budou 3 tečky jinak se to vypíše a v tomto případě to děláme pro to odsazení. Aby kdyby se zobrazil error aby to neposkočilo. -->
    <span class:invisible={!error} class="text-sm text-red-500">{error ?? '...'}</span>
</div>
