import { FilmDto } from "./film";
import { SpettacoloSenzaFilmTagsDto } from "./spettacoloSenzaFilmTags";

export interface FilmSpettacoliDto{
    film: FilmDto,
    spettacoli: SpettacoloSenzaFilmTagsDto[]
}