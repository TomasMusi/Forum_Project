<script lang="ts">
    import '../app.css';
    let { children } = $props();
</script>

<main class="bg-background text-text h-full min-h-screen w-full overflow-x-hidden lg:text-lg">
    <nav class="bg-secondary flex flex-row gap-4 px-2 md:px-8">
        <h1 class="text-primary text-2xl lg:text-4xl">Forum</h1>
    </nav>

    {@render children()}
</main>
