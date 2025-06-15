import { Component } from '@angular/core';
import { SpettacoloService } from '../../services/spettacolo.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { NuovoSpettacoloDto } from '../../model/nuovoSpettacolo';
import { PaginatedResponse } from '../../model/paginatedResponse';
import { SpettacoloDto } from '../../model/spettacolo';
import { FormatterUtils} from '../../utils/formatterUtils';
import { MessagesService } from '../../services/messages.service';
import { PostoResponseDto } from '../../model/postoResponseDto';
@Component({
  selector: 'app-admin-blocca',
  templateUrl: './admin-blocca.component.html',
  styleUrl: './admin-blocca.component.css'
})
export class AdminBloccaComponent {
  // Variabili per la paginazione di Spettacolo - Modifica
  paginaCorrenteSpettacoloModifica: number = 0;
  totalePagineSpettacoloModifica: number = 0;
  pageSizeSpettacoloModifica: number = 4;

  termineRicercaSpettacoloModifica: string = '';
  risultatiRicercaSpettacolo: NuovoSpettacoloDto[] = [];
  spettacoloSelezionato: NuovoSpettacoloDto | null = null;
  spettacoloSelezionatoModificato: NuovoSpettacoloDto | null = null;
  modificheAbilitate: boolean = false;

  posti? = new Map();

  postiSelezionati: PostoResponseDto[] = [];
  eseguiRicerca(){
    this.spettacoloService.cerca(this.termineRicercaSpettacoloModifica.trim(), this.paginaCorrenteSpettacoloModifica, this.pageSizeSpettacoloModifica)
          .subscribe((response: PaginatedResponse<NuovoSpettacoloDto>) => {
            this.risultatiRicercaSpettacolo = response.content;
            this.totalePagineSpettacoloModifica = response.totalPages;
          });
  }

  resettaRicerca(){
    this.termineRicercaSpettacoloModifica = '';
      this.paginaCorrenteSpettacoloModifica = 0;
  }

  getSpettacoli(){
    this.spettacoloService.getAllPaginated(this.paginaCorrenteSpettacoloModifica, this.pageSizeSpettacoloModifica)
        .subscribe((response: PaginatedResponse<NuovoSpettacoloDto>) => {
          this.risultatiRicercaSpettacolo = response.content;
          this.totalePagineSpettacoloModifica = response.totalPages;
        });
  }
  paginaSuccessiva(){
    let termineRicerca = ''
    termineRicerca = this.termineRicercaSpettacoloModifica;
        if (this.paginaCorrenteSpettacoloModifica < this.totalePagineSpettacoloModifica - 1) {
          this.paginaCorrenteSpettacoloModifica++;
          termineRicerca ? this.eseguiRicerca() : this.getSpettacoli()
        }
        
  }

  paginaPrecedente(){
    let termineRicerca = ''
    termineRicerca = this.termineRicercaSpettacoloModifica;
    if (this.paginaCorrenteSpettacoloModifica > 0) {
      this.paginaCorrenteSpettacoloModifica--;
      termineRicerca ? this.eseguiRicerca() : this.getSpettacoli()
    }
  }

  selezionaSpettacolo(spettacolo : NuovoSpettacoloDto){
    if(spettacolo.id){
      this.spettacoloSelezionato=spettacolo
      this.spettacoloService.getPostiSpettacolo(spettacolo.id).subscribe(posti =>{
        this.posti = new Map(Object.entries(posti.posti));
      })
    
    }
  }




  isPostoSelezionato(posto: PostoResponseDto): boolean {
    return this.postiSelezionati.includes(posto);
  }

  selezionaPosto(posto : PostoResponseDto){
    if(this.postiSelezionati.includes(posto)){
      let index = this.postiSelezionati.indexOf(posto);
      this.postiSelezionati.splice(index)
    } else {
      this.postiSelezionati.push(posto)
    }
  }


  blocca(){
    if(this.spettacoloSelezionato && this.spettacoloSelezionato.id && this.postiSelezionati.length>0){
      this.postiService.blocca({postiIds: this.postiSelezionati, spettacoloId: this.spettacoloSelezionato.id}).subscribe({
        next : posti =>{
        this.posti = new Map(Object.entries(posti.posti));
        this.messageService.addMessageSuccess("posti bloccati/sbloccati con successo!")
      },
        error : (error) => {
          if(error.status === 400){
            this.messageService.addMessageError("posti non trovati")
          }
          else {
            this.messageService.addMessageError("impossibile bloccare/sbloccare posti")
          }
        }
      })
    }
    
  }
  constructor(private spettacoloService : SpettacoloService, private postiService : PrenotazioneService, private messageService : MessagesService){}
  ngOnInit():void{
    this.getSpettacoli()
  }
  
  formattafile(map : Map<any, any>) : any[]{
    return FormatterUtils.mapKeysToArrayReversed(map)
  }
}
