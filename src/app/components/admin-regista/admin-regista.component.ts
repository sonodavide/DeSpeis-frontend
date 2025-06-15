import { Component } from '@angular/core';
import { RegistaDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RegistaService } from '../../services/regista.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
@Component({
  selector: 'app-admin-regista',
  templateUrl: './admin-regista.component.html',
  styleUrl: './admin-regista.component.css'
})
export class AdminRegistaComponent {
  constructor(private registaService : RegistaService){}

  

  isLoading = false;
  ngOnInit() : void{
    this.getRegisti()
  }

  paginaCorrente = 0;
  totalePagine = 0;
  pageSize = 4; 
  nuovoRegista: RegistaDto = { id: 0, nome: '', cognome: '' };
  termineRicerca: string = '';
  registi: RegistaDto[] = [];
  registaSelezionato: RegistaDto | null = null;
  registaSelezionatoModificato: RegistaDto | null = null;
  modificheAbilitate: boolean = false;

  creaRegista() {
    this.registaService.nuovo(this.nuovoRegista).subscribe()
    this.nuovoRegista = { id: undefined, nome: '', cognome: '' };
  }

  getRegisti() : void {
    this.registaService.getAllPaginated(this.paginaCorrente, this.pageSize).subscribe(response => {
      this.registi=response.content
      this.totalePagine=response.totalPages
    })
  }

  selezionaRegista(regista: RegistaDto) {
    this.registaSelezionato = regista;
    this.registaSelezionatoModificato = { ...regista };
    this.modificheAbilitate = false;
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
  eseguiRicerca(): void {
    this.paginaCorrente=0
    if (this.termineRicerca.trim()) {
      this.registaService.cerca(this.termineRicerca, this.paginaCorrente, this.pageSize)
        .subscribe((response: PaginatedResponse<RegistaDto>) => {
          this.registi = response.content;
          this.totalePagine = response.totalPages;
        });
    } else {
      this.getRegisti();
    }
  }

  resetRicerca(): void {
    this.termineRicerca = '';
    this.paginaCorrente = 0;
    this.getRegisti();
  }

  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.termineRicerca ? this.eseguiRicerca() : this.getRegisti();
    }
  }

  paginaSuccessiva(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.termineRicerca ? this.eseguiRicerca() : this.getRegisti();
    }
  }
}


