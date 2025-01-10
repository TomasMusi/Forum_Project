import { APICreate, MiddleWareError } from '@patrick115/sveltekitapi'
import type { Context } from './context'

export const api = new APICreate<Context>()

export const router = api.router
export const procedure = api.procedure
// middleware se používá při .use()
// middleware má vždycky dva parametry ctx (context) a next (u patrick115 packu)

export const loggedProcedure = procedure.use(async ({ ctx, next }) => {
    if (!ctx.logged) {
        // aby se nemohl dostat na api a dalo mu to middlewareError
        throw new MiddleWareError({
            status: false,
            code: 401,
            message: "Unauthorized"
        })
    }

    return next(ctx.data)
});