<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { MergeQueryBuilder } from 'kysely';
    import type { Snippet } from 'svelte';

    const { children, class: cls = '' }: { children: Snippet; class: string } = $props();
</script>

<!-- Co dělá twMerge ?-->
<!-- tw.Merge("text-xl font-bold text-red-500" , "text-lg") výstup bude font-bold text-red-500 TEXT-LG -->
<!-- Jak můžeme vidět tak to vymění  -->
<!-- Ale když tam zadáme něco co tam není tak to tam prostě přidá ( Nemá to s čím vyměnit)-->
<div class={twMerge('flex flex-col items-center justify-center rounded-md border-2 border-primary bg-accent p-4', cls)}>
    {@render children()}
</div>
