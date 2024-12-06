import { Component } from '@angular/core';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { NuovoSpettacoloDto } from '../../model/nuovoSpettacolo';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SpettacoloDto } from '../../model/spettacolo';
import { FormatterUtils } from '../../utils/formatterUtils';
import { MessagesService } from '../../services/messages.service';
import { PostiPerFila } from '../../model/postiSpettacoloResponseDto';
import { PostiPerFilaUtils } from '../../utils/postiPerFilaUtils';
import { PostiResponse } from '../../model/postiResponse';

@Component({
  selector: 'app-admin-blocca',
  templateUrl: './admin-blocca.component.html',
  styleUrl: './admin-blocca.component.css',
})
export class AdminBloccaComponent {

  paginaCorrenteSpettacoloModifica: number = 0;
  totalePagineSpettacoloModifica: number = 0;
  pageSizeSpettacoloModifica: number = 4;

  termineRicercaSpettacoloModifica: string = '';
  risultatiRicercaSpettacolo: NuovoSpettacoloDto[] = [];
  spettacoloSelezionato: NuovoSpettacoloDto | null = null;
  spettacoloSelezionatoModificato: NuovoSpettacoloDto | null = null;
  modificheAbilitate: boolean = false;

  postiPerFila: PostiPerFila[] = [];

  postiSelezionati: PostiPerFila[] = [];

  eseguiRicerca() {
    this.spettacoloService
      .cerca(
        this.termineRicercaSpettacoloModifica.trim(),
        this.paginaCorrenteSpettacoloModifica,
        this.pageSizeSpettacoloModifica
      )
      .subscribe((response: PaginatedResponse<NuovoSpettacoloDto>) => {
        this.risultatiRicercaSpettacolo = response.content;
        this.totalePagineSpettacoloModifica = response.totalPages;
      });
  }

  resettaRicerca() {
    this.termineRicercaSpettacoloModifica = '';
    this.paginaCorrenteSpettacoloModifica = 0;
  }

  getSpettacoli() {
    this.spettacoloService
      .getAllPaginated(
        this.paginaCorrenteSpettacoloModifica,
        this.pageSizeSpettacoloModifica
      )
      .subscribe((response: PaginatedResponse<NuovoSpettacoloDto>) => {
        this.risultatiRicercaSpettacolo = response.content;
        this.totalePagineSpettacoloModifica = response.totalPages;
      });
  }
  paginaSuccessiva() {
    let termineRicerca = '';
    termineRicerca = this.termineRicercaSpettacoloModifica;
    if (
      this.paginaCorrenteSpettacoloModifica <
      this.totalePagineSpettacoloModifica - 1
    ) {
      this.paginaCorrenteSpettacoloModifica++;
      termineRicerca ? this.eseguiRicerca() : this.getSpettacoli();
    }
  }

  paginaPrecedente() {
    let termineRicerca = '';
    termineRicerca = this.termineRicercaSpettacoloModifica;
    if (this.paginaCorrenteSpettacoloModifica > 0) {
      this.paginaCorrenteSpettacoloModifica--;
      termineRicerca ? this.eseguiRicerca() : this.getSpettacoli();
    }
  }

  selezionaSpettacolo(spettacolo: NuovoSpettacoloDto) {
    if (spettacolo.id) {
      this.spettacoloSelezionato = spettacolo;
      this.spettacoloService
        .getPostiSpettacolo(spettacolo.id)
        .subscribe((response) => {
          this.postiPerFila = response.postiPerFila;
          this.postiPerFilaUtilsMiei.setPostiPerFila(this.postiPerFila);
        });
    }
  }

  isPostoSelezionato(fila: string, posto: PostiResponse): boolean {
    return this.postiPerFilaUtilsResponse.include(fila, posto);
  }

  selezionaPosto(fila: string, posto: PostiResponse) {
    this.postiPerFilaUtilsResponse.togglePosto(fila, posto);
  }

  blocca() {
    if (
      this.spettacoloSelezionato &&
      this.spettacoloSelezionato.id &&
      this.postiPerFilaUtilsResponse.getTotalePosti() > 0
    ) {
      this.spettacoloService
        .getSenzaFilmById(this.spettacoloSelezionato.id)
        .subscribe({
          next: (response) => {
            this.postiService.blocca({postiSpettacoloResponseDto : {spettacoloSenzaFilmTagsDto : response, postiPerFila : this.postiSelezionati}}).subscribe({
              next: (response) => {
                this.postiPerFila = response.postiPerFila;
                this.postiPerFilaUtilsMiei.setPostiPerFila(this.postiPerFila);
                this.messageService.addMessageSuccess(
                  'posti bloccati/sbloccati con successo!'
                );
              },
              error: (error) => {
                if (error.status === 400) {
                  this.messageService.addMessageError('posti non trovati');
                } else {
                  this.messageService.addMessageError(
                    'impossibile bloccare/sbloccare posti'
                  );
                }
              },
            });
          },
          error : () => {
            this.messageService.addMessageError("Errore")
          }
        });
    }
  }
  public postiPerFilaUtilsMiei: PostiPerFilaUtils = new PostiPerFilaUtils();
  private postiPerFilaUtilsResponse: PostiPerFilaUtils = new PostiPerFilaUtils();
  constructor(
    private spettacoloService: SpettacoloService,
    private postiService: PrenotazioneService,
    private messageService: MessagesService,

  ) {
    this.postiPerFilaUtilsResponse.setPostiPerFila(this.postiSelezionati)
  }
  ngOnInit(): void {
    this.getSpettacoli();
  }

  formattafile(map: Map<any, any>): any[] {
    return FormatterUtils.mapKeysToArrayReversed(map);
  }
}
