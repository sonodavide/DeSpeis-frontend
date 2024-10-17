
// biglietto-dto.model.ts
export interface BigliettoDto {
    id: number;
    utenteId: number;
    ordineId: number;
    postospettacoloSedile: number;
    postospettacoloFila : string;
    postospettacoloSpettacoloData: string;
    postospettacoloSpettacoloOra: string;
    postospettacoloSpettacoloSalaId: number;
    postospettacoloSpettacoloFilmTitolo: string;
    prezzo: number;
  }
  