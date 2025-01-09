<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';
    import { API } from '$/lib/api';
    import Swal from 'sweetalert2'; // zde si to můžeme pojmenovat jak chceme, protože je to default (Zde jsme si to pojmenovali Swal)
    import { GroupByItemNode } from 'kysely';
    import { SwalAlert } from '$/lib/Alerts';
    import { goto } from '$app/navigation';
    import { extractError, matchError } from '$/lib/errors';

    // avšak my chceme říct, že ten error může být i string, akorát je tam undefined? Dáme to přes typy :D
    // existuje typ Record, typicky když chceš mít nějaký object, který bude mít v levo string a potom nějakou value tak se to jmenuje Record.
    // A my mu řekneme, klíče v tomto případě (username, email, password, password2), budou typu string, a druhá hodnota je to co je ve vnitř jich takže v tomto případě (value, error)
    type Inputs = 'username' | 'email' | 'password' | 'password2';

    let data = $state<
        Record<
            Inputs,
            {
                value: string;
                error: string | undefined;
                // error?: string, toto je to stejné jak nahoře.
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

    const register = async () => {
        // my bychom chtěli aby když už tam něco vyplníme tak aby tam nebyl error, hmmm ale jak to udělat? abychom neměli miliardu else statmentů? přes object ne přeciii :D

        // Object.values(data) získá od každého value: "" a error:
        //Foreach, použijeme protože je tam více elementů.
        Object.values(data).forEach((item) => (item.error = undefined));

        if (!data.username.value) {
            data.username.error = 'Please enter Username';
        }
        if (!data.email.value) {
            data.email.error = 'Please enter Email!';
        }
        if (!data.password.value) {
            data.password.error = 'Please Enter A Password!';
        }
        if (!data.password2.value) {
            data.password2.error = 'Please Enter A Password Again!';
        }

        if (data.password.value != data.password2.value) {
            data.password.error = "Passwords doesn't match!";
            data.password2.error = "Passwords doesn't match!";
        }

        // jestliže se některý item nerovná undefined
        if (Object.values(data).some((item) => item.error !== undefined)) {
            return;
        }

        // console.log(Object.entries(data));

        // Object entries dělá to, že nám to převede na array, který vypadá následovně:
        // vrátí nám to array, kde v levo je název a v pravo je object
        // tudíž zde na levo username v pravo object username.
        // Array(4)0:
        // (0) ['username', Proxy(Object)]
        // (1) ['email', Proxy(Object)]
        // (2) ['password', Proxy(Object)]
        // (3) ['password2', Proxy(Object)]

        // no, ale asi ideálně bychom chtělo aby vedlo toho byla ta hodnota ne? uděláme to přes .map():D

        // console.log(Object.entries(data).map(([key, value]) => [key, value.value]));
        // akorát by to ještě chtělo aby se to neposílalo v array že? Na to Existuje Object.FromEntries()! :D
        // .map() udělá to, že nám to vyfiltruje a napíše nám to vedle našeho klíče (username, email, password,password2) vypíše tu value.

        // Object.fromEntries nám z toho netries udělá object znovu.

        const getValues = () => {
            // as Record<> V levo bude password1,2 atd, v pravo string.
            return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.value])) as Record<Inputs, string>;
        };

        // akorát nyní je tu problém, ono to nerozeznává náš, email, password, proto nahoře musíme přesně říct, že to bude username string,email,string,password string,password2 string
        // dalším problém je ten, že typescript při .FromEntries() nerozeznává typy, tudíž si musíme poradit nějak.
        const response = await API.auth.register(getValues());

        console.log(response);

        if (!response.status) {
            SwalAlert({
                icon: 'error',
                text: extractError(response.message)
            });

            if (matchError(response.message, 'auth.register.invalid')) {
                data.username.error = extractError(response.message);
                data.email.error = extractError(response.message);
            }
            return;
        }

        SwalAlert({
            icon: 'success',
            text: 'Sucessfuly registered'
        });
        // přesměrujeme uživatele na login stránce.
        goto('/login');
    };
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-8">
    <h1 class="font-poppins col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username" error={data.username.error}>
        <!-- důvod proč nepoužijeme u toho error, bind, je ten že bind používáme tehdy, když chceme posílat a získavat data zpátky, což zde nechceme. -->
        <Input id="username" placeholder="Username" bind:value={data.username.value} invalid={data.username.error} />
    </Entry>
    <Entry id="email" label="Email" error={data.email.error}>
        <Input id="email" placeholder="email" type="email" bind:value={data.email.value} invalid={data.email.error} />
    </Entry>
    <Entry id="password" label="Password" error={data.password.error}>
        <Input id="password" placeholder="password" type="password" bind:value={data.password.value} invalid={data.password.error} />
    </Entry>
    <Entry id="password2" label="Password (Again)" error={data.password2.error}>
        <Input id="password2" placeholder="password" type="password" bind:value={data.password2.value} invalid={data.password.error} />
    </Entry>
    <Button class="col-span-2 mx-auto" onclick={register}>Register</Button>
</Card>
