import { FilmDto } from "./film";

export interface SpettacoloSenzaFilmDto {
    id: number;
    data: string;       // LocalDate rappresentato come stringa in formato 'YYYY-MM-DD'
    ora: string;        // LocalTime rappresentato come stringa in formato 'HH:mm:ss'
    prezzo: number;     // BigDecimal può essere rappresentato come number
    salaId: number;
    dataFine: string;   // LocalDate rappresentato come stringa in formato 'YYYY-MM-DD'
    oraFine: string;    // LocalTime rappresentato come stringa in formato 'HH:mm:ss'
  }