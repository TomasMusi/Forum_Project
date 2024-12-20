<script lang="ts">
    // zde musí být import na ../app.css aby tailwind fungoval.
    import Icon from '$/components/Icon.svelte';
    import Navigation from '$/components/navigator/Navigation.svelte';
    import '../app.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
    let { children } = $props();
</script>

<main class="font-roboto flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background text-text lg:text-lg">
    <!-- Components / Navigation -->
    <Navigation />
    <section class="flex h-full flex-1 flex-col items-center justify-center">
        {@render children()}
    </section>
</main>

<!-- flex-1 se snaží roztáhnout co nejvíc co to de aby to ten flex zaplnilo. -->
