<script lang="ts">
    // zde musí být import na ../app.css aby tailwind fungoval.
    import Icon from '$/components/Icon.svelte';
    import Navigation from '$/components/navigator/Navigation.svelte';
    import type { Snippet } from 'svelte';
    import '../app.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';

    import type { LayoutData } from './$types';
    import { API } from '$/lib/api';
    import { browser } from '$app/environment';
    //                                           data jsou ty data ze serveru.
    let { children, data }: { children: Snippet; data: LayoutData } = $props();

    // tohle api, se bere ze souboru +layout.server.ts
    // HydrateFromServer, dělá komunikaci se serverem na klienta!
    API.hydrateFromServer(data.api);
    //                      z toho data.api jsem získal data ze serveru
    // A API.hydrateFromServer, si natáhá ti data k sobě na klienta

    // díky HydrateFromServer jsme umožnili jakokoli komukaci se serverem a klientem, tudíž když se vrátíme do Routes a máme tam ten example, když na něho nyní zavoláme, tak bude fungovat. V networku uvidíme jak to zavolalo na /api/example , GET 200.

    // existuje také skvělá věc, jménem browser a ta říká ať se to jen vykoná v browseru

    //  if (browser) {
    //      API.example();
    //  }
</script>

<main class="font-roboto flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background text-text lg:text-lg">
    <!-- Components / Navigation -->
    <Navigation />
    <section class="flex h-full flex-1 flex-col items-center justify-center">
        {@render children()}
    </section>
</main>

<!-- flex-1 se snaží roztáhnout co nejvíc co to de aby to ten flex zaplnilo. -->
