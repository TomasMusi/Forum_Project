<script lang="ts">
    import Dropdown from './Dropdown.svelte';

    const dropdowns: {
        name: string;
        icon: unknown;
    }[] = [
        {
            name: 'Forums',
            icon: ''
        },
        {
            name: 'Categories',
            icon: ''
        },
        {
            name: 'Users',
            icon: ''
        }
    ];
</script>

<nav class="bg-secondary grid-cols-nav grid gap-4 px-2 py-4 md:px-8">
    <h1 class="text-primary text-3xl font-bold lg:text-5xl">Forum</h1>
    <div class="flex gap-2">
        {#each dropdowns as item}
            <!-- <Dropdown> znamená to, žes e to vyrenderuje -->
            <Dropdown>{item.name}</Dropdown>
        {/each}
    </div>
    <div class="flex justify-end gap-2">Login</div>
</nav>
