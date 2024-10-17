
export interface SalaConPosti {
    id? : number
    postis : PostiDto[]
}

export interface PostiDto {
    id? : number,
    fila : string,
    sedili : number
}