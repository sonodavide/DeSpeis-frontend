import { Component } from '@angular/core';
import { AttoreDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AttoreService } from '../../services/attore.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
@Component({
  selector: 'app-admin-attore',
  templateUrl: './admin-attore.component.html',
  styleUrls: ['./admin-attore.component.css']
})
export class AdminAttoreComponent {
  searchTypeUtils : SearchTypeUtils
  constructor(private attoreService : AttoreService){
    this.searchTypeUtils = new SearchTypeUtils(this.searchData, undefined, undefined, undefined, attoreService)
  }
  SearchType = SearchType
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.AttoreModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    }
  };
  
  nuovoAttore: AttoreDto = { id: undefined, nome: '', cognome: '' };
  
  attoreSelezionato: AttoreDto | null = null;
  attoreSelezionatoModificato: AttoreDto | null = null;
  modificheAbilitate: boolean = false;

  ngOnInit() : void{
    this.searchTypeUtils.loader(SearchType.AttoreModifica)
    console.log()
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

  
}
