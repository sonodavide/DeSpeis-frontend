import { Component } from '@angular/core';
import { GenereDto } from '../../model/film';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GenereService } from '../../services/genere.service';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-admin-genere',
  templateUrl: './admin-genere.component.html',
  styleUrl: './admin-genere.component.css',
})
export class AdminGenereComponent {
  searchTypeUtils: SearchTypeUtils;
  SerachType = SearchType;
  constructor(
    private genereService: GenereService,
    private messageService: MessagesService
  ) {
    this.searchTypeUtils = new SearchTypeUtils(
      this.searchData,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      genereService,
      undefined,
      undefined,
      undefined,
      messageService
    );
  }
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.GenereModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
  };
  nuovoGenere: GenereDto = { id: undefined, genere: '' };

  genereSelezionato: GenereDto | null = null;
  genereSelezionatoModificato: GenereDto | null = null;
  modificheAbilitate: boolean = false;

  ngOnInit(): void {
    this.searchTypeUtils.loader(SearchType.GenereModifica);
  }

  creaGenere(): void {
    this.genereService.nuovo(this.nuovoGenere).subscribe({
      next: () => {
        this.messageService.addMessageSuccess('genere aggiunto con successo!');
        this.nuovoGenere = { id: undefined, genere: '' };
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.messageService.addMessageError('alcuni dati non vanno bene.');
        } else {
          this.messageService.addMessageError('errore aggiunta genere.');
        }
      },
    });
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
    if (this.genereSelezionatoModificato) {
      this.genereService.nuovo(this.genereSelezionatoModificato).subscribe({
        next: () => {
          this.messageService.addMessageSuccess(
            'genere aggiunto con successo!'
          );
          this.genereSelezionato = null;
          this.genereSelezionatoModificato = null;
          this.modificheAbilitate = false;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.messageService.addMessageError('alcuni dati non vanno bene.');
          } else {
            this.messageService.addMessageError('errore aggiunta genere.');
          }
        },
      });
      this.nuovoGenere = { id: undefined, genere: '' };
    }
  }

  annullaModifiche() {
    if (this.genereSelezionato) {
      this.genereSelezionatoModificato = { ...this.genereSelezionato };
      this.modificheAbilitate = false;
      this.messageService.addMessageSuccess(
        'ho reimpostato il genere che avevi selezionato'
      );
    }
  }

  eliminaGenere() {
    if (this.genereSelezionato) {
      this.genereService.elimina(this.genereSelezionato).subscribe({
        next: () => {
          this.messageService.addMessageSuccess(
            'genere eliminato con successo'
          );
          this.genereSelezionato = null;
          this.genereSelezionatoModificato = null;
          this.modificheAbilitate = false;
        },
        error: () => {
          this.messageService.addMessageError('errore eliminazione genere');
        },
      });
    }
  }
}
