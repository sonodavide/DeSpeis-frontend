import { Component } from '@angular/core';
import { PostispettacoloDto } from '../../model/postiSpettacolo';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { ActivatedRoute } from '@angular/router';
import { SpettacoloService } from '../../services/spettacolo.service';

@Component({
  selector: 'app-selezione-posti',
  templateUrl: './selezione-posti.component.html',
  styleUrl: './selezione-posti.component.css'
})
export class SelezionePostiComponent {
  
  posti?: PostispettacoloDto;

  postiSelezionati: number[] = [];

  constructor(private spettacoloService : SpettacoloService, private route: ActivatedRoute, private prenotazioneService : PrenotazioneService) { }

  ngOnInit(): void {
    this.getPosti()
  }

  libero(stato : string){
    return stato==="libero"
  }

  isPostoSelezionato(postoId: number): boolean {
    return this.postiSelezionati.includes(postoId);
  }

  selezionaPosto(postoId : number){
    if(this.postiSelezionati.includes(postoId)){
      let index = this.postiSelezionati.indexOf(postoId);
      this.postiSelezionati.splice(index)
    } else {
      this.postiSelezionati.push(postoId)
    }
  }
  getPosti() {
    let spettacoloId : number = +this.route.snapshot.paramMap.get('id')!
    this.spettacoloService.getPostiSpettacolo(spettacoloId).subscribe(posti => this.posti= posti)
  }

  prenota(){
    
    this.prenotazioneService.prenota({postiIds : this.postiSelezionati, userId : 1, spettacoloId : this.posti?.spettacoloId! }).subscribe()
  }
}
