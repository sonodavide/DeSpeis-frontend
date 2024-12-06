import { Component } from '@angular/core';
import { FilmDto } from '../../model/film';
import { AttoreDto } from '../../model/film';
import { RegistaDto } from '../../model/film';
import { GenereDto } from '../../model/film';
import { FilmService } from '../../services/film.service';
import { GenereService } from '../../services/genere.service';
import { RegistaService } from '../../services/regista.service';
import { AttoreService } from '../../services/attore.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
import cloneDeep  from 'lodash/cloneDeep';
@Component({
  selector: 'app-admin-film',
  templateUrl: './admin-film.component.html',
  styleUrls: ['./admin-film.component.css'],
})
export class AdminFilmComponent {
  SearchType = SearchType;
  esisteInUnoSpettacoloDaProiettare=false
  // Search data for different types
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.FilmModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.AttoreCreazione]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.AttoreModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.GenereCreazione]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.GenereModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.RegistaCreazione]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.RegistaModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
  };
  modificheAbilitate = false;
  searchTypeUtils: SearchTypeUtils;
  constructor(
    private filmService: FilmService,
    private genereService: GenereService,
    private registaService: RegistaService,
    private attoreService: AttoreService,
    private messageService: MessagesService
  ) {
    this.searchTypeUtils = new SearchTypeUtils(
      this.searchData,
      filmService,
      undefined,
      undefined,
      attoreService,
      registaService,
      genereService,
      undefined,
      undefined,
      undefined,
      messageService
    );
  }

  nuovoFilm: FilmDto = {
    id: undefined,
    titolo: '',
    durata: 0,
    trama: '',
    img: '',
    datauscita: '',
    attores: [],
    generes: [],
    registas: [],
  };
  ngOnInit(): void {
    this.searchTypeUtils.loader(SearchType.AttoreCreazione);
    this.searchTypeUtils.loader(SearchType.FilmModifica);
    this.searchTypeUtils.loader(SearchType.GenereCreazione);
    this.searchTypeUtils.loader(SearchType.RegistaCreazione);
  }

  filmSelezionato: FilmDto | null = null;
  filmSelezionatoModificato: FilmDto | null = null;

  // Funzione per creare un nuovo film
  creaFilm() {
    this.filmService.nuovo(this.nuovoFilm).subscribe({
      next : () => {
        this.messageService.addMessageSuccess("film aggiunto con successo!")
        this.resetNuovoFilm()
        this.searchTypeUtils.loader(SearchType.FilmModifica)
      },
      error : (error) => {
        if(error.status === 409){
          this.messageService.addMessageError("errore accavallamento spettacoli")
        }else if(error.status === 400){
          this.messageService.addMessageError("alcuni dati non vanno bene/film non trovato")
        }else{
          this.messageService.addMessageError("errore aggiunta film")
        }
      }
    });
  }

  // Funzione per modificare il film selezionato
  modificaFilm() {
    if (this.filmSelezionatoModificato) {
      this.filmService.nuovo(this.filmSelezionatoModificato).subscribe({
        next : () => {
          this.messageService.addMessageSuccess("film modificato con successo!")
          this.filmSelezionato=null
          this.filmSelezionatoModificato=null
          this.modificheAbilitate=false
          this.searchTypeUtils.loader(SearchType.FilmModifica)
        },
        error : (error) => {
          if(error.status === 409){
            this.messageService.addMessageError("errore accavallamento spettacoli")
          }else if(error.status === 400){
            this.messageService.addMessageError("alcuni dati non vanno bene/film non trovato")
          }else{
            this.messageService.addMessageError("errore modifica film")
          }
        }
      });
      this.modificheAbilitate = false;
    }
  }
  abilitaModifiche() {
    this.modificheAbilitate = true;
  }
  annullaModifiche() {
    if (this.filmSelezionato) {
      this.filmSelezionatoModificato = cloneDeep(this.filmSelezionato)
      this.modificheAbilitate = false;
      this.messageService.addMessageSuccess("ho reimpostato il film che avevi selezionato")
    }
  }

  // Funzione per eliminare il film selezionato
  eliminaFilm() {
    if (this.filmSelezionato) {
      this.filmService.elimina(this.filmSelezionato).subscribe({
        next : () => {
          this.messageService.addMessageSuccess("film eliminato con successo")
          this.filmSelezionato = null;
          this.filmSelezionatoModificato=null
          this.modificheAbilitate=false
        },
        error : (error) => {
          if(error.status === 409){
            this.messageService.addMessageError("errore eliminazione, il film serve per uno spettacolo ancora non proietato.")
          }else{
            this.messageService.addMessageError("errore eliminazione film")
          }
        }
      });
    }
  }

  // Funzione per selezionare un film dalla lista dei risultati
  selezionaFilm(film: FilmDto) {
    this.filmSelezionato = cloneDeep(film)
    this.filmSelezionatoModificato = cloneDeep(this.filmSelezionato);
    this.searchTypeUtils.getSearchData(SearchType.AttoreModifica).termine = '';
    this.searchTypeUtils.getSearchData(SearchType.GenereModifica).termine = '';
    this.searchTypeUtils.getSearchData(SearchType.RegistaModifica).termine = '';
    this.searchTypeUtils.loader(SearchType.AttoreModifica);
    this.searchTypeUtils.loader(SearchType.GenereModifica);
    this.searchTypeUtils.loader(SearchType.RegistaModifica);
    this.filmService.esisteInUnoSpettacoloDaProiettare(this.filmSelezionato.id!).subscribe({
      next : (response) => {
        this.esisteInUnoSpettacoloDaProiettare=response
      },
      error : () => {
        this.messageService.addMessageError("errore, non so se è prevista una proiezione del film")
      }
    })
  }

  aggiungiElemento(
    element: RegistaDto | AttoreDto | GenereDto,
    tipo: string
  ): void {
    switch (tipo) {
      case SearchType.AttoreCreazione: {
        if (!this.nuovoFilm.attores.some((a) => a.id === element.id)) {
          this.nuovoFilm.attores.push(element as AttoreDto);
        }
        break;
      }
      case SearchType.AttoreModifica: {
        if (this.filmSelezionatoModificato) {
          if (!this.filmSelezionatoModificato.attores.some((a) => a.id === element.id)) {
            this.filmSelezionatoModificato.attores.push(element as AttoreDto);
          }
        }
        break;
      }
      case SearchType.GenereCreazione: {
        if (!this.nuovoFilm.generes.some((a) => a.id === element.id)) {
          this.nuovoFilm.generes.push(element as GenereDto);
        }
        break;
      }

      case SearchType.GenereModifica: {
        if (this.filmSelezionatoModificato) {
          if (!this.filmSelezionatoModificato.generes.some((a) => a.id === element.id)) {
            this.filmSelezionatoModificato.generes.push(element as GenereDto);
          }
        }
        break;
      }

      case SearchType.RegistaCreazione: {
        if (!this.nuovoFilm.registas.some((a) => a.id === element.id)) {
          this.nuovoFilm.registas.push(element as RegistaDto);
        }
        break;
      }
      case SearchType.RegistaModifica: {
        if (this.filmSelezionatoModificato) {
          if (!this.filmSelezionatoModificato.registas.some((a) => a.id === element.id)) {
            this.filmSelezionatoModificato.registas.push(element as RegistaDto);
          }
        }
        break;
      }
    }
  }

  // Funzioni per rimuovere attore, regista e genere
  rimuoviElemento(
    element: RegistaDto | AttoreDto | GenereDto,
    tipo: string
  ): void {
    switch (tipo) {
      case SearchType.AttoreCreazione: {
        this.nuovoFilm.attores = this.nuovoFilm.attores.filter(
          (a) => a.id !== element.id
        );
        break;
      }
      case SearchType.AttoreModifica: {
        if (this.filmSelezionatoModificato) {
          this.filmSelezionatoModificato.attores =
            this.filmSelezionatoModificato.attores.filter(
              (a) => a.id !== element.id
            );
        }
        break;
      }
      case SearchType.GenereCreazione: {
        this.nuovoFilm.generes = this.nuovoFilm.generes.filter(
          (g) => g.id !== element.id
        );
        break;
      }
      case SearchType.GenereModifica: {
        if (this.filmSelezionatoModificato) {
          this.filmSelezionatoModificato.generes =
            this.filmSelezionatoModificato.generes.filter(
              (g) => g.id !== element.id
            );
        }
        break;
      }
      case SearchType.RegistaCreazione: {
        this.nuovoFilm.registas = this.nuovoFilm.registas.filter(
          (r) => r.id !== element.id
        );
        break;
      }
      case SearchType.RegistaModifica: {
        if (this.filmSelezionatoModificato) {
          this.filmSelezionatoModificato.registas =
            this.filmSelezionatoModificato.registas.filter(
              (r) => r.id !== element.id
            );
        }
        break;
      }
      default: {
        console.error('Tipo non valido:', tipo);
        break;
      }
    }
  }
  resetNuovoFilm() : void {
    this.nuovoFilm =  {
      id: undefined,
      titolo: '',
      durata: 0,
      trama: '',
      img: '',
      datauscita: '',
      attores: [],
      generes: [],
      registas: []
    };
  }
}
