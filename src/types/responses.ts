// kvůli tomu, že chceme aby z API přicházeli nám nějaké reponses, tak si vytvoříme tento soubor.

// důvod proč zde dáváme pouze status true a ne false, je ten že @patrick115/sveltekitapi package už to defaultně za nás řeší.
export type Response = {
    status: true,
}


// to and (&), tam dáváme kdybychom chtěli do toho Response něco přidat
export type ReponseWithData<$DataType> = Response & {
    data: $DataType
}


