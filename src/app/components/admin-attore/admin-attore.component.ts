import { Component } from '@angular/core';
import { AttoreDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AttoreService } from '../../services/attore.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import cloneDeep  from 'lodash/cloneDeep';
@Component({
  selector: 'app-admin-attore',
  templateUrl: './admin-attore.component.html',
  styleUrls: ['./admin-attore.component.css']
})
export class AdminAttoreComponent {
  searchTypeUtils : SearchTypeUtils
  constructor(private attoreService : AttoreService, private messageService : MessagesService){
    this.searchTypeUtils = new SearchTypeUtils(this.searchData, undefined, undefined, undefined, attoreService, undefined, undefined, undefined, undefined, undefined, messageService)
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
    this.attoreService.nuovo(this.nuovoAttore).subscribe({
      next : () => {
        this.messageService.addMessageSuccess("Attore aggiunto con successo!")
        this.nuovoAttore = { id: undefined, nome: '', cognome: '' };
        this.searchTypeUtils.loader(SearchType.AttoreModifica)
      },
      error : (error : HttpErrorResponse) => {
        if(error.status === 400 ){
          this.messageService.addMessageError("alcuni dati non vanno bene.")
        } else {
          this.messageService.addMessageError("errore aggiunta attore.")
        }
      }
    })
   
  }



  selezionaAttore(attore: AttoreDto) {
    this.attoreSelezionato = cloneDeep(attore);
    this.attoreSelezionatoModificato = cloneDeep(this.attoreSelezionato)
    this.modificheAbilitate = false;
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaAttore() {
    if(this.attoreSelezionatoModificato){
      this.attoreService.nuovo(this.attoreSelezionatoModificato).subscribe({
        next : () => {
          this.messageService.addMessageSuccess("Attore modificato con successo!")
          this.attoreSelezionato = null
          this.attoreSelezionatoModificato = null
          this.modificheAbilitate=false
          this.searchTypeUtils.loader(SearchType.AttoreModifica)
        },
        error : (error : HttpErrorResponse) => {
          if(error.status === 400 ){
            this.messageService.addMessageError("alcuni dati non vanno bene.")
          } else {
            this.messageService.addMessageError("errore modifica attore.")
          }
        }
      })
      this.modificheAbilitate = false;
    }
    
  }

  annullaModifiche() {
    if (this.attoreSelezionato) {
      this.attoreSelezionatoModificato = cloneDeep(this.attoreSelezionato)
      this.modificheAbilitate = false;
      this.messageService.addMessageSuccess("ho reimpostato l'attore che avevi selezionato")
    }
  }

  eliminaAttore() {
    if (this.attoreSelezionato) {
      this.attoreService.elimina(this.attoreSelezionato).subscribe({
        next : () => {
          this.messageService.addMessageSuccess("attore eliminato con successo")
          this.attoreSelezionato = null;
          this.attoreSelezionatoModificato = null;
          this.modificheAbilitate=false
          this.searchTypeUtils.loader(SearchType.AttoreModifica)
        },
        error : (error) => {
          this.messageService.addMessageError("errore eliminazione attore")
        }
      })
    }
  }

  
}
