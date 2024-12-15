<script lang="ts">
    // zde musí být import na ../app.css aby tailwind fungoval.
    import '../app.css';
    let { children } = $props();
</script>

<main class="bg-background text-text h-full min-h-screen w-full overflow-x-hidden lg:text-lg">
    <nav class="bg-secondary grid-cols-nav grid gap-4 px-2 py-4 md:px-8">
        <h1 class="text-primary text-3xl font-bold lg:text-5xl">Forum</h1>
        <div class="flex gap-2">item</div>
        <div class="flex justify-end gap-2">Login</div>
    </nav>
    {@render children()}
</main>
