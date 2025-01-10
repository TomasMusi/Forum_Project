import type { Users } from "./database";

// data užiivatele které budou uložené v Cookies
// nyní tam chceme vše co má uživatel uloženo akorát nechceme tam mít tam password

// co dělá omit? odstraní nám union stringů které jsou v nějaké proměnné, nechceme nikdy mít uloženo v cookies žádné data, které by někdo mohl/měl vědět.

type FixId<$Data> = Omit<$Data, "id"> & {
    id: number
}

export type UserData = Omit<FixId<Users>, "password">



// buď to bude logged false, nebo to bude logged true a bude to mít data
export type UserState = {
    logged: false
} | {
    logged: true;
    data: UserData;
}