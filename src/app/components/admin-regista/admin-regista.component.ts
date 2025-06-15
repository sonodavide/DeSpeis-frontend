import { Component } from '@angular/core';
import { RegistaDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RegistaService } from '../../services/regista.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import cloneDeep  from 'lodash/cloneDeep';
@Component({
  selector: 'app-admin-regista',
  templateUrl: './admin-regista.component.html',
  styleUrl: './admin-regista.component.css',
})
export class AdminRegistaComponent {
  SearchType = SearchType;
  searchTypeUtils: SearchTypeUtils;
  constructor(
    private registaService: RegistaService,
    private messageService: MessagesService
  ) {
    this.searchTypeUtils = new SearchTypeUtils(
      this.searchData,
      undefined,
      undefined,
      undefined,
      undefined,
      registaService,
      undefined,
      undefined,
      undefined,
      undefined,
      messageService
    );
  }
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.RegistaModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
  };

  isLoading = false;
  ngOnInit(): void {
    this.searchTypeUtils.loader(SearchType.RegistaModifica);
  }

  paginaCorrente = 0;
  totalePagine = 0;
  pageSize = 4;
  nuovoRegista: RegistaDto = { id: undefined, nome: '', cognome: '' };
  termineRicerca: string = '';
  registi: RegistaDto[] = [];
  registaSelezionato: RegistaDto | null = null;
  registaSelezionatoModificato: RegistaDto | null = null;
  modificheAbilitate: boolean = false;

  creaRegista() {
    this.registaService.nuovo(this.nuovoRegista).subscribe({
      next: () => {
        this.messageService.addMessageSuccess('regista aggiunto con successo!');
        this.nuovoRegista = { id: undefined, nome: '', cognome: '' };
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.messageService.addMessageError('alcuni dati non vanno bene.');
        } else {
          this.messageService.addMessageError('errore aggiunta regista.');
        }
      },
    });

  }

  selezionaRegista(regista: RegistaDto) {
    this.registaSelezionato = cloneDeep(regista);
    this.registaSelezionatoModificato = cloneDeep(regista)
    this.modificheAbilitate = false;
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaRegista() {
    if (this.registaSelezionatoModificato) {
      this.registaService.nuovo(this.registaSelezionatoModificato).subscribe({
        next: () => {
          this.messageService.addMessageSuccess(
            'regista modificato con successo!'
          );
          this.registaSelezionato = null;
          this.registaSelezionatoModificato = null;
          this.modificheAbilitate = false;
          this.searchTypeUtils.loader(this.SearchType.RegistaModifica)
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.messageService.addMessageError('alcuni dati non vanno bene.');
          } else {
            this.messageService.addMessageError('errore modifica regista.');
          }
        },
      });
      this.modificheAbilitate = false;
    }
  }

  annullaModifiche() {
    if (this.registaSelezionato) {
      this.registaSelezionatoModificato = cloneDeep(this.registaSelezionato)
      this.modificheAbilitate = false;
      this.messageService.addMessageSuccess("ho reimpostato il regista che avevi selezionato")
    }
  }

  eliminaRegista() {
    if (this.registaSelezionato) {
      this.registaService.elimina(this.registaSelezionato).subscribe({
        next: () => {
          this.messageService.addMessageSuccess(
            'regista eliminato con successo'
          );
          this.registaSelezionato = null;
          this.registaSelezionatoModificato = null;
          this.modificheAbilitate = false;
          this.searchTypeUtils.loader(this.SearchType.RegistaModifica)
        },
        error: () => {
          this.messageService.addMessageError('errore eliminazione regista');
        },
      });
    }
  }
}
