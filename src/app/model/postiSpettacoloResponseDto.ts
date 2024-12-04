import { PostiResponse } from "./postiResponse";
import { SpettacoloSenzaFilmDto } from "./spettacoloSenzaFilm";

export interface PostiSpettacoloResponseDto {
    spettacoloSenzaFilmDto : SpettacoloSenzaFilmDto
    postiPerFila : PostiPerFila[]
}

export interface PostiPerFila {
    fila : string
    posti : PostiResponse[]
}