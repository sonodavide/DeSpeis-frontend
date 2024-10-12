import { Component } from '@angular/core';
import { RegistaDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RegistaService } from '../../services/regista.service';
@Component({
  selector: 'app-admin-regista',
  templateUrl: './admin-regista.component.html',
  styleUrl: './admin-regista.component.css'
})
export class AdminRegistaComponent {
  constructor(private registaService : RegistaService){}
  private searchSubject = new Subject<string>();
  

  isLoading = false;
  ngOnInit() : void{
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term.length >= 2) {
        this.cercaRegista(term);
      } else {
        this.risultatiRicerca = [];
      }
    });
  }


  nuovoRegista: RegistaDto = { id: 0, nome: '', cognome: '' };
  termineRicerca: string = '';
  attori: RegistaDto[] = [];
  risultatiRicerca: RegistaDto[] = [];
  registaSelezionato: RegistaDto | null = null;
  registaSelezionatoModificato: RegistaDto | null = null;
  modificheAbilitate: boolean = false;

  creaRegista() {
    this.registaService.nuovo(this.nuovoRegista).subscribe()
    this.nuovoRegista = { id: undefined, nome: '', cognome: '' };
  }
  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }
  cercaRegista(term : string) {
    this.isLoading = true;
    this.registaService.getSuggestions(term).subscribe(
      (risultati: RegistaDto[]) => {
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

  selezionaRegista(regista: RegistaDto) {
    this.registaSelezionato = regista;
    this.registaSelezionatoModificato = { ...regista };
    this.modificheAbilitate = false;
    this.risultatiRicerca = []
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaRegista() {
    if (this.registaSelezionatoModificato) {
      this.registaService.nuovo(this.registaSelezionatoModificato).subscribe()
      this.modificheAbilitate = false;
    }
  }

  annullaModifiche() {
    if (this.registaSelezionato) {
      this.registaSelezionatoModificato = { ...this.registaSelezionato };
      this.modificheAbilitate = false;
    }
  }

  eliminaRegista() {
    if (this.registaSelezionato) {
      this.registaService.elimina(this.registaSelezionato).subscribe()
      this.registaSelezionato = null;
      this.registaSelezionatoModificato = null;
    }
  }
}


