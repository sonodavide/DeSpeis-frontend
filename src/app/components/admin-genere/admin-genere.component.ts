import { Component } from '@angular/core';
import { GenereDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GenereService } from '../../services/genere.service';
@Component({
  selector: 'app-admin-genere',
  templateUrl: './admin-genere.component.html',
  styleUrl: './admin-genere.component.css'
})
export class AdminGenereComponent {
  constructor(private genereService : GenereService){}
  private searchSubject = new Subject<string>();
  
  isLoading = false;
  ngOnInit() : void{
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term.length >= 2) {
        this.cercaGenere(term);
      } else {
        this.risultatiRicerca = [];
      }
    });
  }

  nuovoGenere: GenereDto = { id: 0, genere: ''};
  termineRicerca: string = '';
  attori: GenereDto[] = [];
  risultatiRicerca: GenereDto[] = [];
  genereSelezionato: GenereDto | null = null;
  genereSelezionatoModificato: GenereDto | null = null;
  modificheAbilitate: boolean = false;

  creaGenere() {
    this.genereService.nuovo(this.nuovoGenere).subscribe()
    this.nuovoGenere = { id: undefined, genere: '' };
  }
  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }
  cercaGenere(term: string) {
    this.isLoading = true;
    this.genereService.getSuggestions(term).subscribe(
      (risultati: GenereDto[]) => {
        this.risultatiRicerca = risultati;
        this.isLoading = false;
      },
      error => {
        console.error('Errore nella ricerca:', error);
        this.risultatiRicerca = [];
        this.isLoading = false;
      }
    );
  }

  selezionaGenere(genere: GenereDto) {
    this.genereSelezionato = genere;
    this.genereSelezionatoModificato = { ...genere };
    this.modificheAbilitate = false;
    this.risultatiRicerca = []
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaGenere() {
    if(this.genereSelezionatoModificato){
      this.genereService.nuovo(this.genereSelezionatoModificato).subscribe()
    }
  }

  annullaModifiche() {
    if (this.genereSelezionato) {
      this.genereSelezionatoModificato = { ...this.genereSelezionato };
      this.modificheAbilitate = false;
    }
  }

  eliminaGenere() {
    if (this.genereSelezionato) {
      this.genereService.elimina(this.genereSelezionato).subscribe()
      this.genereSelezionato = null;
      this.genereSelezionatoModificato = null;
    }
  }
}
