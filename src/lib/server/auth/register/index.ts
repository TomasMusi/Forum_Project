import type { ErrorList } from "$/lib/errors";
import { procedure } from "$/lib/server/api"
import { conn } from "../../variables";
import type { ErrorApiResponse } from "@patrick115/sveltekitapi";
import { z } from "zod"
import bcrypt from 'bcrypt'
import type { Response } from '$/types/responses'

export default procedure.POST.input(z.object({
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
})