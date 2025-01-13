import { getUserState } from '$/lib/server/function'
import { redirect } from '@sveltejs/kit';
import type { PageServerData } from './$types'

export const load = (({ cookies }) => {
    const userState = getUserState(cookies);

    if (userState.logged) {
        // na sereru musíme použít redirect()
        redirect(302, "/")
    }

}) satisfies PageServerData