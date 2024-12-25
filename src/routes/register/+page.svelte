<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';

    // avšak my chceme říct, že ten error může být i string, akorát je tam undefined? Dáme to přes typy :D
    // existuje typ Record, typicky když chceš mít nějaký object, který bude mít v levo string a potom nějakou value tak se to jmenuje Record.
    // A my mu řekneme, klíče v tomto případě (username, email, password, password2), budou typu string, a druhá hodnota je to co je ve vnitř jich takže v tomto případě (value, error)
    let data = $state<
        Record<
            string,
            {
                value: string;
                error: string | undefined;
            }
        >
    >({
        username: {
            value: '',
            error: undefined // protože zatím nemáme žádný error
        },
        email: {
            value: '',
            error: undefined
        },
        password: {
            value: '',
            error: undefined
        },
        password2: {
            value: '',
            error: undefined
        }
    });
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-8">
    <h1 class="font-poppins col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username">
        <Input id="username" placeholder="Username" />
    </Entry>
    <Entry id="email" label="Email">
        <Input id="email" placeholder="email" type="email" />
    </Entry>
    <Entry id="password" label="Password">
        <Input id="password" placeholder="password" type="password" />
    </Entry>
    <Entry id="password2" label="Password (Again)">
        <Input id="password2" placeholder="password" type="password" />
    </Entry>
    <Button class="col-span-2 mx-auto">Register</Button>
</Card>
