<script lang="ts">
    // všechny poznámky jsou v registru, protože tady je kod skoro stejny akorát pár změn
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
    import { getContext, setContext } from 'svelte';
    import type { UserData, UserState } from '$/types/types';
    import { getUserState } from '$/lib/server/function';
    import type { Writable } from 'svelte/store';

    type Inputs = 'username' | 'password';

    let data = $state<
        Record<
            Inputs,
            {
                value: string;
                error: string | undefined;
            }
        >
    >({
        username: {
            value: '',
            error: undefined
        },
        password: {
            value: '',
            error: undefined
        }
    });

    const userState = getContext<Writable<UserState>>('userState');

    const login = async () => {
        Object.values(data).forEach((item) => (item.error = undefined));

        if (!data.username.value) {
            data.username.error = 'Please enter Username';
        }
        if (!data.password.value) {
            data.password.error = 'Please Enter A Password!';
        }

        if (Object.values(data).some((item) => item.error !== undefined)) {
            return;
        }

        const getValues = () => {
            return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.value])) as Record<Inputs, string>;
        };

        const response = await API.auth.login(getValues());

        console.log(response);

        if (!response.status) {
            SwalAlert({
                icon: 'error',
                text: extractError(response.message)
            });

            if (matchError(response.message, 'auth.login.username')) {
                data.username.error = extractError(response.message);
            } else if (matchError(response.message, 'auth.login.password')) {
                data.password.error = extractError(response.message);
            }
            return;
        }

        SwalAlert({
            icon: 'success',
            text: 'Login was sucessfull'
        });

        // Nemůžeme to použít ve funkci ale ve hlavním kodu
        //        setContext('userState', {
        //           logged: true,
        //         data: response.data
        //   });

        userState.set({
            logged: true,
            data: response.data
        });

        goto('/');
    };
</script>

<Card class="m-auto flex min-w-[50%] gap-2">
    <h1 class="font-poppins col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black text-2xl font-bold lg:text-4xl">Login</h1>
    <Entry id="username" label="Username" error={data.username.error}>
        <Input id="username" placeholder="Username" bind:value={data.username.value} invalid={data.username.error} />
    </Entry>
    <Entry id="password" label="Password" error={data.password.error}>
        <Input id="password" placeholder="password" type="password" bind:value={data.password.value} invalid={data.password.error} />
    </Entry>
    <Button onclick={login} class="col-span-2 mx-auto">Login</Button>
</Card>
