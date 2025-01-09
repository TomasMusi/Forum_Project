import { authPlugins } from 'mysql2';
import { Salt_Password } from '$env/static/private';
import { procedure, router } from './api';
import { z } from 'zod';
import { conn } from './variables';
import type { ErrorApiResponse } from '@patrick115/sveltekitapi';
// nastává menší problém, jelikož bcrypt nemá typy, tak když napíšeme bcrypt. tak nám nic nezačne vyskakovat proto na stránce npmjs.com můžeme stáhnout package pro bcrypt typy.
// tím, že jsou to typy tak to musíme dát do developer věcí tudíž instalace vypadá takto:
// pnpm i -D /@types/bcrypt 
import bcrypt from 'bcrypt';
import type { Response } from '$/types/responses';
import type { ErrorList } from "../errors"

// router a procedure jsou importy z ./api.ts

export const r = router({
    // query bere, když najedeme na to hrozně moc věcí, ale nám stačí vědět, že to chce async
    example: procedure.GET.query(async () => {
        return 'Hello from the API!'
    }),
    auth: {
        register: procedure.POST.input(z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })).query(async ({ input }) => {
            // eb = expression builder, ale můžeme to mít jakkoliv pojmenované
            // z userů vyber id, pro který platí...
            // or je nebo, buď username = input.username nebo email = input.email
            const data = await conn.selectFrom("Users").select("ID").where((eb) => eb.or([
                eb("Username", "=", input.username),
                eb("Email", "=", input.email)])).execute()

            // když zadáme jméno v databázi, tak nám to vráti array, buď jestli máme uživatele v databázi tak nám to vrátí array s ID a jestli tam není jméno ani email, tak nám to vrátí prázdný array.
            if (data.length > 0) {
                return {
                    code: 400,
                    status: false,
                    message: "auth.register.invalid" satisfies ErrorList
                } satisfies ErrorApiResponse;
            }   // parseInt(Salt_Password)
            const hashed = bcrypt.hashSync(input.password, 10);

            // tímto jednoduchým příkazem uložím do users tyto hodnoty:
            await conn.insertInto("Users").values({
                Username: input.username,
                Email: input.email,
                Passsword: hashed
            }).execute();

            return {
                status: true,
            } satisfies Response;
        }),

    }
    // nyní když otevřeme /api/example tak nám to napíše "Hello from the API!"
})

// zde jsme si vytvořili typ ,,AppRouter", který je typu R
export type AppRouter = typeof r