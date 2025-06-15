import { Component } from '@angular/core';
import { PostiSpettacoloResponseDto } from '../../model/postiSpettacolo';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { ActivatedRoute } from '@angular/router';
import { SpettacoloService } from '../../services/spettacolo.service';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { Router } from '@angular/router';
import { PostoResponseDto } from '../../model/postoResponseDto';
import { FormatterUtils } from '../../utils/formatterUtils';
@Component({
  selector: 'app-selezione-posti',
  templateUrl: './selezione-posti.component.html',
  styleUrl: './selezione-posti.component.css'
})
export class SelezionePostiComponent {
  
  posti? = new Map();
  spettacoloId:number = 0
  postiSelezionati: PostoResponseDto[] = [];

  constructor(private router : Router ,private spettacoloService : SpettacoloService, private route: ActivatedRoute, private prenotazioneService : PrenotazioneService, private sharedBigliettiService : SharedBigliettiService) { }

  ngOnInit(): void {
    this.spettacoloId = +this.route.snapshot.paramMap.get('id')!
    this.spettacoloService.getPostiSpettacolo(this.spettacoloId).subscribe(posti =>{
      this.posti = new Map(Object.entries(posti.posti));
    })
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

  prenota(){
    this.sharedBigliettiService.updateData({postiIds: this.postiSelezionati, spettacoloId: this.spettacoloId})
    this.router.navigate(["/checkout"])
    
  }
  formattafile(map : Map<any, any>) : any[]{
    return FormatterUtils.mapKeysToArrayReversed(map)
  }

}
