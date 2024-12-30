import { browser } from '$app/environment'
import Swal, { type SweetAlertOptions } from 'sweetalert2'


export const SwalAlert = (data: SweetAlertOptions) => {

    // kdybychom nebyli v prohlížeči, tak aby se to nezobrazovalo na serveru.t
    if (!browser) {
        return {
            isConfirmed: false
        } as const
    }
    // důvod proč dáváme zde return, je kvůli tomu, že v tom .fire je promise, a kdybychom chtěli udělat nějaký if popup, například, zda skutečně chceš něco smazat, tak nám to vrací promise, protože nějaká akce se může stát v budoucnosti.
    return Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
        ...data // abychom mohli si sami přidávat věci v ostatních souborech. Kdybyhcom tam dali jenom data, tak by se z toho stal další object což nechceme, chceme mít 1 object!
    })
}