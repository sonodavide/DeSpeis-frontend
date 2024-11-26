import { Component } from '@angular/core';
import { RegistaDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RegistaService } from '../../services/regista.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
@Component({
  selector: 'app-admin-regista',
  templateUrl: './admin-regista.component.html',
  styleUrl: './admin-regista.component.css'
})
export class AdminRegistaComponent {
  SearchType = SearchType
  searchTypeUtils : SearchTypeUtils
  constructor(private registaService : RegistaService){
    this.searchTypeUtils = new SearchTypeUtils(this.searchData, undefined, undefined, undefined, undefined, registaService)
  }
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.RegistaModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    }
  };

  

  isLoading = false;
  ngOnInit() : void{
   this.searchTypeUtils.loader(SearchType.RegistaModifica)
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


}


