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

@Component({
  selector: 'app-admin-film',
  templateUrl: './admin-film.component.html',
  styleUrls: ['./admin-film.component.css']
})
export class AdminFilmComponent {
  
  constructor(private filmService : FilmService, private genereService : GenereService, private registaService : RegistaService, private attoreService : AttoreService){}
  private searchSubjectFilm = new Subject<string>();
  private searchSubjectAttoreCreazione = new Subject<string>();
  private searchSubjectAttoreModifica = new Subject<string>();
  private searchSubjectRegistaCreazione = new Subject<string>();
  private searchSubjectRegistaModifica = new Subject<string>();
  private searchSubjectGenereCreazione = new Subject<string>();
  private searchSubjectGenereModifica = new Subject<string>();

  isLoadingFilm = false;
  isLoadingAttoreCreazione = false;
  isLoadingRegistaCreazione = false;
  isLoadingGenereCreazione = false;
  isLoadingAttoreModifica = false;
  isLoadingRegistaModifica = false;
  isLoadingGenereModifica = false;
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
    this.searchSubjectFilm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term.length >= 2) {
        this.cercaFilm(term);
      } else {
        this.risultatiRicercaFilm = [];
      }
    });
    // Observable per la ricerca attori, registi e generi per creazione
    this.setupSearchSubscription(this.searchSubjectAttoreCreazione, 'attoreCreazione');
    this.setupSearchSubscription(this.searchSubjectRegistaCreazione, 'registaCreazione');
    this.setupSearchSubscription(this.searchSubjectGenereCreazione, 'genereCreazione');

    // Observable per la ricerca attori, registi e generi per modifica
    this.setupSearchSubscription(this.searchSubjectAttoreModifica, 'attoreModifica');
    this.setupSearchSubscription(this.searchSubjectRegistaModifica, 'registaModifica');
    this.setupSearchSubscription(this.searchSubjectGenereModifica, 'genereModifica');
  }
  setupSearchSubscription(subject: Subject<string>, tipo: string): void {
    subject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term.length >= 2) {
        this.effettuaRicerca(term, tipo);
      } else {
        this.resetRisultatiRicerca(tipo);
      }
    });
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

  

  // Funzione per creare un nuovo film
  creaFilm() {
    this.filmService.nuovo(this.nuovoFilm).subscribe()
    this.resetNuovoFilm();
    
    
  }
  onSearchChange(term: string, tipo: string) {
    switch(tipo) {
      case 'film': this.searchSubjectFilm.next(term); break;
      case 'attoreCreazione': this.searchSubjectAttoreCreazione.next(term); break;
      case 'genereCreazione': this.searchSubjectGenereCreazione.next(term); break;
      case 'registaCreazione': this.searchSubjectRegistaCreazione.next(term); break;
      case 'attoreModifica': this.searchSubjectAttoreModifica.next(term); break;
      case 'genereModifica': this.searchSubjectGenereModifica.next(term); break;
      case 'registaModifica': this.searchSubjectRegistaModifica.next(term); break;
    }
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

  // Funzione per cercare i film in base al titolo
  cercaFilm(term: string) {
    /*this.isLoadingFilm = true;
    this.filmService.cerca(term, 0 ,0).subscribe(
      (risultati: FilmDto[]) => {
        this.risultatiRicercaFilm = risultati;
        this.isLoadingFilm = false;
      },
      error => {
        console.error('Errore nella ricerca:', error);
        this.risultatiRicercaFilm = [];
        this.isLoadingFilm = false;
      }
    );*/
  }

  // Funzione per selezionare un film dalla lista dei risultati
  selezionaFilm(film: FilmDto) {
    this.filmSelezionato = { ...film };
    this.filmSelezionatoModificato = this.filmSelezionato
    this.resetRisultatiRicerca("attoreModifica")
    this.termineRicercaAttoreModifica=""
    this.termineRicercaRegistaModifica=""
    this.termineRicercaGenereModifica=""
    this.resetRisultatiRicerca("genereModifica")
    this.resetRisultatiRicerca("registaModifica")
    this.risultatiRicercaFilm = []
  }

  effettuaRicerca(term: string, tipo: string) {
    switch(tipo) {
      case 'attoreCreazione': {
        this.isLoadingAttoreCreazione = true;
        this.attoreService.getSuggestions(term).subscribe(
          results => this.aggiornaRisultati('attoreCreazione', results),
          error => this.gestisciErrore('attoreCreazione', error)
        );
        break;
      }
        
      case 'genereCreazione':{
        this.isLoadingGenereCreazione = true;
        this.genereService.cerca(term, 0 , 0).subscribe(
          //results => this.aggiornaRisultati('genereCreazione', results),
          error => this.gestisciErrore('genereCreazione', error)
        );
        break;
      }
       
      case 'attoreModifica':{
        this.isLoadingAttoreModifica = true;
        this.attoreService.getSuggestions(term).subscribe(
          results => this.aggiornaRisultati('attoreModifica', results),
          error => this.gestisciErrore('attoreModifica', error)
        );
        break;
      }
        
      case 'genereModifica':{
        /*this.isLoadingGenereModifica = true;
        this.genereService.cerca(term).subscribe(
          results => this.aggiornaRisultati('genereModifica', results),
          error => this.gestisciErrore('genereModifica', error)
        );*/
        break;
      }
      case 'registaCreazione' : {
        /*this.isLoadingRegistaCreazione = true
        this.registaService.cerca(term).subscribe(
          results => this.aggiornaRisultati("registaCreazione", results),
          error => this.gestisciErrore('registaCreazione', error)
        );*/
        break;
      }
      case 'registaModifica' : {
        /*this.isLoadingRegistaModifica = true
        this.registaService.cerca(term).subscribe(
          results => this.aggiornaRisultati("registaModifica", results),
          error => this.gestisciErrore('registaModifica', error)
        );*/
        break;

      }
     
    }
  }
  aggiornaRisultati(tipo: string, risultati: any[]): void {
    switch(tipo) {
      case 'attoreCreazione': {
        this.risultatiRicercaAttoriCreazione = risultati; 
        this.isLoadingAttoreCreazione = false; 
        break;
      }
      case 'genereCreazione': {
        this.risultatiRicercaGeneriCreazione = risultati; 
        this.isLoadingGenereCreazione = false; 
        break;
      }
      case 'attoreModifica': {
        this.risultatiRicercaAttoriModifica = risultati; 
        this.isLoadingAttoreModifica = false; 
        break;
      }
      case 'genereModifica': {
        this.risultatiRicercaGeneriModifica = risultati; 
        this.isLoadingGenereModifica = false; 
        break;
      }
      case 'registaCreazione' : {
        this.risultatiRicercaRegistiCreazione = risultati;
        this.isLoadingRegistaCreazione = false;
        break
      }
      case 'registaModifica' : {
        this.risultatiRicercaRegistiModifica = risultati;
        this.isLoadingRegistaModifica = false;
        break
      }
      
    }
  }

  resetRisultatiRicerca(tipo: string): void {
    switch(tipo) {
      case 'attoreCreazione': {
        this.risultatiRicercaAttoriCreazione = []; 
        break;
      }
      case 'genereCreazione': {
        this.risultatiRicercaGeneriCreazione = []; 
        break;
      }
      case 'attoreModifica': {
        this.risultatiRicercaAttoriModifica = []; 
        break;
      }
      case 'genereModifica': {
        this.risultatiRicercaGeneriModifica = []; 
        break;
      }
      case 'registaCreazione': {
        this.risultatiRicercaRegistiCreazione = [];
        break;
      }
      case 'registaModifica': {
        this.risultatiRicercaRegistiModifica = [];
        break;
      }

    }
  }

  gestisciErrore(tipo: string, errore: any): void {
    console.error(`Errore nella ricerca per ${tipo}:`, errore);
    this.resetRisultatiRicerca(tipo);
    switch(tipo) {
      case 'attoreCreazione': this.isLoadingAttoreCreazione = false; this.resetRisultatiRicerca(tipo); break;
      case 'genereCreazione': this.isLoadingGenereCreazione = false; this.resetRisultatiRicerca(tipo); break;
      case 'attoreModifica': this.isLoadingAttoreModifica = false; this.resetRisultatiRicerca(tipo); break;
      case 'genereModifica': this.isLoadingGenereModifica = false; this.resetRisultatiRicerca(tipo); break;
      case 'registaCreazione' : this.isLoadingRegistaCreazione = false; this.resetRisultatiRicerca(tipo); break;
      case 'registaModifica' : this.isLoadingRegistaModifica = false; this.resetRisultatiRicerca(tipo); break;
    }
  }


  aggiungiElemento(element: RegistaDto | AttoreDto | GenereDto, tipo: string) : void{
    switch(tipo){
      case "attoreCreazione" : {
        if(!this.nuovoFilm.attores.some(a => a.id === element.id)) {
          this.nuovoFilm.attores.push(element as AttoreDto);
        }
        break;
      }
      case "attoreModifica" :{
        if(this.filmSelezionatoModificato){
          if(!this.nuovoFilm.attores.some(a => a.id === element.id)) {
            this.filmSelezionatoModificato.attores.push(element as AttoreDto);
          }
        }
        break;
      }
      case "genereCreazione" : {
        if(!this.nuovoFilm.generes.some(a => a.id === element.id)) {
          this.nuovoFilm.generes.push(element as GenereDto);
        }
        break
      }

      case "genereModifica" : {
        if(this.filmSelezionatoModificato){
          if(!this.nuovoFilm.generes.some(a => a.id === element.id)) {
            this.filmSelezionatoModificato.generes.push(element as GenereDto);
          }
        }
        break
      }

      case "registaCreazione" : {
        if(!this.nuovoFilm.registas.some(a => a.id === element.id)) {
          this.nuovoFilm.registas.push(element as RegistaDto);
        }
        break
      }
      case "registaModifica" : {
        if(this.filmSelezionatoModificato){
          if(!this.nuovoFilm.registas.some(a => a.id === element.id)) {
            this.filmSelezionatoModificato.registas.push(element as RegistaDto);
          }
        }
        break
      }
    }
  }
  aggiungiAttore(attore: AttoreDto) {
    if (!this.nuovoFilm.attores.some(a => a.id === attore.id)) {
      this.nuovoFilm.attores.push(attore);
    }
  }

  aggiungiRegista(regista: RegistaDto) {
    if (!this.nuovoFilm.registas.some(r => r.id === regista.id)) {
      this.nuovoFilm.registas.push(regista);
    }
  }

  aggiungiGenere(genere: GenereDto) {
    if (!this.nuovoFilm.generes.some(g => g.id === genere.id)) {
      this.nuovoFilm.generes.push(genere);
    }
  }

  // Funzioni per rimuovere attore, regista e genere
  rimuoviElemento(element: RegistaDto | AttoreDto | GenereDto, tipo: string): void {
    switch (tipo) {
        case "attoreCreazione": {
            this.nuovoFilm.attores = this.nuovoFilm.attores.filter(a => a.id !== element.id);
            break;
        }
        case "attoreModifica": {
            if (this.filmSelezionatoModificato) {
                this.filmSelezionatoModificato.attores = this.filmSelezionatoModificato.attores.filter(a => a.id !== element.id);
            }
            break;
        }
        case "genereCreazione": {
            this.nuovoFilm.generes = this.nuovoFilm.generes.filter(g => g.id !== element.id);
            break;
        }
        case "genereModifica": {
            if (this.filmSelezionatoModificato) {
                this.filmSelezionatoModificato.generes = this.filmSelezionatoModificato.generes.filter(g => g.id !== element.id);
            }
            break;
        }
        case "registaCreazione": {
            this.nuovoFilm.registas = this.nuovoFilm.registas.filter(r => r.id !== element.id);
            break;
        }
        case "registaModifica": {
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






}
