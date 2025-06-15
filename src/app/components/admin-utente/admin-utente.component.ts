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
  paginaUtenti = 0;
  totalePagineUtenti=0;

  ngOnInit(): void {
    this.caricaUtenti()
  }

  nuovoUtente: UtenteDto = { id: undefined, username: '', nome: '', cognome: '', datanascita: '', telefono: '' };
  utenti: UtenteDto[] = [];
  risultatiRicerca: UtenteDto[] = [];
  utenteSelezionato: UtenteDto | null = null;
  utenteSelezionatoModificato: UtenteDto | null = null;
  modificheAbilitate: boolean = false;
  pageSizeUtenti=4
  pageSizeBiglietti=8
  pageSizeOrdini=4
  creaUtente() {
    this.utenteService.nuovo(this.nuovoUtente).subscribe(() => {
      this.nuovoUtente = { id: 0, username: '', nome: '', cognome: '', datanascita: '', telefono: '' };
    });
  }

  caricaUtenti() : void {
    this.utenteService.getAllPaginated(this.paginaUtenti, this.pageSizeUtenti).subscribe( response => {
      this.risultatiRicerca = response.content;
      this.totalePagineUtenti = response.totalPages
    })
  }

  eseguiRicerca() : void {
    this.paginaUtenti=0
    this.utenteService.cerca(this.termineRicerca, this.paginaUtenti, this.pageSizeUtenti).subscribe( response => {
      this.risultatiRicerca = response.content;
      this.totalePagineUtenti = response.totalPages
    })
  }
  

  selezionaUtente(utente: UtenteDto) {
    this.utenteSelezionato = utente;
    this.utenteSelezionatoModificato = { ...utente };
    this.modificheAbilitate = false;
    this.caricaBiglietti();
    this.caricaOrdini();
  }

  caricaBiglietti() {
    this.bigliettoService.getBigliettiByUser(this.utenteSelezionato!.id!, this.paginaBiglietti, this.pageSizeBiglietti)
      .subscribe(response => {
        this.biglietti = response.content;
        this.totalePagineBiglietti = response.totalPages;
      });
  }

  caricaOrdini() {
    this.ordineService.getOrdiniByUserPaginated(this.utenteSelezionato?.id!, this.paginaOrdini, this.pageSizeOrdini)
      .subscribe(response => {
        this.ordini = response.content;
        this.totalePagineOrdini = response.totalPages;
      });
  }

  paginaPrecedente(): void {
    if (this.paginaUtenti > 0) {
      this.paginaUtenti--;
      this.termineRicerca ? this.eseguiRicerca() : this.caricaUtenti();
    }
  }

  paginaSuccessiva(): void {
    if (this.paginaUtenti < this.totalePagineUtenti - 1) {
      this.paginaUtenti++;
      this.termineRicerca ? this.eseguiRicerca() : this.caricaUtenti();
    }
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

  resetRicerca() : void {
    this.termineRicerca = ""
    this.caricaUtenti()
    this.paginaUtenti=0;
  }
}
