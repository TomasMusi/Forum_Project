import { authPlugins } from 'mysql2'
import { procedure, router } from './api'
import { z } from 'zod'
import Input from '$/components/Form/Input.svelte'


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
            return input;
        }),
        login: procedure.POST.input(z.object({
            username: z.string(),
            password: z.string(),
        })).query(async ({ input }) => {
            return input;
        })
    }
    // nyní když otevřeme /api/example tak nám to napíše "Hello from the API!"
})

// zde jsme si vytvořili typ ,,AppRouter", který je typu R
export type AppRouter = typeof r