import { Component } from '@angular/core';
import { SalaDto } from '../../model/salaDto';

import { SalaService } from '../../services/sala.service';
import { SalaConPosti } from '../../model/salaConPostiPerFila';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';

@Component({
  selector: 'app-admin-sala',
  templateUrl: './admin-sala.component.html',
  styleUrl: './admin-sala.component.css'
})
export class AdminSalaComponent {
  SearchType = SearchType
  searchTypeUtils : SearchTypeUtils
  constructor(private salaService : SalaService){
    this.searchTypeUtils = new SearchTypeUtils(this.searchData, undefined, salaService)
  }
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.SalaModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    }
  };
  nuovaSala : SalaConPosti= {id: undefined, postis:[]}
  salaSelezionata: SalaConPosti | null = null;
  salaSelezionataModificata: SalaConPosti | null = null;
  modificheAbilitate=false
  aggiungiFila() {
    const nomeFila = String.fromCharCode(65 + this.nuovaSala.postis.length);
    this.nuovaSala.postis.push({id : undefined, fila : nomeFila, sedili : 1});


  }

  modificheAbilitateSetter(stato : boolean) : void {
    this.modificheAbilitate=stato;
  }
  rimuoviFila() {
    
    if (this.nuovaSala.postis.length > 1) {
      this.nuovaSala.postis.pop()
      
    }
  }

  aggiungiPosto(nomeFila: string) {
    for(let posto of this.nuovaSala.postis){
      if(posto.fila===nomeFila){
        posto.sedili++
      }
    }
  }
  
  rimuoviPosto(nomeFila: string) {

    for(let posto of this.nuovaSala.postis){
      if(posto.fila===nomeFila && posto.sedili>1){
        posto.sedili--
      }
    }
  }

  creaSala() {
    
    this.salaService.nuovo(this.nuovaSala).subscribe()
    this.resetNuovaSala()
  }



  selezionaSala(sala: SalaDto) {
    if(sala.id){
      this.salaService.getPostiPerFila(sala.id!).subscribe(response =>{
        this.salaSelezionata = response;
        this.salaSelezionataModificata = { ...response };

      })

    }
  }

  

  eliminaSala() : void {
    if (this.salaSelezionata) {
      this.salaService.elimina({id : this.salaSelezionata.id}).subscribe()
      this.salaSelezionata = null;
      this.salaSelezionataModificata = null;
      this.modificheAbilitateSetter(false)
    }
  }
  modificaSala() : void {
    if(this.salaSelezionataModificata){
      this.salaService.nuovo(this.salaSelezionataModificata).subscribe(response => {
        this.modificheAbilitateSetter(false)
      })
    }
  }

  annullaModifiche() : void {
    this.salaSelezionataModificata=this.salaSelezionata
    this.modificheAbilitateSetter(false)
  }
  aggiungiFilaModifica() {
    if(this.salaSelezionataModificata){
      const nomeFila = String.fromCharCode(65 + this.salaSelezionataModificata.postis.length);
      this.salaSelezionataModificata.postis.push({id : undefined, fila : nomeFila, sedili : 1});
    }


  }

  rimuoviFilaModifica() {
    if(this.salaSelezionataModificata){
      if (this.salaSelezionataModificata.postis.length > 1) {
        this.salaSelezionataModificata.postis.pop()
        this.modificheAbilitateSetter(true)
      }
    }
  }

  aggiungiPostoModifica(nomeFila: string) {
    if(this.salaSelezionataModificata){
      for(let posto of this.salaSelezionataModificata.postis){
        if(posto.fila===nomeFila){
          posto.sedili++
          this.modificheAbilitateSetter(true)
        }
    }
    }
  }
  
  rimuoviPostoModifica(nomeFila: string) {
    if(this.salaSelezionataModificata){
      for(let posto of this.salaSelezionataModificata.postis){
        if(posto.fila===nomeFila && posto.sedili>1){
          posto.sedili--
          this.modificheAbilitateSetter(true)
        }
      }
    }
  }
  ngOnInit(): void {
    this.resetNuovaSala()
    this.searchTypeUtils.loader(SearchType.SalaModifica)
  }

  

  

  resetNuovaSala() : void {
    this.nuovaSala = {id: undefined, postis:[{fila : "A", sedili : 1}]}
    
  }

}

