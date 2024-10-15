import { Component } from '@angular/core';
import { NuovoSpettacoloDto } from '../../model/nuovoSpettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SpettacoloDto } from '../../model/spettacolo';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { PostiSpettacoloResponseDto } from '../../model/postiSpettacolo';
import { PostoResponseDto } from '../../model/postoResponseDto';
import { PrenotazioneRequestDto } from '../../model/prenotazioneRequest';
import { SalaDto } from '../../model/salaDto';
import { FilmDto } from '../../model/film';
import { FilmService } from '../../services/film.service';
import { SalaService } from '../../services/sala.service';
import { SearchType } from '../../utils/searchType';
import { PaginatedResponse } from '../../model/paginatedResponse';

@Component({
  selector: 'app-admin-spettacolo',
  templateUrl: './admin-spettacolo.component.html',
  styleUrl: './admin-spettacolo.component.css'
})
export class AdminSpettacoloComponent {
  nuovoSpettacolo: NuovoSpettacoloDto = this.resetNuovoSpettacolo()
  SearchType = SearchType
  constructor(private spettacoloService : SpettacoloService, private prenotazioneService : PrenotazioneService, private filmService : FilmService, private salaService : SalaService){}

  termineRicercaFilmCreazione : string = ""
  termineRicercaFilmModifica : string = ""
  termineRicercaSalaCreazione : string = ""
  termineRicercaSalaModifica  : string = ""

  risultatiRicercaFilmCreazione: FilmDto[] = [];
  risultatiRicercaFilmModifica: FilmDto[] = [];
  risultatiRicercaSalaModifica: SalaDto[] = [];
  risultatiRicercaSalaCreazione: SalaDto[] = [];

  // Variabili per la paginazione di Film - Creazione
  paginaCorrenteFilmCreazione: number = 0;
  totalePagineFilmCreazione: number = 0;
  pageSizeFilmCreazione: number = 4;

  // Variabili per la paginazione di Film - Modifica
  paginaCorrenteFilmModifica: number = 0;
  totalePagineFilmModifica: number = 0;
  pageSizeFilmModifica: number = 4;

  // Variabili per la paginazione di Sala - Creazione
  paginaCorrenteSalaCreazione: number = 0;
  totalePagineSalaCreazione: number = 0;
  pageSizeSalaCreazione: number = 4;

  // Variabili per la paginazione di Sala - Modifica
  paginaCorrenteSalaModifica: number = 0;
  totalePagineSalaModifica: number = 0;
  pageSizeSalaModifica: number = 4;

  // Variabili per la paginazione di Spettacolo - Creazione
  paginaCorrenteSpettacoloCreazione: number = 0;
  totalePagineSpettacoloCreazione: number = 0;
  pageSizeSpettacoloCreazione: number = 4;

  // Variabili per la paginazione di Spettacolo - Modifica
  paginaCorrenteSpettacoloModifica: number = 0;
  totalePagineSpettacoloModifica: number = 0;
  pageSizeSpettacoloModifica: number = 4;

  termineRicercaSpettacoloModifica: string = '';
  risultatiRicercaSpettacolo: NuovoSpettacoloDto[] = [];
  spettacoloSelezionato: NuovoSpettacoloDto | null = null;
  spettacoloSelezionatoModificato: NuovoSpettacoloDto | null = null;
  modificheAbilitate: boolean = false;

  ngOnInit() : void{
    this.loader(SearchType.FilmCreazione)
    this.loader(SearchType.SpettacoloModifica)
    this.loader(SearchType.SalaModifica)
  }

  creaSpettacolo() {
    this.spettacoloService.nuovo(this.nuovoSpettacolo)
    this.nuovoSpettacolo = this.resetNuovoSpettacolo()
  }

  
  eseguiRicerca(tipo: SearchType) {
    switch (tipo) {
      case SearchType.FilmCreazione: {
        this.filmService.cerca(this.termineRicercaFilmCreazione.trim(), this.paginaCorrenteFilmCreazione, this.pageSizeFilmCreazione)
          .subscribe((response: PaginatedResponse<FilmDto>) => {
            this.risultatiRicercaFilmCreazione = response.content;
            this.totalePagineFilmCreazione = response.totalPages;
          });
        break;
      }
        
      case SearchType.FilmModifica: {
        this.filmService.cerca(this.termineRicercaFilmModifica.trim(), this.paginaCorrenteFilmModifica, this.pageSizeFilmModifica)
          .subscribe((response: PaginatedResponse<FilmDto>) => {
            this.risultatiRicercaFilmModifica = response.content;
            this.totalePagineFilmModifica = response.totalPages;
          });
        break;
      }
      
      case SearchType.SalaCreazione: {
        this.salaService.cerca(this.termineRicercaSalaCreazione.trim(), this.paginaCorrenteSalaCreazione, this.pageSizeSalaCreazione)
          .subscribe((response: PaginatedResponse<SalaDto>) => {
            this.risultatiRicercaSalaCreazione = response.content;
            this.totalePagineSalaCreazione = response.totalPages;
          });
        break;
      }
        
      case SearchType.SalaModifica: {
        this.salaService.cerca(this.termineRicercaSalaModifica.trim(), this.paginaCorrenteSalaModifica, this.pageSizeSalaModifica)
          .subscribe((response: PaginatedResponse<SalaDto>) => {
            this.risultatiRicercaSalaModifica = response.content;
            this.totalePagineSalaModifica = response.totalPages;
          });
        break;
      }
      
      
      case SearchType.SpettacoloModifica: {
        this.spettacoloService.cerca(this.termineRicercaSpettacoloModifica.trim(), this.paginaCorrenteSpettacoloModifica, this.pageSizeSpettacoloModifica)
          .subscribe((response: PaginatedResponse<NuovoSpettacoloDto>) => {
            this.risultatiRicercaSpettacolo = response.content;
            this.totalePagineSpettacoloModifica = response.totalPages;
          });
        break;
      }
    }
}

  paginaSuccessiva(tipo: SearchType) {
    let termineRicerca = '';
    switch (tipo) {
      case SearchType.FilmCreazione:
        termineRicerca = this.termineRicercaFilmCreazione;
        if (this.paginaCorrenteFilmCreazione < this.totalePagineFilmCreazione - 1) {
          this.paginaCorrenteFilmCreazione++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      case SearchType.FilmModifica:
        termineRicerca = this.termineRicercaFilmModifica;
        if (this.paginaCorrenteFilmModifica < this.totalePagineFilmModifica - 1) {
          this.paginaCorrenteFilmModifica++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      case SearchType.SalaCreazione:
        termineRicerca = this.termineRicercaSalaCreazione;
        if (this.paginaCorrenteSalaCreazione < this.totalePagineSalaCreazione - 1) {
          this.paginaCorrenteSalaCreazione++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      case SearchType.SalaModifica:
        termineRicerca = this.termineRicercaSalaModifica;
        if (this.paginaCorrenteSalaModifica < this.totalePagineSalaModifica - 1) {
          this.paginaCorrenteSalaModifica++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;



      case SearchType.SpettacoloModifica:
        termineRicerca = this.termineRicercaSpettacoloModifica;
        if (this.paginaCorrenteSpettacoloModifica < this.totalePagineSpettacoloModifica - 1) {
          this.paginaCorrenteSpettacoloModifica++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      default:
        console.error('Tipo di ricerca non valido:', tipo);
    }
  }

  paginaPrecedente(tipo: SearchType) {
    let termineRicerca = '';
    switch (tipo) {
      case SearchType.FilmCreazione:
        termineRicerca = this.termineRicercaFilmCreazione;
        if (this.paginaCorrenteFilmCreazione > 0) {
          this.paginaCorrenteFilmCreazione--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      case SearchType.FilmModifica:
        termineRicerca = this.termineRicercaFilmModifica;
        if (this.paginaCorrenteFilmModifica > 0) {
          this.paginaCorrenteFilmModifica--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      case SearchType.SalaCreazione:
        termineRicerca = this.termineRicercaSalaCreazione;
        if (this.paginaCorrenteSalaCreazione > 0) {
          this.paginaCorrenteSalaCreazione--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      case SearchType.SalaModifica:
        termineRicerca = this.termineRicercaSalaModifica;
        if (this.paginaCorrenteSalaModifica > 0) {
          this.paginaCorrenteSalaModifica--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;



      case SearchType.SpettacoloModifica:
        termineRicerca = this.termineRicercaSpettacoloModifica;
        if (this.paginaCorrenteSpettacoloModifica > 0) {
          this.paginaCorrenteSpettacoloModifica--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;

      default:
        console.error('Tipo di ricerca non valido:', tipo);
    }
}

loader(tipo: SearchType) {
  switch(tipo) {
    case SearchType.FilmCreazione:
      this.filmService.getAllPaginated(this.paginaCorrenteFilmCreazione, this.pageSizeFilmCreazione)
        .subscribe((response: PaginatedResponse<FilmDto>) => {
          this.risultatiRicercaFilmCreazione = response.content;
          this.totalePagineFilmCreazione = response.totalPages;
        });
      break;

    case SearchType.FilmModifica:
      this.filmService.getAllPaginated(this.paginaCorrenteFilmModifica, this.pageSizeFilmModifica)
        .subscribe((response: PaginatedResponse<FilmDto>) => {
          this.risultatiRicercaFilmModifica = response.content;
          this.totalePagineFilmModifica = response.totalPages;
        });
      break;

    case SearchType.SalaCreazione:
      this.salaService.getAllPaginated(this.paginaCorrenteSalaCreazione, this.pageSizeSalaCreazione)
        .subscribe((response: PaginatedResponse<SalaDto>) => {
          this.risultatiRicercaSalaCreazione = response.content;
          this.totalePagineSalaCreazione = response.totalPages;
        });
      break;

    case SearchType.SalaModifica:
      this.salaService.getAllPaginated(this.paginaCorrenteSalaModifica, this.pageSizeSalaModifica)
        .subscribe((response: PaginatedResponse<SalaDto>) => {
          this.risultatiRicercaSalaModifica = response.content;
          this.totalePagineSalaModifica = response.totalPages;
        });
      break;


    case SearchType.SpettacoloModifica:
      this.spettacoloService.getAllPaginated(this.paginaCorrenteSpettacoloModifica, this.pageSizeSpettacoloModifica)
        .subscribe((response: PaginatedResponse<NuovoSpettacoloDto>) => {
          this.risultatiRicercaSpettacolo = response.content;
          this.totalePagineSpettacoloModifica = response.totalPages;
        });
      break;
  }
}

resettaRicerca(tipo: SearchType): void {
  switch(tipo) {
    case SearchType.FilmCreazione:
      this.termineRicercaFilmCreazione = '';
      this.paginaCorrenteFilmCreazione = 0;
      this.loader(SearchType.FilmCreazione);
      break;

    case SearchType.FilmModifica:
      this.termineRicercaFilmModifica = '';
      this.paginaCorrenteFilmModifica = 0;
      this.loader(SearchType.FilmModifica);
      break;

    case SearchType.SalaCreazione:
      this.termineRicercaSalaCreazione = '';
      this.paginaCorrenteSalaCreazione = 0;
      this.loader(SearchType.SalaCreazione);
      break;

    case SearchType.SalaModifica:
      this.termineRicercaSalaModifica = '';
      this.paginaCorrenteSalaModifica = 0;
      this.loader(SearchType.SalaModifica);
      break;

    
    case SearchType.SpettacoloModifica:
      this.termineRicercaSpettacoloModifica = '';
      this.paginaCorrenteSpettacoloModifica = 0;
      this.loader(SearchType.SpettacoloModifica);
      break;
  }
}

  selezionaElemento(item : any, tipo : SearchType){
    switch(tipo){
      case SearchType.FilmCreazione : this.nuovoSpettacolo?.film!=item;break;
      case SearchType.SalaCreazione : this.nuovoSpettacolo.sala=item;break;
      case SearchType.FilmModifica : this.spettacoloSelezionatoModificato?.film!=item;break;
      case SearchType.SalaCreazione : this.spettacoloSelezionatoModificato?.sala!=item;break;
    }
  }

  selezionaSpettacolo(spettacolo: NuovoSpettacoloDto) {
    this.spettacoloSelezionato = spettacolo;
    this.spettacoloSelezionatoModificato = { ...spettacolo };
    this.modificheAbilitate = false;
    this.getPosti()
    this.loader(SearchType.FilmModifica)
    this.loader(SearchType.SalaModifica)
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaSpettacolo() {
    if(this.spettacoloSelezionatoModificato){
      this.spettacoloService.nuovo(this.spettacoloSelezionatoModificato).subscribe()
      this.modificheAbilitate = false;
    }
  }

  annullaModifiche() {
    if (this.spettacoloSelezionato) {
      this.spettacoloSelezionatoModificato = { ...this.spettacoloSelezionato };
      this.modificheAbilitate = false;
    }
  }

  eliminaSpettacolo() {
    if (this.spettacoloSelezionato) {
      this.spettacoloService.elimina(this.spettacoloSelezionato).subscribe()
      this.spettacoloSelezionato = null;
      this.spettacoloSelezionatoModificato = null;
    }
  }

  private resetNuovoSpettacolo() : NuovoSpettacoloDto {
    return {
      id: undefined,
      data: '',          // Valore stringa vuoto per la data
      ora: '',           // Valore stringa vuoto per l'ora
      prezzo: 0,         // Imposta il prezzo a zero per iniziare
      sala: {
        id: undefined,           
        post: new Set()  // Set vuoto per i posti in sala
      },
      film: {
        id: undefined,
        titolo: '',      // Stringa vuota per il titolo
        durata: 0,       // Durata inizializzata a zero
        trama: '',       // Stringa vuota per la trama
        img: '',         // Stringa vuota per l'immagine
        datauscita: '',  // Stringa vuota per la data di uscita
        attores: [],     // Array vuoto per gli attori
        generes: [],     // Array vuoto per i generi
        registas: []     // Array vuoto per i registi
      },
      acquistabile: false // Impostato a false come predefinito
    };
  }



  //posti?: PostiSpettacoloResponseDto;
  posti = new Map()
  postiSelezionati: number[] = [];
  getPosti() : void{
    if(this.spettacoloSelezionato)
    this.spettacoloService.getPostiSpettacolo(this.spettacoloSelezionato.id!).subscribe(posti =>{
      this.posti = new Map(Object.entries(posti.posti));
      
    } )
  }

  getStatoClasse(posto: PostoResponseDto){
    switch(posto.stato){
      case "libero" : {
        return "libero"
      }
      case "occupato" : {
        return "libero"
      }
      case "bloccato" : {
        return "bloccato"
      }
      default : {
        return "bloccato"
      }
    }
  }
  isPostoSelezionato(postoId: number): boolean {
    return this.postiSelezionati.includes(postoId);
  }
  togglePosto(postoId: number) {
    const index = this.postiSelezionati.indexOf(postoId);
    if (index === -1) {
      this.postiSelezionati.push(postoId);
    } else {
      this.postiSelezionati.splice(index, 1);
    }
  }

  blocca() : void {
    if(this.spettacoloSelezionato){
      const bloccoRequest : PrenotazioneRequestDto = {postiIds : this.postiSelezionati, userId : 1, spettacoloId : this.spettacoloSelezionato.id!}
      alert("fatto!")
      //this.prenotazioneService.blocca(bloccoRequest).subscribe()
      this.postiSelezionati = []
    }
  }
}
