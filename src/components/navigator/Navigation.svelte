<script lang="ts">
    import Icon from '../Icon.svelte';
    import Dropdown from './Dropdown.svelte';
    import type { BootstrapIcon } from '$/types/bootstrap_icons';
    import { getContext } from 'svelte';
    import type { UserState } from '$/types/types';
    import type { Writable } from 'svelte/store';
    import { api } from '$/lib/server/api';
    import { API } from '$/lib/api';
    import { SwalAlert } from '$/lib/Alerts';
    import { error } from '@sveltejs/kit';

    const dropdowns: {
        name: string;
        icon: BootstrapIcon;
    }[] = [
        {
            name: 'Forums',
            icon: 'bi-journal-text'
        },
        {
            name: 'Categories',
            icon: 'bi-list'
        },
        {
            name: 'Users',
            icon: 'bi-person-fill'
        }
    ];

    const userState = getContext<Writable<UserState>>('userState');

    const logout = async () => {
        const response = await API.auth.logout();
        if (!response.status) {
            SwalAlert({
                icon: 'error',
                title: 'Error'
            });
            return;
        }

        SwalAlert({
            icon: 'success',
            title: 'Succesfully logout!'
        });

        userState.set({
            logged: false
        });
    };

    let logged = true;
</script>

<nav class=" grid grid-cols-nav gap-4 bg-secondary px-2 py-4 md:px-8">
    <h1 class="my-auto flex text-3xl font-bold text-primary lg:text-5xl"><a href="/">Forum</a></h1>
    <div class="flex gap-2 text-center">
        {#each dropdowns as item}
            <!-- Vše co je v dropdownu se bude řídit podle pravidel Dropdown.svelte a také Navigation.svelte-->
            <Dropdown name={item.name} icon={item.icon}>DROP CONTENT</Dropdown>
        {/each}
    </div>
    <div class="flex items-center justify-end gap-2">
        {#if !$userState.logged}
            <a href="/login" class="flex gap-1 rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
                <Icon name="bi-person-add" />
                Login
            </a>
            <a href="/register" class="flex gap-1 rounded-md px-2 py-1 text-xl font-bold transition-colors duration-200 hover:bg-primary">
                <Icon name="bi-person-add" />
                Register
            </a>
        {:else}
            <Dropdown name={$userState.data.Username} icon="bi-person-fill" class="left-1/2 flex min-w-56 -translate-x-1/2 flex-col">
                Stats
                <button>Logout</button>
            </Dropdown>
        {/if}
    </div>
</nav>
