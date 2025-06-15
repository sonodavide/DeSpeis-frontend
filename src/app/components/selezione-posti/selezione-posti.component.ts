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
import { SpettacoloSenzaFilmDto } from '../../model/spettacoloSenzaFilm';
@Component({
  selector: 'app-selezione-posti',
  templateUrl: './selezione-posti.component.html',
  styleUrl: './selezione-posti.component.css'
})
export class SelezionePostiComponent {
  
  postiPerFila : PostiPerFila[] = []
  spettacoloId:number = 0
  postiSelezionati: PostiPerFila[] = [];
  
  public postiPerFilaUtilsMiei: PostiPerFilaUtils = new PostiPerFilaUtils();
  private postiPerFilaUtilsResponse: PostiPerFilaUtils = new PostiPerFilaUtils();
  constructor(private router : Router ,private spettacoloService : SpettacoloService, private route: ActivatedRoute, private prenotazioneService : PrenotazioneService, private sharedBigliettiService : SharedBigliettiService, private messageService : MessagesService) {
    this.postiPerFilaUtilsResponse.setPostiPerFila(this.postiSelezionati)
  }

  ngOnInit(): void {
    this.spettacoloId = +this.route.snapshot.paramMap.get('id')!
    this.spettacoloService.getPostiSpettacolo(this.spettacoloId).subscribe(response =>{
      this.postiPerFila = response.postiPerFila
      this.postiPerFilaUtilsMiei.setPostiPerFila(this.postiPerFila)
    })
  }

  isPostoSelezionato(fila : string, posto: PostiResponse): boolean {
    return this.postiPerFilaUtilsResponse.include(fila, posto)
  }

  selezionaPosto(fila : string, posto : PostiResponse){
    this.postiPerFilaUtilsResponse.togglePosto(fila, posto)
  }

  prenota(){
    this.spettacoloService.getSenzaFilmAcquistabileById(this.spettacoloId).subscribe({
      next: (response : SpettacoloSenzaFilmDto) =>{
        this.sharedBigliettiService.updateData({postiSpettacoloResponseDto : {postiPerFila : this.postiSelezionati, spettacoloSenzaFilmDto : response}})
        this.router.navigate(["/checkout"])
      },
      error : () =>{
        this.messageService.addMessageError("Errore durante il passaggio al checkout")
      }
    })
    
    
  }
  formattafile(map : Map<any, any>) : any[]{
    return FormatterUtils.mapKeysToArrayReversed(map)
  }

}
