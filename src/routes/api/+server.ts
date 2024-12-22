// Vše co dáme sem se jen a pouze vykoná na serveru. 
// Můžeme tu používat GET,POST 

import type { RequestHandler } from "@sveltejs/kit";

// export const GET = // sem můžeme vložit funkci, která se vykoná v moment, kdy zašlu GET požadavek na tento API server.
// export const POST = // to stejné zde.

export const POST = async function ({ request }) {
    const json = await request.json()
    console.log(json) // důvod proč to furt řve je ten, že musíme uživateli vrátit nějaký reponse.
    return new Response("Ahoj");
} satisfies RequestHandler


// nyní když se pošle POST požadavek na server tak se vypíše ahoj

// posílám post request na /api s nějakým json tělem.


//fetch("/api", {
//    method: "post",
//    body: '{"username": "tomáš", "password": "heslo"}'
//})


// kdybychom se koukli do network tabu, tak vidíme, že nám to vrátilo "Ahoj"
// a jen a pouze na serverové stráně vídíme to tělo jenž se poslalo.





















// kdybychom chtěli udělat funkční server, tak bychom museli udělat složkovou strukturu takto. Musíme to routovat podle složek. Tudíž nám vznikne hromada souborů.

/*
tree
.
├── article
│   ├── ban
│   │   └── +server.ts
│   ├── comments
│   │   ├── delete
│   │   │   └── +server.ts
│   │   ├── get
│   │   │   └── +server.ts
│   │   ├── load
│   │   │   └── +server.ts
│   │   └── send
│   │       └── +server.ts
│   ├── create
│   │   └── +server.ts
│   ├── delete
│   │   └── +server.ts
│   ├── edit
│   │   └── +server.ts
│   ├── get
│   │   └── +server.ts
│   ├── history
│   │   ├── change
│   │   │   └── +server.ts
│   │   ├── remove
│   │   │   └── +server.ts
│   │   └── +server.ts
│   ├── check
│   │   └── +server.ts
│   ├── rating
│   │   ├── get
│   │   │   └── +server.ts
│   │   └── send
│   │       └── +server.ts
│   ├── search
│   │   └── +server.ts
│   └── unban
│       └── +server.ts
├── bans
│   └── +server.ts
├── categories
│   ├── get
│   │   └── +server.ts
│   └── raw
│       └── +server.ts
├── category
│   ├── create
│   │   └── +server.ts
│   ├── delete
│   │   └── +server.ts
│   ├── edit
│   │   └── +server.ts
│   ├── get
│   │   └── +server.ts
│   ├── getPath
│   │   └── +server.ts
│   └── check
│       └── +server.ts
├── file
│   └── +server.ts
├── lockdown
│   ├── get
│   │   └── +server.ts
│   └── toggle
│       └── +server.ts
├── logged
│   └── +server.ts
├── login
│   └── +server.ts
├── logout
│   └── +server.ts
├── regex
│   ├── delete
│   │   └── +server.ts
│   ├── edit
│   │   └── +server.ts
│   ├── get
│   │   └── +server.ts
│   └── new
│       └── +server.ts
└── user
    └── getPermissions
        └── +server.ts

46 directories, 37 files
*/



// Naštěstí MegaMozek Patrik udělal package, který tohle za nás vyřeší.
// SvelekitApi zamezuje tomu, abychom měli strašně moc složek, a má vlastní routovací systém. 
// Nebude používat router co používá sveltekit na základě složek, ale bude dělat routy našim způsobem.
// Například můžeme si nadefinovat /API/out/register, My si nějakým způsobem nadefinujeme a pak když půjdeme na tuhle cestu tak se nám spustí nějaká funkce.

// 1. Musíme si udělat kontext, kontext je něco co se předává mezi požadavkama. Kontext dokáže ukládat data a posílat je dál, mezi funkcema.