export interface FilmDto {
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
  
  export interface RegistaDto {
    id: number;
    nome: string;
    cognome: string;
  }
  
  export interface AttoreDto {
    id: number;
    nome: string;
    cognome: string;
  }
  
  export interface GenereDto {
    id: number;
    genere: string;
  }
  