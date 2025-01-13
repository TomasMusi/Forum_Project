import type { ErrorList } from '$/lib/errors';
import { procedure } from '$/lib/server/api'
import type { ErrorApiResponse } from '@patrick115/sveltekitapi';
import { conn, jwt } from '../../variables'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { COOKIE_EXPIRE } from '$env/static/private'
import type { Response } from '$/types/responses';
import type { UserData } from '$/types/types';

export default procedure.POST.input(z.object({
    username: z.string(),
    password: z.string()
})).query(async ({ input, ev: { cookies } }) => {
    const data = await conn.selectFrom('Users').selectAll().where("Username", "=", input.username).executeTakeFirst();

    if (!data) {
        return {
            status: false,
            code: 400,
            message: "auth.login.username" satisfies ErrorList
        } satisfies ErrorApiResponse
    }
    if (!bcrypt.compareSync(input.password, data.Passsword)) return {
        status: false,
        code: 400,
        message: "auth.login.password" satisfies ErrorList
    } satisfies ErrorApiResponse

    const userData = {
        ...data,
        password: undefined // nechceme do cookies ukládat heslo
    }

    const cookie = jwt.setCookie(userData)
    cookies.set('session', cookie, {
        path: "/", // zde musíme dát lomítko, aby se ta cookie uložila všude, protože kdybychom to neudělali tak by cookie byla uložena pouze například na api/register a potom kdybychom šli na main a šli bychom někam na stránku kde bychom díky té cookies měli mít práva tak by to nefungovalo.
        maxAge: parseInt(COOKIE_EXPIRE) * 1000
    });

    return {
        status: true,
        data: UserData
    } satisfies ResponseWithData<UserData>;

})