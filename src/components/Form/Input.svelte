<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge';

    // co nás zajimá z inputu?
    // nesmím používat const! vždy let.
    //                                                        zde undefined, protože to cheme mít defaultně
    let { value = $bindable(), class: cls, invalid = $bindable(undefined), ...props }: HTMLInputAttributes & { invalid?: string } = $props();
    let el = $state<HTMLInputElement>();
    // menší poznatek, tohle co vidíme je špatně neboť ...props bere naprosto vše
    // nemohu vybrat class kvůli tomu, že je to již obsazeno v tom props!

    // prostě si to vem jako box s věcma:
    // Vytáhneš si autíčko, jablko, šroubovák,
    // pak do dalšího boxu props dáš všechen zbytek i třeba gumičky a pak se z toho prázdného boxu
    // snažíš tahat gumičky, které jsi ale už přetáhnul jinam právě do props

    // const { value = $bindable(), ...props , class: cls,  }: HTMLInputAttributes = $props();

    // pokaždé se zavolá $effect(), když se stane nějaká změna
    $effect(() => {
        //setCustomValidity() je věc která existuje dávno v HTML, jestli že do toho něco napíšeme tak se nám rámeček vybarvý červeně.
        //?. protože to může být undefined
        // a ještě to musíme zajistit tím, že kdyby to teda bylo undefined tak tam bude prázdný string
        el?.setCustomValidity(invalid ?? '');
    });
</script>

<!-- Jakmile se v inputu objeví el, on sám sebe nabidnuje na proměnnou el-->
<!-- onMount{()} je věc která se vždycky spustí jakmile se stránka načte-->
<input
    bind:this={el}
    {...props}
    bind:value
    class={twMerge('rounded-md border-2 border-black px-2 py-1 text-lg font-bold text-text outline-none transition-colors duration-500 invalid:border-red-500', cls)}
/>
