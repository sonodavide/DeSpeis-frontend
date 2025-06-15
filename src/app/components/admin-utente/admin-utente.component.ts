import { Component } from '@angular/core';
import { UtenteDto } from '../../model/utenteDto';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { UtenteService } from '../../services/utente.service';
import { OrdineService } from '../../services/ordine.service';
import { BigliettoService } from '../../services/biglietto.service';
import { BigliettoDto } from '../../model/bigliettoDto';
import { OrdineDto } from '../../model/ordineDto';
@Component({
  selector: 'app-admin-utente',
  templateUrl: './admin-utente.component.html',
  styleUrl: './admin-utente.component.css'
})
export class AdminUtenteComponent {
  constructor(private utenteService: UtenteService, private bigliettoService: BigliettoService, private ordineService: OrdineService) {}
  private searchSubject = new Subject<string>();

  termineRicerca: string = '';
  isLoading = false;

  biglietti: BigliettoDto[] = [];
  ordini: OrdineDto[] = [];
  
  paginaBiglietti = 0;
  totalePagineBiglietti = 1;
  paginaOrdini = 0;
  totalePagineOrdini = 1;

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term.length >= 2) {
        this.cercaUtente(term);
      } else {
        this.risultatiRicerca = [];
      }
    });
  }

  nuovoUtente: UtenteDto = { id: undefined, username: '', nome: '', cognome: '', datanascita: '', telefono: '' };
  utenti: UtenteDto[] = [];
  risultatiRicerca: UtenteDto[] = [];
  utenteSelezionato: UtenteDto | null = null;
  utenteSelezionatoModificato: UtenteDto | null = null;
  modificheAbilitate: boolean = false;

  creaUtente() {
    this.utenteService.nuovo(this.nuovoUtente).subscribe(() => {
      this.nuovoUtente = { id: 0, username: '', nome: '', cognome: '', datanascita: '', telefono: '' };
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }

  cercaUtente(term: string) {
    this.isLoading = true;
    this.utenteService.getSuggestions(term).subscribe(
      (risultati: UtenteDto[]) => {
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

  selezionaUtente(utente: UtenteDto) {
    this.utenteSelezionato = utente;
    this.utenteSelezionatoModificato = { ...utente };
    this.modificheAbilitate = false;
    this.risultatiRicerca = [];
    this.caricaBiglietti();
    this.caricaOrdini();
  }

  caricaBiglietti() {
    this.bigliettoService.getBigliettiByUser(this.utenteSelezionato!.id!, this.paginaBiglietti)
      .subscribe(response => {
        this.biglietti = response.content;
        this.totalePagineBiglietti = response.totalPages;
      });
  }

  caricaOrdini() {
    this.ordineService.getOrdiniPaginated(this.paginaOrdini, this.utenteSelezionato!.id!)
      .subscribe(response => {
        this.ordini = response.content;
        this.totalePagineOrdini = response.totalPages;
      });
  }

  paginaPrecedenteBiglietti() {
    if (this.paginaBiglietti > 0) {
      this.paginaBiglietti--;
      this.caricaBiglietti();
    }
  }
  paginaSuccessivaBiglietti() {
    if (this.paginaBiglietti < this.totalePagineBiglietti - 1) {
      this.paginaBiglietti++;
      this.caricaBiglietti();
    }
  }

  paginaPrecedenteOrdini() {
    if (this.paginaOrdini > 0) {
      this.paginaOrdini--;
      this.caricaOrdini();
    }
  }

  paginaSuccessivaOrdini() {
    if (this.paginaOrdini < this.totalePagineOrdini - 1) {
      this.paginaOrdini++;
      this.caricaOrdini();
    }
  }
  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaUtente() {
    if (this.utenteSelezionatoModificato) {
      this.utenteService.nuovo(this.utenteSelezionatoModificato).subscribe(() => {
        this.modificheAbilitate = false;
      });
    }
  }

  annullaModifiche() {
    if (this.utenteSelezionato) {
      this.utenteSelezionatoModificato = { ...this.utenteSelezionato };
      this.modificheAbilitate = false;
    }
  }

  eliminaUtente() {
    if (this.utenteSelezionato) {
      this.utenteService.elimina(this.utenteSelezionato).subscribe(() => {
        this.utenteSelezionato = null;
        this.utenteSelezionatoModificato = null;
      });
    }
  }
}
