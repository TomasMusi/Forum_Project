import { createAPIClient } from "@patrick115/sveltekitapi";
import type { AppRouter } from "./server/routes";


// důvod proč zde dáváme typ, je abychom mohli bezpečně se dostat k r, který je v routes.
// bezpečně, protože kdybychom to importnuli tak bychom mohli leaknout data na Databázi, a toto už bude běžet na straně klienta.
// no a tohle nám umožňují typy, které existují pouze v typescriptu a reálně se nějakým způsobem nikam neposílají!
// ale skvělé je,že předtímto nás Sveltekit dokáže varovat!

export const API = createAPIClient<AppRouter>('/api')