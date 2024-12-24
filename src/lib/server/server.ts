import { APIServer } from '@patrick115/sveltekitapi'
import { context } from './context'
import { r } from './routes'

export const Server = new APIServer({
    router: r, // bere to r, které se nachází v těch ./routes
    path: '/api', // bere to, na jaké cestě to bude. To znamená /api/example, tak se nám to spustí. Kdyby na path, bylo třeba /nevim, tak to bude na /nevim/example.
    context
})