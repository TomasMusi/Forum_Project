// tady si vytvoříme proměnné, které chceme používat na serveru.
// například conn pro připojení k databázi, nebo proměnnou pro práci třeba s cookies

import type { DB } from "$/types/database";
import { DATABASE_IP, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, WEBTOKEN } from "$env/static/private";
import { Kysely } from "kysely";
import { MysqlDialect } from "kysely";
import { createPool } from 'mysql2';
import { JWTCookies } from "./cookies/main";

// dialect, takto nazývá kysely a je to prostředí které nás připojí k databázi.
// dialect dělá most mezi mysql2 a mezi kysely.


const dialect = new MysqlDialect({
    //@ts-ignore 
    // (Zde se objeví chyba, ale normálně to funguje akorát to hází typovou chybu, kvůli tomu jak ty package jsou vyvinuty.)
    pool: createPool({
        host: DATABASE_IP,
        port: parseInt(DATABASE_PORT), // semka musíme dát parseInt(), protože v .env souboru jsou všechny věci ve stringu. A port musí být number.
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
    })
});




// Existují dva typy připojování k databázi basic, který zabere více času ,,Hej chci data, připojím se získám je odpojím se" nebo tu existuje způsob Pool

// Jak funguje pool? udělá dopředu 10 připojení na databázi, a když mi chceme udělat nějaký SQL příkaz
// tak on nemusí udělat to, že musí teď říct: ,,Hej já tady mám udaje tak se musím připojit k databázi" a to chvíli trvá. On v podstatě má už nějaké připojení dopředu udělané.
// Například my řekneme: ,,Hej já chci udělat tento SQL příkaz, on nám řekne jo tady máš připojení" zde píšeme připojení.
// On nám vytváří připojení dopředu a potom nám vrací připojení do toho poolu.




//   Kyselymu musíme dát typy z DB
export const conn = new Kysely<DB>({
    dialect // zde dáme proměnnou z vrchu ve které jsme nastavovali, připojení na databázi.
})



export const jwt = new JWTCookies(WEBTOKEN);


// nyní když napíšeme jwt. tak nám vyskočí setCookie, getCookie