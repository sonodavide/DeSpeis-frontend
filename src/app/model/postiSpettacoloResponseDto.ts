import { PostiResponse } from "./postiResponse";
import { SpettacoloSenzaFilmTagsDto } from "./spettacoloSenzaFilmTags";

export interface PostiSpettacoloResponseDto {
    spettacoloSenzaFilmTagsDto : SpettacoloSenzaFilmTagsDto
    postiPerFila : PostiPerFila[]
}

export interface PostiPerFila {
    fila : string
    posti : PostiResponse[]
}