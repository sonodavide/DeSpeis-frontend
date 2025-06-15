import { Component } from '@angular/core';
import { UserProfile } from '../../model/user-profile';
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

  utenti: UserProfile[] = [];
  risultatiRicerca: UserProfile[] = [];
  utenteSelezionato: UserProfile | null = null;
  pageSizeUtenti=4
  pageSizeBiglietti=8
  pageSizeOrdini=4


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
  

  selezionaUtente(utente: UserProfile) {
    this.utenteSelezionato = utente;
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




  resetRicerca() : void {
    this.termineRicerca = ""
    this.caricaUtenti()
    this.paginaUtenti=0;
  }
}
