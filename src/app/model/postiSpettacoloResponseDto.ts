import { PostiResponse } from "./postiResponse";
import { SpettacoloSenzaFilmTagsDto } from "./spettacoloSenzaFilmTags";

export interface PostiSpettacoloResponseDto {
    spettacoloSenzaFilmDto : SpettacoloSenzaFilmTagsDto
    postiPerFila : PostiPerFila[]
}

export interface PostiPerFila {
    fila : string
    posti : PostiResponse[]
}