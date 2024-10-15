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
import { SearchType } from '../../utils/searchType';
@Component({
  selector: 'app-admin-film',
  templateUrl: './admin-film.component.html',
  styleUrls: ['./admin-film.component.css']
})
export class AdminFilmComponent {
  SearchType = SearchType
  constructor(private filmService : FilmService, private genereService : GenereService, private registaService : RegistaService, private attoreService : AttoreService){}



  nuovoFilm: FilmDto = {
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
  ngOnInit() : void{
    this.loader(SearchType.AttoreCreazione)
    this.loader(SearchType.FilmModifica)
    this.loader(SearchType.GenereCreazione)
    this.loader(SearchType.RegistaCreazione)
  }
  

  
  filmSelezionato: FilmDto | null = null;
  filmSelezionatoModificato: FilmDto | null = null;
  // Termini di ricerca distinti per creazione e modifica
  termineRicercaFilm: string = '';
  termineRicercaAttoreCreazione: string = '';
  termineRicercaRegistaCreazione: string = '';
  termineRicercaGenereCreazione: string = '';
  termineRicercaAttoreModifica: string = '';
  termineRicercaRegistaModifica: string = '';
  termineRicercaGenereModifica: string = '';

  // Risultati di ricerca distinti per creazione e modifica
  risultatiRicercaFilm: FilmDto[] = [];
  risultatiRicercaAttoriCreazione: AttoreDto[] = [];
  risultatiRicercaRegistiCreazione: RegistaDto[] = [];
  risultatiRicercaGeneriCreazione: GenereDto[] = [];
  risultatiRicercaAttoriModifica: AttoreDto[] = [];
  risultatiRicercaRegistiModifica: RegistaDto[] = [];
  risultatiRicercaGeneriModifica: GenereDto[] = [];
  modificheAbilitate = false;
  
  films: FilmDto[] = [];

  paginaCorrenteFilm = 0;
  totalePagineFilm = 0;
  pageSizeFilm = 4;

  paginaCorrenteAttoriCreazione = 0;
  totalePagineAttoriCreazione = 0;
  pageSizeAttoriCreazione = 4;

  paginaCorrenteRegistiCreazione = 0;
  totalePagineRegistiCreazione = 0;
  pageSizeRegistiCreazione = 4;

  paginaCorrenteGeneriCreazione = 0;
  totalePagineGeneriCreazione = 0;
  pageSizeGeneriCreazione = 4;

  paginaCorrenteAttoriModifica = 0;
  totalePagineAttoriModifica = 0;
  pageSizeAttoriModifica = 4;

  paginaCorrenteRegistiModifica = 0;
  totalePagineRegistiModifica = 0;
  pageSizeRegistiModifica = 4;

  paginaCorrenteGeneriModifica = 0;
  totalePagineGeneriModifica = 0;
  pageSizeGeneriModifica = 4;

  

  // Funzione per creare un nuovo film
  creaFilm() {
    this.filmService.nuovo(this.nuovoFilm).subscribe()
    this.resetNuovoFilm();
    
    
  }

  // Funzione per modificare il film selezionato
  modificaFilm() {
    if (this.filmSelezionatoModificato) {
      this.filmService.nuovo(this.filmSelezionatoModificato).subscribe()
      this.modificheAbilitate=false;
    }
  }
  abilitaModifiche() {
    this.modificheAbilitate = true;
  }
  annullaModifiche(){
    if(this.filmSelezionato){
      this.filmSelezionatoModificato = {...this.filmSelezionato}
      this.modificheAbilitate=false;
    }
  }

  // Funzione per eliminare il film selezionato
  eliminaFilm() {
    if (this.filmSelezionato) {
      this.filmService.elimina(this.filmSelezionato).subscribe()
      this.filmSelezionato = null;
    }
  }


  // Funzione per selezionare un film dalla lista dei risultati
  selezionaFilm(film: FilmDto) {
    this.filmSelezionato = { ...film };
    this.filmSelezionatoModificato = this.filmSelezionato
    this.loader(SearchType.AttoreModifica)
    this.termineRicercaAttoreModifica=""
    this.termineRicercaRegistaModifica=""
    this.termineRicercaGenereModifica=""
    this.loader(SearchType.GenereModifica)
    this.loader(SearchType.RegistaModifica)
    this.risultatiRicercaFilm = []
  }

  eseguiRicerca(tipo: SearchType) {
    switch (tipo) {
      case SearchType.AttoreCreazione: {
        this.attoreService.cerca(this.termineRicercaAttoreCreazione.trim(), this.paginaCorrenteAttoriCreazione, this.pageSizeAttoriCreazione)
          .subscribe((response: PaginatedResponse<AttoreDto>) => {
            this.risultatiRicercaAttoriCreazione = response.content;
            this.totalePagineAttoriCreazione = response.totalPages;
          });
        break;
      }
        
      case SearchType.GenereCreazione: {
        this.genereService.cerca(this.termineRicercaGenereCreazione.trim(), this.paginaCorrenteGeneriCreazione, this.pageSizeGeneriCreazione)
          .subscribe((response: PaginatedResponse<GenereDto>) => {
            this.risultatiRicercaGeneriCreazione = response.content;
            this.totalePagineGeneriCreazione = response.totalPages;
          });
        break;
      }
      
      case SearchType.AttoreModifica: {
        this.attoreService.cerca(this.termineRicercaAttoreModifica.trim(), this.paginaCorrenteAttoriModifica, this.pageSizeAttoriModifica)
          .subscribe((response: PaginatedResponse<AttoreDto>) => {
            this.risultatiRicercaAttoriModifica = response.content;
            this.totalePagineAttoriModifica = response.totalPages;
          });
        break;
      }
        
      case SearchType.GenereModifica: {
        this.genereService.cerca(this.termineRicercaGenereModifica.trim(), this.paginaCorrenteGeneriModifica, this.pageSizeGeneriModifica)
          .subscribe((response: PaginatedResponse<GenereDto>) => {
            this.risultatiRicercaGeneriModifica = response.content;
            this.totalePagineGeneriModifica = response.totalPages;
          });
        break;
      }
  
      case SearchType.RegistaCreazione: {
        this.registaService.cerca(this.termineRicercaRegistaCreazione.trim(), this.paginaCorrenteRegistiCreazione, this.pageSizeRegistiCreazione)
          .subscribe((response: PaginatedResponse<RegistaDto>) => {
            this.risultatiRicercaRegistiCreazione = response.content;
            this.totalePagineRegistiCreazione = response.totalPages;
          });
        break;
      }
  
      case SearchType.RegistaModifica: {
        this.registaService.cerca(this.termineRicercaRegistaModifica.trim(), this.paginaCorrenteRegistiModifica, this.pageSizeRegistiModifica)
          .subscribe((response: PaginatedResponse<RegistaDto>) => {
            this.risultatiRicercaRegistiModifica = response.content;
            this.totalePagineRegistiModifica = response.totalPages;
          });
        break;
      }
  
      case SearchType.FilmModifica: {
        this.filmService.cerca(this.termineRicercaFilm.trim(), this.paginaCorrenteFilm, this.pageSizeFilm)
          .subscribe((response: PaginatedResponse<FilmDto>) => {
            this.risultatiRicercaFilm = response.content;
            this.totalePagineFilm = response.totalPages;
          });
        break;
      }
    }
  }
  
  

  




  aggiungiElemento(element: RegistaDto | AttoreDto | GenereDto, tipo: string) : void{
    switch(tipo){
      case SearchType.AttoreCreazione : {
        if(!this.nuovoFilm.attores.some(a => a.id === element.id)) {
          this.nuovoFilm.attores.push(element as AttoreDto);
        }
        break;
      }
      case SearchType.AttoreModifica :{
        if(this.filmSelezionatoModificato){
          if(!this.nuovoFilm.attores.some(a => a.id === element.id)) {
            this.filmSelezionatoModificato.attores.push(element as AttoreDto);
          }
        }
        break;
      }
      case SearchType.GenereCreazione : {
        if(!this.nuovoFilm.generes.some(a => a.id === element.id)) {
          this.nuovoFilm.generes.push(element as GenereDto);
        }
        break
      }

      case SearchType.GenereModifica : {
        if(this.filmSelezionatoModificato){
          if(!this.nuovoFilm.generes.some(a => a.id === element.id)) {
            this.filmSelezionatoModificato.generes.push(element as GenereDto);
          }
        }
        break
      }

      case SearchType.RegistaCreazione : {
        if(!this.nuovoFilm.registas.some(a => a.id === element.id)) {
          this.nuovoFilm.registas.push(element as RegistaDto);
        }
        break
      }
      case SearchType.RegistaModifica : {
        if(this.filmSelezionatoModificato){
          if(!this.nuovoFilm.registas.some(a => a.id === element.id)) {
            this.filmSelezionatoModificato.registas.push(element as RegistaDto);
          }
        }
        break
      }
    }
  }
  

  // Funzioni per rimuovere attore, regista e genere
  rimuoviElemento(element: RegistaDto | AttoreDto | GenereDto, tipo: string): void {
    switch (tipo) {
        case SearchType.AttoreCreazione: {
            this.nuovoFilm.attores = this.nuovoFilm.attores.filter(a => a.id !== element.id);
            break;
        }
        case SearchType.AttoreModifica: {
            if (this.filmSelezionatoModificato) {
                this.filmSelezionatoModificato.attores = this.filmSelezionatoModificato.attores.filter(a => a.id !== element.id);
            }
            break;
        }
        case SearchType.GenereCreazione: {
            this.nuovoFilm.generes = this.nuovoFilm.generes.filter(g => g.id !== element.id);
            break;
        }
        case SearchType.GenereModifica: {
            if (this.filmSelezionatoModificato) {
                this.filmSelezionatoModificato.generes = this.filmSelezionatoModificato.generes.filter(g => g.id !== element.id);
            }
            break;
        }
        case SearchType.RegistaCreazione: {
            this.nuovoFilm.registas = this.nuovoFilm.registas.filter(r => r.id !== element.id);
            break;
        }
        case SearchType.RegistaModifica: {
            if (this.filmSelezionatoModificato) {
                this.filmSelezionatoModificato.registas = this.filmSelezionatoModificato.registas.filter(r => r.id !== element.id);
            }
            break;
        }
        default: {
            console.error("Tipo non valido:", tipo);
            break;
        }
    }
}

  // Funzione per resettare il form di creazione
  private resetNuovoFilm() {
    this.termineRicercaAttoreCreazione = '';
    this.termineRicercaRegistaCreazione = '';
    this.termineRicercaGenereCreazione = '';
    this.nuovoFilm = {
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



  paginaSuccessiva(tipo: SearchType) {
    let termineRicerca = '';
    switch (tipo) {
      case SearchType.FilmModifica:
        termineRicerca = this.termineRicercaFilm;
        if (this.paginaCorrenteFilm < this.totalePagineFilm - 1) {
          this.paginaCorrenteFilm++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.AttoreCreazione:
        termineRicerca = this.termineRicercaAttoreCreazione;
        if (this.paginaCorrenteAttoriCreazione < this.totalePagineAttoriCreazione - 1) {
          this.paginaCorrenteAttoriCreazione++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.GenereCreazione:
        termineRicerca = this.termineRicercaGenereCreazione;
        if (this.paginaCorrenteGeneriCreazione < this.totalePagineGeneriCreazione - 1) {
          this.paginaCorrenteGeneriCreazione++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.RegistaCreazione:
        termineRicerca = this.termineRicercaRegistaCreazione;
        if (this.paginaCorrenteRegistiCreazione < this.totalePagineRegistiCreazione - 1) {
          this.paginaCorrenteRegistiCreazione++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.AttoreModifica:
        termineRicerca = this.termineRicercaAttoreModifica;
        if (this.paginaCorrenteAttoriModifica < this.totalePagineAttoriModifica - 1) {
          this.paginaCorrenteAttoriModifica++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.GenereModifica:
        termineRicerca = this.termineRicercaGenereModifica;
        if (this.paginaCorrenteGeneriModifica < this.totalePagineGeneriModifica - 1) {
          this.paginaCorrenteGeneriModifica++;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.RegistaModifica:
        termineRicerca = this.termineRicercaRegistaModifica;
        if (this.paginaCorrenteRegistiModifica < this.totalePagineRegistiModifica - 1) {
          this.paginaCorrenteRegistiModifica++;
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
      case SearchType.FilmModifica:
        termineRicerca = this.termineRicercaFilm;
        if (this.paginaCorrenteFilm > 0) {
          this.paginaCorrenteFilm--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.AttoreCreazione:
        termineRicerca = this.termineRicercaAttoreCreazione;
        if (this.paginaCorrenteAttoriCreazione > 0) {
          this.paginaCorrenteAttoriCreazione--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.GenereCreazione:
        termineRicerca = this.termineRicercaGenereCreazione;
        if (this.paginaCorrenteGeneriCreazione > 0) {
          this.paginaCorrenteGeneriCreazione--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.RegistaCreazione:
        termineRicerca = this.termineRicercaRegistaCreazione;
        if (this.paginaCorrenteRegistiCreazione > 0) {
          this.paginaCorrenteRegistiCreazione--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.AttoreModifica:
        termineRicerca = this.termineRicercaAttoreModifica;
        if (this.paginaCorrenteAttoriModifica > 0) {
          this.paginaCorrenteAttoriModifica--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.GenereModifica:
        termineRicerca = this.termineRicercaGenereModifica;
        if (this.paginaCorrenteGeneriModifica > 0) {
          this.paginaCorrenteGeneriModifica--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      case SearchType.RegistaModifica:
        termineRicerca = this.termineRicercaRegistaModifica;
        if (this.paginaCorrenteRegistiModifica > 0) {
          this.paginaCorrenteRegistiModifica--;
          termineRicerca ? this.eseguiRicerca(tipo) : this.loader(tipo);
        }
        break;
  
      default:
        console.error('Tipo di ricerca non valido:', tipo);
    }
  }
  
  loader(tipo: SearchType) {
    switch(tipo) {
      case SearchType.AttoreCreazione: {
        this.attoreService.getAllPaginated(this.paginaCorrenteAttoriCreazione, this.pageSizeAttoriCreazione)
          .subscribe((response: PaginatedResponse<AttoreDto>) => {
            this.risultatiRicercaAttoriCreazione = response.content;
            this.totalePagineAttoriCreazione = response.totalPages;
          });
        break;
      }
      
      case SearchType.GenereCreazione: {
        this.genereService.getAllPaginated(this.paginaCorrenteGeneriCreazione, this.pageSizeGeneriCreazione)
          .subscribe((response: PaginatedResponse<GenereDto>) => {
            this.risultatiRicercaGeneriCreazione = response.content;
            this.totalePagineGeneriCreazione = response.totalPages;
          });
        break;
      }
      
      case SearchType.AttoreModifica: {
        this.attoreService.getAllPaginated(this.paginaCorrenteAttoriModifica, this.pageSizeAttoriModifica)
          .subscribe((response: PaginatedResponse<AttoreDto>) => {
            this.risultatiRicercaAttoriModifica = response.content;
            this.totalePagineAttoriModifica = response.totalPages;
          });
        break;
      }
      
      case SearchType.GenereModifica: {
        this.genereService.getAllPaginated(this.paginaCorrenteGeneriModifica, this.pageSizeGeneriModifica)
          .subscribe((response: PaginatedResponse<GenereDto>) => {
            this.risultatiRicercaGeneriModifica = response.content;
            this.totalePagineGeneriModifica = response.totalPages;
          });
        break;
      }
      
      case SearchType.RegistaCreazione: {
        this.registaService.getAllPaginated(this.paginaCorrenteRegistiCreazione, this.pageSizeRegistiCreazione)
          .subscribe((response: PaginatedResponse<RegistaDto>) => {
            this.risultatiRicercaRegistiCreazione = response.content;
            this.totalePagineRegistiCreazione = response.totalPages;
          });
        break;
      }
      
      case SearchType.RegistaModifica: {
        this.registaService.getAllPaginated(this.paginaCorrenteRegistiModifica, this.pageSizeRegistiModifica)
          .subscribe((response: PaginatedResponse<RegistaDto>) => {
            this.risultatiRicercaRegistiModifica = response.content;
            this.totalePagineRegistiModifica = response.totalPages;
          });
        break;
      }
  
      case SearchType.FilmModifica: {
        this.filmService.getAllPaginated(this.paginaCorrenteFilm, this.pageSizeFilm)
          .subscribe((response: PaginatedResponse<FilmDto>) => {
            this.risultatiRicercaFilm = response.content;
            this.totalePagineFilm = response.totalPages;
          });
        break;
      }
    }
  }


  resettaRicerca(tipo : SearchType) : void {
    switch(tipo) {
      case SearchType.AttoreCreazione: {
        this.termineRicercaAttoreCreazione = '';
        this.paginaCorrenteAttoriCreazione = 0;
        this.loader(SearchType.AttoreCreazione);
        break;
      }
      
      case SearchType.GenereCreazione: {
        this.termineRicercaGenereCreazione = '';
        this.paginaCorrenteGeneriCreazione = 0;
        this.loader(SearchType.GenereCreazione);
        break;
      }
      
      case SearchType.AttoreModifica: {
        this.termineRicercaAttoreModifica = '';
        this.paginaCorrenteAttoriModifica = 0;
        this.loader(SearchType.AttoreModifica);
        break;
      }
      
      case SearchType.GenereModifica: {
        this.termineRicercaGenereModifica = '';
        this.paginaCorrenteGeneriModifica = 0;
        this.loader(SearchType.GenereModifica);
        break;
      }
      
      case SearchType.RegistaCreazione: {
        this.termineRicercaRegistaCreazione = '';
        this.paginaCorrenteRegistiCreazione = 0;
        this.loader(SearchType.RegistaCreazione);
        break;
      }
      
      case SearchType.RegistaModifica: {
        this.termineRicercaRegistaModifica = '';
        this.paginaCorrenteRegistiModifica = 0;
        this.loader(SearchType.RegistaModifica);
        break;
      }
      
      case SearchType.FilmModifica: {
        this.termineRicercaFilm = '';
        this.paginaCorrenteFilm = 0;
        this.loader(SearchType.FilmModifica);
        break;
      }
    }
  }    
}
