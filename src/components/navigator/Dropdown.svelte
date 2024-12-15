<script lang="ts">
    import type { Snippet } from 'svelte';

    const { children }: { children: Snippet } = $props();
</script>

<!-- Vše co je tady jsou pravidla jenž budou fungovat v ostatních souborech když napíšu <Dropdown> </Dropdown>-->
<div class="my-auto flex gap-2 rounded-md p-4 font-bold transition-colors duration-200 hover:bg-primary hover:transition-all hover:duration-300">{@render children()}</div>
