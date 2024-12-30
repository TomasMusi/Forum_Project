<script lang="ts">
    let hodnota = 0;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
    <span class="text-red-500">text-red-500</span>
</p>

<p class="bg-yellow-400 p-8">AHoj</p>

<h1>{hodnota}</h1>
<div class="flex gap-3">
    <button
        class="rounded-md bg-green-500 p-3"
        onclick={() => {
            hodnota++;
        }}>+</button
    >
    <button
        class="rounded-md bg-blue-500 p-3"
        onclick={() => {
            hodnota = 0;
        }}>0</button
    >
    <button
        class="rounded-md bg-red-500 p-3"
        onclick={() => {
            hodnota--;
        }}>-</button
    >
</div>
