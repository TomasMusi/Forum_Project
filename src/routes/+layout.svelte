<script lang="ts">
    // zde musí být import na ../app.css aby tailwind fungoval.
    import Icon from '$/components/Icon.svelte';
    import Navigation from '$/components/navigator/Navigation.svelte';
    import '../app.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
    let { children } = $props();
</script>

<main class="bg-background text-text h-full min-h-screen w-full overflow-x-hidden lg:text-lg">
    <!-- Components / Navigation -->
    <Navigation />
    <Icon name="bi-car-front" />
    {@render children()}
</main>
