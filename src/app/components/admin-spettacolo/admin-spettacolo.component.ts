import { Component } from '@angular/core';
import { NuovoSpettacoloDto } from '../../model/nuovoSpettacolo';
import { SpettacoloService } from '../../services/spettacolo.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SpettacoloDto } from '../../model/spettacolo';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { PostiSpettacoloResponseDto } from '../../model/postiSpettacolo';
import { PostoResponseDto } from '../../model/postoResponseDto';
import { PrenotazioneRequestDto } from '../../model/prenotazioneRequest';

@Component({
  selector: 'app-admin-spettacolo',
  templateUrl: './admin-spettacolo.component.html',
  styleUrl: './admin-spettacolo.component.css'
})
export class AdminSpettacoloComponent {
  nuovoSpettacolo: NuovoSpettacoloDto = this.resetNuovoSpettacolo()
  
  constructor(private spettacoloService : SpettacoloService, private prenotazioneService : PrenotazioneService){}
  private searchSubject = new Subject<string>();
  
  termineRicerca: string = '';
  isLoading = false;
  spettacoli: SpettacoloDto[] = [];
  risultatiRicerca: NuovoSpettacoloDto[] = [];
  spettacoloSelezionato: NuovoSpettacoloDto | null = null;
  spettacoloSelezionatoModificato: NuovoSpettacoloDto | null = null;
  modificheAbilitate: boolean = false;

  ngOnInit() : void{
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term) {
        this.cercaSpettacolo(term);
      } else {
        this.risultatiRicerca = [];
      }
    });
  }

  creaSpettacolo() {
    this.spettacoloService.nuovo(this.nuovoSpettacolo)
    this.nuovoSpettacolo = this.resetNuovoSpettacolo()
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }
  cercaSpettacolo(term: string) {
    this.isLoading = true;
    this.spettacoloService.cerca(term).subscribe(
      (risultati: NuovoSpettacoloDto[]) => {
        this.risultatiRicerca = risultati;
        this.isLoading = false;
      },
      error => {
        console.error('Errore nella ricerca:', error);
        this.risultatiRicerca = [];
        this.isLoading = false;
      }
    );
  }

  selezionaSpettacolo(spettacolo: NuovoSpettacoloDto) {
    this.spettacoloSelezionato = spettacolo;
    this.spettacoloSelezionatoModificato = { ...spettacolo };
    this.modificheAbilitate = false;
    this.risultatiRicerca = []
  }

  abilitaModifiche() {
    this.modificheAbilitate = true;
  }

  modificaSpettacolo() {
    if(this.spettacoloSelezionatoModificato){
      this.spettacoloService.nuovo(this.spettacoloSelezionatoModificato).subscribe()
      this.modificheAbilitate = false;
    }
  }

  annullaModifiche() {
    if (this.spettacoloSelezionato) {
      this.spettacoloSelezionatoModificato = { ...this.spettacoloSelezionato };
      this.modificheAbilitate = false;
    }
  }

  eliminaSpettacolo() {
    if (this.spettacoloSelezionato) {
      this.spettacoloService.elimina(this.spettacoloSelezionato).subscribe()
      this.spettacoloSelezionato = null;
      this.spettacoloSelezionatoModificato = null;
    }
  }

  private resetNuovoSpettacolo() : NuovoSpettacoloDto {
    return {
      id: undefined,
      data: '',          // Valore stringa vuoto per la data
      ora: '',           // Valore stringa vuoto per l'ora
      prezzo: 0,         // Imposta il prezzo a zero per iniziare
      salaId: {
        id: 0,           // ID iniziale a zero
        post: new Set()  // Set vuoto per i posti in sala
      },
      film: {
        id: undefined,
        titolo: '',      // Stringa vuota per il titolo
        durata: 0,       // Durata inizializzata a zero
        trama: '',       // Stringa vuota per la trama
        img: '',         // Stringa vuota per l'immagine
        datauscita: '',  // Stringa vuota per la data di uscita
        attores: [],     // Array vuoto per gli attori
        generes: [],     // Array vuoto per i generi
        registas: []     // Array vuoto per i registi
      },
      acquistabile: false // Impostato a false come predefinito
    };
  }

  //posti?: PostiSpettacoloResponseDto;
  posti = new Map()
  postiSelezionati: number[] = [];
  getPosti() : void{
    if(this.spettacoloSelezionato)
    this.spettacoloService.getPostiSpettacolo(this.spettacoloSelezionato.id!).subscribe(posti =>{
      this.posti = new Map(Object.entries(posti.posti));
      
    } )
  }

  getStatoClasse(posto: PostoResponseDto){
    switch(posto.stato){
      case "libero" : {
        return "libero"
      }
      case "occupato" : {
        return "libero"
      }
      case "bloccato" : {
        return "bloccato"
      }
      default : {
        return "bloccato"
      }
    }
  }
  isPostoSelezionato(postoId: number): boolean {
    return this.postiSelezionati.includes(postoId);
  }
  togglePosto(postoId: number) {
    const index = this.postiSelezionati.indexOf(postoId);
    if (index === -1) {
      this.postiSelezionati.push(postoId);
    } else {
      this.postiSelezionati.splice(index, 1);
    }
  }

  blocca() : void {
    if(this.spettacoloSelezionato){
      const bloccoRequest : PrenotazioneRequestDto = {postiIds : this.postiSelezionati, userId : 1, spettacoloId : this.spettacoloSelezionato.id!}
      alert("fatto!")
      //this.prenotazioneService.blocca(bloccoRequest).subscribe()
      this.postiSelezionati = []
    }
  }
}
