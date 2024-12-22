import { Server } from "$/lib/server/server";

// Jestliže dostaneme cokoliv na stránce pod GET tak zavolej tuhle tu funkci Handler
// Díky tomuhle už když dáme /api/example tak se nám spustí ta API.

export const GET = Server.handler; //  GET Typicky dej mi nějaká data, Vrať mi seznam příspěvků.
export const POST = Server.handler; // POST Dej mi příspěvky které mají nějaký filtr, například ID je větší než 10.
export const PUT = Server.handler; // Kdybych chtěl vložit příspěvek dám PUT
export const DELETE = Server.handler; // Typicky kdybych chtěl například smazat příspěvek použiji DELETE.
export const PATCH = Server.handler; // Jestli chceme cokoliv upravit tak použijeme PATCH