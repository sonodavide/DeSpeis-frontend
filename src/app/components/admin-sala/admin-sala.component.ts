import { Component } from '@angular/core';
import { SalaDto } from '../../model/salaDto';
import { PostoDto } from '../../model/postoDto';

@Component({
  selector: 'app-admin-sala',
  templateUrl: './admin-sala.component.html',
  styleUrl: './admin-sala.component.css'
})
export class AdminSalaComponent {
  file: { nome: string, sedili: number[] }[] = [{ nome: 'A', sedili: [1] }];
  termineRicerca: string = '';
  sale: SalaDto[] = [];
  risultatiRicerca: SalaDto[] = [];
  salaSelezionata: SalaDto | null = null;
  salaSelezionataModificata: SalaDto | null = null;

  aggiungiFila() {
    const nomeFila = String.fromCharCode(65 + this.file.length);
    this.file.push({ nome: nomeFila, sedili: [1] });

  }

  rimuoviFila() {
    if (this.file.length > 1) {
      this.file.pop();
    }
  }

  aggiungiPosto(nomeFila: string) {
    const fila = this.file.find(f => f.nome === nomeFila);
    if (fila) {
      const nuovoPosto = fila.sedili.length + 1;
      fila.sedili.push(nuovoPosto);
    }
  }
  
  rimuoviPosto(nomeFila: string) {
    const fila = this.file.find(f => f.nome === nomeFila);
    if (fila && fila.sedili.length > 0) {
      fila.sedili.pop();
    }
  }

  creaSala() {
    const idSala = Date.now();
    const nuoviPosti = new Set<PostoDto>();
    this.file.forEach((fila) => {
      fila.sedili.forEach((sedile) => {
        nuoviPosti.add({ id: Date.now() + sedile, fila: fila.nome, sedile });
      });
    });
    const nuovaSala: SalaDto = { id: idSala, post: nuoviPosti };
    this.sale.push(nuovaSala);
    this.file = [{ nome: 'A', sedili: [1] }];
  }

  cercaSala() {
    this.risultatiRicerca = this.sale.filter(sala => 
      sala.id!.toString().includes(this.termineRicerca)
    );
  }

  selezionaSala(sala: SalaDto) {
    this.salaSelezionata = sala;
    this.salaSelezionataModificata = { ...sala };
  }

  

  eliminaSala() {
    if (this.salaSelezionata) {
      this.sale = this.sale.filter(sala => sala.id !== this.salaSelezionata!.id);
      this.salaSelezionata = null;
      this.salaSelezionataModificata = null;
    }
  }

  aggiungiPostoModifica(fila: { nome: string; sedili: number[] }) {
    fila.sedili.push(fila.sedili.length + 1);
  }

  rimuoviPostoModifica(fila: { nome: string; sedili: number[] }) {
    if (fila.sedili.length > 1) {
      fila.sedili.pop();
    }
  }
  ngOnInit(): void {
    this.aggiungiFila(); 
    this.inizializzaSale();
  }

  inizializzaSale() {
    // Sala 1: 3 file, 5 sedili per fila
    const postiSala1: Set<PostoDto> = new Set();
    this.generaPosti(postiSala1, 3, 5, 1);
    this.sale.push({ id: 1, post: postiSala1 });

    // Sala 2: 4 file, 6 sedili per fila
    const postiSala2: Set<PostoDto> = new Set();
    this.generaPosti(postiSala2, 4, 6, 2);
    this.sale.push({ id: 2, post: postiSala2 });

    // Sala 3: 5 file, 4 sedili per fila
    const postiSala3: Set<PostoDto> = new Set();
    this.generaPosti(postiSala3, 5, 4, 3);
    this.sale.push({ id: 3, post: postiSala3 });
  }
  generaPosti(posti: Set<PostoDto>, numeroFile: number, numeroSedili: number, idSala: number) {
    for (let i = 0; i < numeroFile; i++) {
      const fila = String.fromCharCode(65 + i); // 'A', 'B', 'C', ecc.
      for (let j = 1; j <= numeroSedili; j++) {
        posti.add({ id: Date.now() + j, fila, sedile: j, sala: idSala });
      }
    }
  }
}
