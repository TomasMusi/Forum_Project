import { procedure, router } from './api'


// router a procedure jsou importy z ./api.ts

export const r = router({
    // query bere, když najedeme na to hrozně moc věcí, ale nám stačí vědět, že to chce async
    example: procedure.GET.query(async () => {
        return 'Hello from the API!'
    }),
    // nyní když otevřeme /api/example tak nám to napíše "Hello from the API!"
})

export type AppRouter = typeof r