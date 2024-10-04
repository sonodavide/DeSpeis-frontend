import { FilmDto } from "./film";
import { SpettacoloSenzaFilmDto } from "./spettacoloSenzaFilm";

export interface FilmSpettacoliDto{
    film: FilmDto,
    spettacoli: SpettacoloSenzaFilmDto[]
}