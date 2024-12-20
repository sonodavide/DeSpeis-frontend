import { Component } from '@angular/core';
import { NuovoSpettacoloDto } from '../../model/nuovoSpettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { FilmService } from '../../services/film.service';
import { SalaService } from '../../services/sala.service';
import { SearchType, SearchData } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
import cloneDeep  from 'lodash/cloneDeep';
import { PostiPerFilaUtils } from '../../utils/postiPerFilaUtils';
import { SpettacoloSenzaFilmTagsDto } from '../../model/spettacoloSenzaFilmTags';
@Component({
  selector: 'app-admin-spettacolo',
  templateUrl: './admin-spettacolo.component.html',
  styleUrl: './admin-spettacolo.component.css',
})
export class AdminSpettacoloComponent {
  nuovoSpettacolo: NuovoSpettacoloDto = this.resetNuovoSpettacolo();
  SearchType = SearchType;
  searchTypeUtils: SearchTypeUtils;
  stato : string = "";
  public postiPerFilaUtilsMiei: PostiPerFilaUtils = new PostiPerFilaUtils();
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
        this.nuovoSpettacolo=this.resetNuovoSpettacolo()
        this.searchTypeUtils.loader(SearchType.SpettacoloModifica)
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

  selezionaSpettacolo(spettacolo: SpettacoloSenzaFilmTagsDto) {
    this.spettacoloService.getNuovoSpettacoloById(spettacolo.id).subscribe({
      next : (data) =>{
        data.ora=data.ora.substring(0, 5); 
        this.spettacoloService.getPostiSpettacolo(data.id!).subscribe(response =>{
          this.postiPerFilaUtilsMiei.setPostiPerFila(response.postiPerFila)
        })
        this.spettacoloSelezionato = cloneDeep(data);
        this.spettacoloSelezionatoModificato = cloneDeep(data)
        this.modificheAbilitate = false;
        this.searchTypeUtils.loader(SearchType.FilmModifica);
        this.searchTypeUtils.loader(SearchType.SalaModifica);
        this.spettacoloService.getStato(data.id!).subscribe(response => {
          console.log(response)
          this.stato=response
        })
      },
      error : (error) =>{
        this.messageService.addMessageError("non sono riuscito a selezionare lo spettacolo")
      }
    })
    
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
            this.messageService.addMessageSuccess("spettacolo modificato con successo!")
            this.modificheAbilitate = false;
            this.spettacoloSelezionato=null
            this.spettacoloSelezionatoModificato=null
            this.searchTypeUtils.loader(SearchType.SpettacoloModifica)
          },
          error : (error) => {
            if(error.status === 400 ){
              this.messageService.addMessageError("alcuni dati non vanno bene. O forse stai cercando di modificare sala/film di uno spettacolo che ormai è finito/in corso.")
            } else if(error.status === 409){
              this.messageService.addMessageError("alcuni spettacoli sono in conflitto/qualcuno ha già prenotato/è finito/in corso")
            }
             else {
              this.messageService.addMessageError("errore modifica spettacolo.")
            } 
          }
        });
    }
  }

  annullaModifiche() {
    if (this.spettacoloSelezionato) {
      this.spettacoloSelezionatoModificato = cloneDeep(this.spettacoloSelezionato)
      this.modificheAbilitate = false;
      this.messageService.addMessageSuccess("ho reimpostato lo spettacolo che avevi selezionato")
    }
  }

  eliminaSpettacolo() {
    if (this.spettacoloSelezionato) {
      this.spettacoloService.elimina(this.spettacoloSelezionato).subscribe({
        next: () => {
          this.messageService.addMessageSuccess(
            'spettacolo eliminato con successo'
          );
          this.spettacoloSelezionato = null;
          this.spettacoloSelezionatoModificato = null;
          this.modificheAbilitate = false;
          this.searchTypeUtils.loader(SearchType.SpettacoloModifica)
        },
        error: () => {
          this.messageService.addMessageError('errore eliminazione spettacolo. Forse è già finito/in corso/ci sono prenotazioni?');
        },
      });
    }
  }

  private resetNuovoSpettacolo(): NuovoSpettacoloDto {
    return {
      id: undefined,
      data: '', 
      ora: '', 
      prezzo: 0, 
      sala: {
        id: undefined,
      },
      film: {
        id: undefined,
        titolo: '', 
        durata: 0, 
        trama: '', 
        img: '', 
        datauscita: '', 
        attores: [], 
        generes: [], 
        registas: [], 
      },
      acquistabile: false, 
    };
  }
  
}
