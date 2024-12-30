<script lang="ts">
    import { page } from '$app/state';
</script>

<h2 class="text-5xl font-bold text-red-500 md:text-6xl lg:text-7xl">{page.status}</h2>
<h2 class="text-3xl font-bold md:text-5xl lg:text-6xl">{page.error?.message}</h2>
