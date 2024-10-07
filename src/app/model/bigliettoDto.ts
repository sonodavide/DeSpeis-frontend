import { PostoDto } from "./postoDto";

// biglietto-dto.model.ts
export interface BigliettoDto {
    id: number;
    utenteId: number;
    ordineId: number;
    postospettacoloPosto: PostoDto
    postospettacoloSpettacoloData: string;
    postospettacoloSpettacoloOra: string;
    postospettacoloSpettacoloSalaId: number;
    postospettacoloSpettacoloFilmTitolo: string;
    prezzo: number;
  }
  