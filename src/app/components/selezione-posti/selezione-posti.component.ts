import { Component } from '@angular/core';
import { PostiPerFila, PostiSpettacoloResponseDto } from '../../model/postiSpettacoloResponseDto';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { ActivatedRoute } from '@angular/router';
import { SpettacoloService } from '../../services/spettacolo.service';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { Router } from '@angular/router';

import { FormatterUtils } from '../../utils/formatterUtils';
import { PostiPerFilaUtils } from '../../utils/postiPerFilaUtils';
import { PostiResponse } from '../../model/postiResponse';
import { MessagesService } from '../../services/messages.service';
import { SpettacoloSenzaFilmTagsDto } from '../../model/spettacoloSenzaFilmTags';
@Component({
  selector: 'app-selezione-posti',
  templateUrl: './selezione-posti.component.html',
  styleUrl: './selezione-posti.component.css'
})
export class SelezionePostiComponent {
  
  postiPerFila : PostiPerFila[] = []
  spettacoloId:number = 0
  postiSelezionati: PostiPerFila[] = [];
  spettacolo: SpettacoloSenzaFilmTagsDto | null = null;
  public postiPerFilaUtilsMiei: PostiPerFilaUtils = new PostiPerFilaUtils();
  private postiPerFilaUtilsResponse: PostiPerFilaUtils = new PostiPerFilaUtils();
  constructor(private router : Router ,private spettacoloService : SpettacoloService, private route: ActivatedRoute, private prenotazioneService : PrenotazioneService, private sharedBigliettiService : SharedBigliettiService, private messageService : MessagesService) {
    this.postiPerFilaUtilsResponse.setPostiPerFila(this.postiSelezionati)
  }

  ngOnInit(): void {
    this.spettacoloId = +this.route.snapshot.paramMap.get('id')!
    this.spettacoloService.getPostiSpettacoloAcquistabile(this.spettacoloId).subscribe(response =>{
      this.postiPerFila = response.postiPerFila
      this.postiPerFilaUtilsMiei.setPostiPerFila(this.postiPerFila)
    })
    this.spettacoloService.getSenzaFilmAcquistabileById(this.spettacoloId).subscribe({
      next : (response) => {
        this.spettacolo=response
      },
      error : () => {
        this.messageService.addMessageError("non sono riuscito a caricare i dati dello spettacolo")
      }
    })
  }

  isPostoSelezionato(fila : string, posto: PostiResponse): boolean {
    return this.postiPerFilaUtilsResponse.include(fila, posto)
  }

  selezionaPosto(fila : string, posto : PostiResponse){
    this.postiPerFilaUtilsResponse.togglePosto(fila, posto)
  }

  prenota(){
    if(this.postiPerFilaUtilsResponse.getTotalePosti() > 0){
      if(this.spettacolo){
        this.sharedBigliettiService.updateData({postiSpettacoloResponseDto : {postiPerFila : this.postiSelezionati, spettacoloSenzaFilmDto : this.spettacolo}})
        this.router.navigate(["/checkout"])
      }
    } else {
      this.messageService.addMessageError("non hai selezionato alcun posto")
    }
     
    
    
  }
  formattafile(map : Map<any, any>) : any[]{
    return FormatterUtils.mapKeysToArrayReversed(map)
  }

}
