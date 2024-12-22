import { APIServer } from '@patrick115/sveltekitapi'
import { context } from './context'
import { r } from './routes'

export const Server = new APIServer({
    router: r, // bere to r, které je v těch ./routes
    path: '/api', // bere to na jaké cestě to bude.
    context
})