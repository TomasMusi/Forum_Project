import { loggedProcedure } from "$/lib/server/api";
import type { ReponseWithData, Response } from "$/types/responses";

export default loggedProcedure.GET.query(async ({ ev: { cookies } }) => {
    cookies.delete("session", {
        path: "/"
    })

    return {
        status: true,
    } satisfies Response;
})

