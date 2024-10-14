import { Component } from '@angular/core';
import { GenereDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GenereService } from '../../services/genere.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
@Component({
  selector: 'app-admin-genere',
  templateUrl: './admin-genere.component.html',
  styleUrl: './admin-genere.component.css'
})
export class AdminGenereComponent {
  constructor(private genereService : GenereService){}

  isLoading = false;
  nuovoGenere: GenereDto = { id: 0, genere: ''};
  termineRicerca: string = '';
  generi: GenereDto[] = [];
  genereSelezionato: GenereDto | null = null;
  genereSelezionatoModificato: GenereDto | null = null;
  modificheAbilitate: boolean = false;
  paginaCorrente = 0;
  totalePagine = 0;
  pageSize = 4; 
  ngOnInit() : void{
    this.getGeneri()
  }

  
  getGeneri() : void{
    this.genereService.getAllPaginated(this.paginaCorrente, this.pageSize)
    .subscribe(response => {
      this.generi = response.content;
      this.totalePagine = response.totalPages;
    })
  }
  creaGenere() : void {
    this.genereService.nuovo(this.nuovoGenere).subscribe()
    this.nuovoGenere = { id: undefined, genere: '' };
  }
 
  eseguiRicerca(): void {
    this.paginaCorrente=0
    if (this.termineRicerca.trim()) {
      this.genereService.cerca(this.termineRicerca, this.paginaCorrente, this.pageSize)
        .subscribe((response: PaginatedResponse<GenereDto>) => {
          this.generi = response.content;
          this.totalePagine = response.totalPages;
        });
    } else {
      this.getGeneri();
    }
  }

  resetRicerca(): void {
    this.termineRicerca = '';
    this.paginaCorrente = 0;
    this.getGeneri();
  }

  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.termineRicerca ? this.eseguiRicerca() : this.getGeneri();
    }
  }

  paginaSuccessiva(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.termineRicerca ? this.eseguiRicerca() : this.getGeneri();
    }
  }
  selezionaGenere(genere: GenereDto) {
    this.genereSelezionato = genere;
    this.genereSelezionatoModificato = { ...genere };
    this.modificheAbilitate = false;
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
