import { Component } from '@angular/core';
import { AttoreDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AttoreService } from '../../services/attore.service';
@Component({
  selector: 'app-admin-attore',
  templateUrl: './admin-attore.component.html',
  styleUrls: ['./admin-attore.component.css']
})
export class AdminAttoreComponent {
  constructor(private attoreService : AttoreService){}
  private searchSubject = new Subject<string>();
  
  termineRicerca: string = '';
  isLoading = false;
  
  

  ngOnInit() : void{
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term.length >= 2) {
        this.cercaAttore(term);
      } else {
        this.risultatiRicerca = [];
      }
    });
  }

  nuovoAttore: AttoreDto = { id: undefined, nome: '', cognome: '' };
  attori: AttoreDto[] = [];
  risultatiRicerca: AttoreDto[] = [];
  attoreSelezionato: AttoreDto | null = null;
  attoreSelezionatoModificato: AttoreDto | null = null;
  modificheAbilitate: boolean = false;

  creaAttore() {
    this.attoreService.nuovo(this.nuovoAttore).subscribe()
    this.nuovoAttore = { id: undefined, nome: '', cognome: '' };
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }
  cercaAttore(term: string) {
    this.isLoading = true;
    this.attoreService.getSuggestions(term).subscribe(
      (risultati: AttoreDto[]) => {
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

  selezionaAttore(attore: AttoreDto) {
    this.attoreSelezionato = attore;
    this.attoreSelezionatoModificato = { ...attore };
    this.modificheAbilitate = false;
    this.risultatiRicerca = []
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaAttore() {
    if(this.attoreSelezionatoModificato){
      this.attoreService.nuovo(this.attoreSelezionatoModificato).subscribe()
      this.modificheAbilitate = false;
    }
    
  }

  annullaModifiche() {
    if (this.attoreSelezionato) {
      this.attoreSelezionatoModificato = { ...this.attoreSelezionato };
      this.modificheAbilitate = false;
    }
  }

  eliminaAttore() {
    if (this.attoreSelezionato) {
      this.attoreService.elimina(this.attoreSelezionato).subscribe()
      this.attoreSelezionato = null;
      this.attoreSelezionatoModificato = null;
    }
  }
}
