<script lang="ts">
    import type { BootstrapIcon } from '$/types/bootstrap_icons';
    import type { Snippet } from 'svelte';
    import Icon from '../Icon.svelte';
    import ClickOutside from '../ClickOutside.svelte';

    const { children, name, icon }: { children: Snippet; name: string; icon: BootstrapIcon } = $props();
    let opened = $state(false);
</script>

<!-- Vše co je tady jsou pravidla jenž budou fungovat v ostatních souborech když napíšu <Dropdown> </Dropdown>-->
<div class="relative my-auto cursor-pointer select-none rounded-md px-2 py-1 font-bold transition-colors duration-200 hover:bg-primary hover:transition-all hover:duration-300">
    <!--kvůli tomu, že to furt řve musíme říct, že se jedná o button, plus tomu dáme tab-index (tab-index je to, že když mačkáme na stránce tab tak nám to skáče na elementy a můžeme nastavit pořadí) -->
    <div role="button" onclick={() => (opened = !opened)} onkeypress={(ev) => ev.key === 'Enter' && (opened = !opened)} tabindex={0} class="flex gap-1">
        <Icon name={icon} />
        {name}
        <Icon name={opened ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} />
    </div>
    {#if opened}
        <!-- Po kliknutí mimo se to zavře -->
        <ClickOutside clickoutside={() => (opened = false)}>
            <div class="absolute left-0 top-[105%] w-full rounded-md bg-primary p-2">
                {@render children()}
            </div>
        </ClickOutside>
    {/if}
</div>
