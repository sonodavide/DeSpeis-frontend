import { Component } from '@angular/core';
import { SalaDto } from '../../model/salaDto';

import { SalaService } from '../../services/sala.service';
import { SalaConPosti } from '../../model/salaConPostiPerFila';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';
import cloneDeep  from 'lodash/cloneDeep';
@Component({
  selector: 'app-admin-sala',
  templateUrl: './admin-sala.component.html',
  styleUrl: './admin-sala.component.css',
})
export class AdminSalaComponent {

  SearchType = SearchType;
  searchTypeUtils: SearchTypeUtils;
  constructor(
    private salaService: SalaService,
    private messageService: MessagesService
  ) {
    this.searchTypeUtils = new SearchTypeUtils(
      this.searchData,
      undefined,
      salaService,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      messageService
    );
  }
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.SalaModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
  };

  nuovaSala: SalaConPosti = { id: undefined, postis: [] };
  salaSelezionata: SalaConPosti | null = null;
  salaSelezionataModificata: SalaConPosti | null = null;
  modificheAbilitate = false;
  aggiungiFila() {
    const nomeFila = String.fromCharCode(65 + this.nuovaSala.postis.length);
    this.nuovaSala.postis.push({ id: undefined, fila: nomeFila, sedili: 1 });
  }

  rimuoviFila() {
    if (this.nuovaSala.postis.length > 1) {
      this.nuovaSala.postis.pop();
    }
  }

  aggiungiPosto(nomeFila: string) {
    for (let posto of this.nuovaSala.postis) {
      if (posto.fila === nomeFila) {
        posto.sedili++;
      }
    }
  }

  rimuoviPosto(nomeFila: string) {

    if (
      this.nuovaSala.postis.length === 1 &&
      this.nuovaSala.postis[0].fila === 'A' &&
      this.nuovaSala.postis[0].sedili === 1
    ) {
      return;
    }

    const filaIndex = this.nuovaSala.postis.findIndex(
      (posto) => posto.fila === nomeFila
    );

    if (filaIndex >= 0) {
      const posto = this.nuovaSala.postis[filaIndex];

      if (posto.sedili > 1) {
      
        posto.sedili--;
      } else {
       
        this.nuovaSala.postis.splice(filaIndex, 1);

       
        for (let i = filaIndex; i < this.nuovaSala.postis.length; i++) {
          this.nuovaSala.postis[i].fila = String.fromCharCode(65 + i);
        }
      }
    }
  }

  creaSala() {
    if(this.nuovaSala.id)
    this.salaService.nuovo(this.nuovaSala).subscribe({
      next: () => {
        this.messageService.addMessageSuccess('sala aggiunta con successo!');
        this.resetNuovaSala()
        this.searchTypeUtils.loader(SearchType.SalaModifica)
      },
      error: (error) => {
        if (error.status === 400) {
          this.messageService.addMessageError('alcuni dati non vanno bene o la sala esiste già');
        } else {
          this.messageService.addMessageError('errore aggiunta sala.');
        }
      },
    });
  }

  selezionaSala(sala: SalaDto) {
    if (sala.id) {
      this.salaService.getPostiPerFila(sala.id!).subscribe({
        next: (response) => {
          this.salaSelezionata = cloneDeep(response);
          this.salaSelezionataModificata = cloneDeep(response);
        },
        error: (error) => {
          this.messageService.addMessageError('impossibile caricare la sala');
        },
      });
    }
  }

  eliminaSala(): void {
    if (this.salaSelezionata) {
      this.salaService.elimina({ id: this.salaSelezionata.id }).subscribe({
        next: () => {
          this.messageService.addMessageSuccess('sala eliminata con successo');
          this.salaSelezionata = null;
          this.salaSelezionataModificata = null;
          this.modificheAbilitate = false;
          this.searchTypeUtils.loader(this.SearchType.SalaModifica)
        },
        error: (error) => {
          if(error.status === 409){
            this.messageService.addMessageError('errore eliminazione sala. La sala è legata a uno o più spettacoli')
          }else {
            this.messageService.addMessageError('errore eliminazione sala.');
          }
        },
      });
    }
  }
  modificaSala(): void {
    if (this.salaSelezionataModificata) {
      this.salaService.modifica(this.salaSelezionataModificata).subscribe({
        next: () => {
          this.messageService.addMessageSuccess('sala modificata con successo!');
          this.salaSelezionata = null;
          this.salaSelezionataModificata = null;
          this.modificheAbilitate = false;
          this.searchTypeUtils.loader(this.SearchType.SalaModifica)
        },
        error: (error) => {
          if (error.status === 400) {
            this.messageService.addMessageError('alcuni dati non vanno bene.');
          } else if(error.status === 409){
            this.messageService.addMessageError('ci sono spettacoli in devono ancora essere fatti/in corso in questa sala. Non posso modificarlo/eliminarlo')
          }
          else {
            this.messageService.addMessageError('errore modifica sala.');
          }
        },
      });
    }
  }

  annullaModifiche(): void {
    if(this.salaSelezionata){
      this.salaSelezionataModificata = cloneDeep(this.salaSelezionata);
  
      this.modificheAbilitate = false;
      this.messageService.addMessageSuccess(
        'ho reimpostato la sala che avevi selezionato'
      );

    }
  }
  aggiungiFilaModifica() {
    if (this.salaSelezionataModificata) {
      const nomeFila = String.fromCharCode(
        65 + this.salaSelezionataModificata.postis.length
      );
      this.salaSelezionataModificata.postis.push({
        id: undefined,
        fila: nomeFila,
        sedili: 1,
      });
      this.modificheAbilitate=true
    }
  }

  rimuoviFilaModifica() {
    if (this.salaSelezionataModificata) {
      if (this.salaSelezionataModificata.postis.length > 1) {
        this.salaSelezionataModificata.postis.pop();
        this.modificheAbilitate = true;
        this.modificheAbilitate=true
      }
    }
  }

  aggiungiPostoModifica(nomeFila: string) {
    if (this.salaSelezionataModificata) {
      for (let posto of this.salaSelezionataModificata.postis) {
        if (posto.fila === nomeFila) {
          posto.sedili++;
          this.modificheAbilitate = true;
        }
      }
    }
  }

  rimuoviPostoModifica(nomeFila: string) {
    if (!this.salaSelezionataModificata) {
      return;
    }
  

    if (this.salaSelezionataModificata.postis.length === 1 && 
        this.salaSelezionataModificata.postis[0].fila === 'A' &&
        this.salaSelezionataModificata.postis[0].sedili === 1) {
      return;
    }
  
    const filaIndex = this.salaSelezionataModificata.postis.findIndex(
      posto => posto.fila === nomeFila
    );
    
    if (filaIndex >= 0) {
      const posto = this.salaSelezionataModificata.postis[filaIndex];
      
      if (posto.sedili > 1) {

        posto.sedili--;
        this.modificheAbilitate = true;
      } else {

        this.salaSelezionataModificata.postis.splice(filaIndex, 1);
        

        for (let i = filaIndex; i < this.salaSelezionataModificata.postis.length; i++) {
          this.salaSelezionataModificata.postis[i].fila = String.fromCharCode(65 + i);
        }
        this.modificheAbilitate = true;
      }
    }
  }
  ngOnInit(): void {
    this.resetNuovaSala();
    this.searchTypeUtils.loader(SearchType.SalaModifica);
  }

  resetNuovaSala(): void {
    this.nuovaSala = { id: undefined, postis: [{ fila: 'A', sedili: 1 }] };
  }
}
