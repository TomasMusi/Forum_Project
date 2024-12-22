// tady si vytvoříme proměnné, které chceme používat na serveru.
// například conn pro připojení k databázi, nebo proměnnou pro práci třeba s cookies

import { DATABASE_IP, DATABASE_PORT, DATABASE_USER } from "$env/static/private";
import { MysqlDialect } from "kysely";
import { createPool } from 'mysql2';

// dialect, takto nazývá kysely a je to prostředí které nás připojí k databázi.
// dialect dělá most mezi mysql2 a mezi kysely.


const dialect = new MysqlDialect({
    pool: createPool({
        host: DATABASE_IP,
        port: parseInt(DATABASE_PORT), // semka musíme dát parseInt(), protože v .env souboru jsou všechny věci ve stringu. A port musí být number.
        user: DATABASE_USER,
    })
})
// Jak funguje pool? udělá dopředu 10 připojení na databázi, a když mi chceme udělat nějaký SQL příkaz
// tak on nemusí udělat to, že musí teď říct: ,,Hej já tady mám udaje tak se musím připojit k databázi" a to chvíli trvá. On v podstatě má už nějaké připojení dopředu udělané.
// Například my řekneme: ,,Hej já chci udělat tento SQL příkaz, on nám řekne jo tady máš připojení" zde píšeme připojení.
// On nám vytváří připojení dopředu a potom nám vrací připojení do toho poolu.