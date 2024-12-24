import { createAPIClient } from "@patrick115/sveltekitapi";
import type { AppRouter } from "./server/routes";


// důvod proč zde dáváme typ, je abychom mohli bezpečně se dostat k r, který je v routes.
// bezpečně, protože kdybychom to importnuli tak bychom mohli leaknout data na Databázi, a toto už bude běžet na straně klienta.
// no a tohle nám umožňují typy, které existují pouze v typescriptu a reálně se nějakým způsobem nikam neposílají!
// ale skvělé je,že předtímto nás Sveltekit dokáže varovat!

export const API = createAPIClient<AppRouter>('/api')


// nyní díky tomu, že jsme si zde dali tyo ,,AppRouter" tak nám typescript zabízí vše co se nachází v router

// API.example


// avšak nastává tu problém, kdybychom to nyní dali na clienta console.log(API.example), tak nám to dá undefined, protože klasický javascript si neví rady s typama. Proto na clientovi použijeme HydrateFromServer. API.HydrateFromServer
// Co to dělá HydrateFromServer. ,,Zalije" správnými informacemi, aby při použítí API.Example věděl co má dělat.