import { Component } from '@angular/core';
import { NuovoSpettacoloDto } from '../../model/nuovoSpettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { FilmService } from '../../services/film.service';
import { SalaService } from '../../services/sala.service';
import { SearchType, SearchData } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
@Component({
  selector: 'app-admin-spettacolo',
  templateUrl: './admin-spettacolo.component.html',
  styleUrl: './admin-spettacolo.component.css',
})
export class AdminSpettacoloComponent {
  nuovoSpettacolo: NuovoSpettacoloDto = this.resetNuovoSpettacolo();
  SearchType = SearchType;
  searchTypeUtils: SearchTypeUtils;
  constructor(
    private spettacoloService: SpettacoloService,
    private prenotazioneService: PrenotazioneService,
    private filmService: FilmService,
    private salaService: SalaService,
    private messageService: MessagesService
  ) {
    this.searchTypeUtils = new SearchTypeUtils(
      this.searchData,
      filmService,
      salaService,
      spettacoloService,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      messageService
    );
  }

  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.FilmCreazione]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.FilmModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.SalaCreazione]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.SalaModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.SpettacoloModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
  };

  spettacoloSelezionato: NuovoSpettacoloDto | null = null;
  spettacoloSelezionatoModificato: NuovoSpettacoloDto | null = null;
  modificheAbilitate: boolean = false;

  ngOnInit(): void {
    this.searchTypeUtils.loader(SearchType.FilmCreazione);
    this.searchTypeUtils.loader(SearchType.SpettacoloModifica);
    this.searchTypeUtils.loader(SearchType.SalaCreazione);
  }

  creaSpettacolo() {
    this.spettacoloService.nuovo(this.nuovoSpettacolo).subscribe({
      next : () => {
        this.messageService.addMessageSuccess("spettacolo aggiunto con successo!")
      },
      error : (error) => {
        if(error.status === 400 ){
          this.messageService.addMessageError("alcuni dati non vanno bene.")
        } else if(error.status === 409){
          this.messageService.addMessageError("alcuni spettacoli sono in conflitto")
        }
         else {
          this.messageService.addMessageError("errore aggiunta spettacolo.")
        }
      }
    });
    this.nuovoSpettacolo = this.resetNuovoSpettacolo();
  }

  

  selezionaElemento(item: any, tipo: SearchType) {
    switch (tipo) {
      case SearchType.FilmCreazione:
        this.nuovoSpettacolo.film = item;
        break;
      case SearchType.SalaCreazione:
        this.nuovoSpettacolo.sala = item;
        break;
      case SearchType.FilmModifica:
        if (this.spettacoloSelezionatoModificato)
          this.spettacoloSelezionatoModificato.film = item;
        break;
      case SearchType.SalaModifica:
        if (this.spettacoloSelezionatoModificato)
          this.spettacoloSelezionatoModificato.sala = item;
        break;
    }
  }

  selezionaSpettacolo(spettacolo: NuovoSpettacoloDto) {
    this.spettacoloSelezionato = spettacolo;
    this.spettacoloSelezionatoModificato = { ...spettacolo };
    this.modificheAbilitate = false;
    this.searchTypeUtils.loader(SearchType.FilmModifica);
    this.searchTypeUtils.loader(SearchType.SalaModifica);
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaSpettacolo() {
    if (this.spettacoloSelezionatoModificato) {
      this.spettacoloService
        .nuovo(this.spettacoloSelezionatoModificato)
        .subscribe({
          next : () => {
            this.messageService.addMessageSuccess("spettacolo aggiunto con successo!")
          },
          error : (error) => {
            if(error.status === 400 ){
              this.messageService.addMessageError("alcuni dati non vanno bene.")
            } else if(error.status === 409){
              this.messageService.addMessageError("alcuni spettacoli sono in conflitto")
            }
             else {
              this.messageService.addMessageError("errore aggiunta spettacolo.")
            }
          }
        });
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
      this.spettacoloService.elimina(this.spettacoloSelezionato).subscribe();
      this.spettacoloSelezionato = null;
      this.spettacoloSelezionatoModificato = null;
    }
  }

  private resetNuovoSpettacolo(): NuovoSpettacoloDto {
    return {
      id: undefined,
      data: '', // Valore stringa vuoto per la data
      ora: '', // Valore stringa vuoto per l'ora
      prezzo: 0, // Imposta il prezzo a zero per iniziare
      sala: {
        id: undefined,
      },
      film: {
        id: undefined,
        titolo: '', // Stringa vuota per il titolo
        durata: 0, // Durata inizializzata a zero
        trama: '', // Stringa vuota per la trama
        img: '', // Stringa vuota per l'immagine
        datauscita: '', // Stringa vuota per la data di uscita
        attores: [], // Array vuoto per gli attori
        generes: [], // Array vuoto per i generi
        registas: [], // Array vuoto per i registi
      },
      acquistabile: false, // Impostato a false come predefinito
    };
  }
}
