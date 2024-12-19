<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    // co nás zajimá z inputu?
    // nesmím používat const! vždy let.
    let { value = $bindable(), class: cls, ...props }: HTMLInputAttributes = $props();

    // menší poznatek, tohle co vidíme je špatně neboť ...props bere naprosto vše
    // nemohu vybrat class kvůli tomu, že je to již obsazeno v tom props!

    // prostě si to vem jako box s věcma:
    // Vytáhneš si autíčko, jablko, šroubovák,
    // pak do dalšího boxu props dáš všechen zbytek i třeba gumičky a pak se z toho prázdného boxu
    // snažíš tahat gumičky, které jsi ale už přetáhnul jinam právě do props

    // const { value = $bindable(), ...props , class: cls,  }: HTMLInputAttributes = $props();
</script>

<input
    {...props}
    bind:value
    class={twMerge('rounded-md border-2 border-black px-2 py-1 text-lg font-bold text-text outline-none transition-colors duration-500 invalid:border-red-500', cls)}
/>
