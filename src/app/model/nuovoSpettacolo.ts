import { FilmDto } from "./film";
import { SalaDto } from "./salaDto";

export interface NuovoSpettacoloDto {
    id?: number;
    data: string;       // LocalDate rappresentato come stringa in formato 'YYYY-MM-DD'
    ora: string;        // LocalTime rappresentato come stringa in formato 'HH:mm:ss'
    prezzo: number;     // BigDecimal può essere rappresentato come number
    salaId: SalaDto;
    film: FilmDto;
    acquistabile: boolean;
  }
  