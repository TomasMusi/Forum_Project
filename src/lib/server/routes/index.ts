import { authPlugins } from 'mysql2';
import { Salt_Password } from '$env/static/private';
import { procedure, router } from '../api';
import { z } from 'zod';
import { conn } from '../variables';
import type { ErrorApiResponse } from '@patrick115/sveltekitapi';
// nastává menší problém, jelikož bcrypt nemá typy, tak když napíšeme bcrypt. tak nám nic nezačne vyskakovat proto na stránce npmjs.com můžeme stáhnout package pro bcrypt typy.
// tím, že jsou to typy tak to musíme dát do developer věcí tudíž instalace vypadá takto:
// pnpm i -D /@types/bcrypt 
import bcrypt from 'bcrypt';
import type { Response } from '$/types/responses';
import type { ErrorList } from "../../errors"
import auth from '../auth';

// router a procedure jsou importy z ./api.ts

export const r = router({
    // query bere, když najedeme na to hrozně moc věcí, ale nám stačí vědět, že to chce async
    // example: procedure.GET.query(async () => {
    //     return 'Hello from the API!'
    // }),


    auth

})

// zde jsme si vytvořili typ ,,AppRouter", který je typu R
export type AppRouter = typeof r