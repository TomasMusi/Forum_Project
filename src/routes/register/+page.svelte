<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-8">
    <h1 class="font-poppins col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="username" error="IDK">
        <Input id="username" placeholder="Jmeno" />
    </Entry>
    <Entry id="email" label="email" error="IDK">
        <Input id="email" placeholder="email" type="email" />
    </Entry>
    <Entry id="password" label="password" error="IDK">
        <Input id="password" placeholder="password" type="password" />
    </Entry>
    <Entry id="password2" label="password" error="IDK">
        <Input id="password2" placeholder="password" type="password" />
    </Entry>
    <Button class="col-span-2 mx-auto">aa</Button>
</Card>
