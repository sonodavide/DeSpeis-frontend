import { Component } from '@angular/core';
import { PostiSpettacoloResponseDto } from '../../model/postiSpettacolo';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { ActivatedRoute } from '@angular/router';
import { SpettacoloService } from '../../services/spettacolo.service';
import { SharedBigliettiService } from '../../services/shared-biglietti.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-selezione-posti',
  templateUrl: './selezione-posti.component.html',
  styleUrl: './selezione-posti.component.css'
})
export class SelezionePostiComponent {
  
  posti? = new Map();

  postiSelezionati: number[] = [];

  constructor(private router : Router ,private spettacoloService : SpettacoloService, private route: ActivatedRoute, private prenotazioneService : PrenotazioneService, private sharedBigliettiService : SharedBigliettiService) { }

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
    this.spettacoloService.getPostiSpettacolo(spettacoloId).subscribe(posti =>{
      this.posti = new Map(Object.entries(posti.posti));
    })
  }

  prenota(){
    this.sharedBigliettiService.updateData(this.postiSelezionati)
    this.router.navigate(["/checkout"])
    //this.prenotazioneService.prenota({postiIds : this.postiSelezionati, userId : 1, spettacoloId : this.posti?.spettacoloId! }).subscribe()
  }

}
