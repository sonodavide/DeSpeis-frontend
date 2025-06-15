import { AttoreDto } from "./film";
import { GenereDto } from "./film";
import { RegistaDto } from "./film";
export interface NuovoFilmDto {
    id: number;
    titolo: string;
    durata: number;
    trama: string;
    img: string;
    datauscita: string; // LocalDate può essere rappresentato come string in formato 'YYYY-MM-DD'
    attores: AttoreDto[];
    generes: GenereDto[];
    registas: RegistaDto[];
  }