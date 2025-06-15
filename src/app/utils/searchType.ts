export enum SearchType {
    FilmCreazione = 'filmCreazione',
    FilmModifica = 'filmModifica',
    AttoreCreazione = 'attoreCreazione',
    GenereCreazione = 'genereCreazione',
    RegistaCreazione = 'registaCreazione',
    AttoreModifica = 'attoreModifica',
    GenereModifica = 'genereModifica',
    RegistaModifica = 'registaModifica',
    SalaCreazione = 'salaCreazione',
    SalaModifica = 'salaModifica',
    SpettacoloCreazione = 'spettacoloCreazione',
    SpettacoloModifica = 'spettacoloModifica',
    Utente = 'utente',
    Biglietto = 'biglietto',
    Ordine = 'ordine',
    CercaGenere = 'cercaGenere',    
    CercaAttore = 'cercaAttore',
    CercaRegista = 'cercaRegista'    
  }

  export type SearchData = {
    termine: string;
    paginaCorrente: number;
    totalePagine: number;
    pageSize: number;
    risultati: any[]; // Sostituisci `any` con il tipo specifico dei risultati se noto
  };
  