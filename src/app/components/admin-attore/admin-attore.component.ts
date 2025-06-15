import { Component } from '@angular/core';
import { AttoreDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AttoreService } from '../../services/attore.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
@Component({
  selector: 'app-admin-attore',
  templateUrl: './admin-attore.component.html',
  styleUrls: ['./admin-attore.component.css']
})
export class AdminAttoreComponent {
  constructor(private attoreService : AttoreService){}

  termineRicerca: string = '';
  isLoading = false;
  paginaCorrente = 0;
  totalePagine = 0;
  pageSize = 4; 
  nuovoAttore: AttoreDto = { id: undefined, nome: '', cognome: '' };
  attori: AttoreDto[] = [];
  attoreSelezionato: AttoreDto | null = null;
  attoreSelezionatoModificato: AttoreDto | null = null;
  modificheAbilitate: boolean = false;

  ngOnInit() : void{
    this.getAttori()
  }



  creaAttore() {
    this.attoreService.nuovo(this.nuovoAttore).subscribe()
    this.nuovoAttore = { id: undefined, nome: '', cognome: '' };
  }



  selezionaAttore(attore: AttoreDto) {
    this.attoreSelezionato = attore;
    this.attoreSelezionatoModificato = { ...attore };
    this.modificheAbilitate = false;
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

  getAttori(): void {
    this.attoreService.getAllPaginated(this.paginaCorrente, this.pageSize)
      .subscribe(response => {
        this.attori = response.content;
        
        this.totalePagine = response.totalPages;
      });
  }

  eseguiRicerca(): void {
    this.paginaCorrente=0
    if (this.termineRicerca.trim()) {
      this.attoreService.cerca(this.termineRicerca, this.paginaCorrente, this.pageSize)
        .subscribe((response: PaginatedResponse<AttoreDto>) => {
          this.attori = response.content;
          this.totalePagine = response.totalPages;
        });
    } else {
      this.getAttori();
    }
  }

  resetRicerca(): void {
    this.termineRicerca = '';
    this.paginaCorrente = 0;
    this.getAttori();
  }

  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.termineRicerca ? this.eseguiRicerca() : this.getAttori();
    }
  }

  paginaSuccessiva(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.termineRicerca ? this.eseguiRicerca() : this.getAttori();
    }
  }
}
