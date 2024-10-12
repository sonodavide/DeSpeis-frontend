import { Component, OnInit } from '@angular/core';
import { FilmDto } from '../../model/film';
import { AttoreDto } from '../../model/film';
import { GenereDto } from '../../model/film';
import { RegistaDto } from '../../model/film';
import { OrdineDto } from '../../model/ordineDto';
import { SalaDto } from '../../model/salaDto';
import { SpettacoloDto } from '../../model/spettacolo';
import { UtenteDto } from '../../model/utenteDto';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // Mock data per la dimostrazione
  films: FilmDto[] = [];
  actors: AttoreDto[] = [];
  genres: GenereDto[] = [];
  users: UtenteDto[] = [];
  
  newSala: any = { rows: 0, seatsPerRow: 0 };
  newFilm: any = { titolo: '', actors: [], genres: [] };
  newSpettacolo: any = { data: '', ora: '', filmId: null };
  newActor: AttoreDto = { id: 0, nome: '', cognome: '' };
  filteredActors: AttoreDto[] = [];
  filteredGenres: GenereDto[] = [];

  selectedUserId: number = 0;
  userOrders: OrdineDto[] = [];

  ngOnInit(): void {
    // Esempio di dati mock
    this.actors = [{ id: 1, nome: 'Leonardo', cognome: 'DiCaprio' }, { id: 2, nome: 'Brad', cognome: 'Pitt' }];
    this.genres = [{ id: 1, genere: 'Azione' }, { id: 2, genere: 'Commedia' }];
    this.films = [{ id: 1, titolo: 'Inception', durata: 148, trama: '', img: '', datauscita: '', attores: [], generes: [], registas: [] }];
    this.users = [{ id: 1, username: 'user1', nome: 'Mario', cognome: 'Rossi', datanascita: '', telefono: '' }];
  }

  // Metodi per gestire le sezioni
  createSala() { /* Logica per creazione sala */ }
  createSpettacolo() { /* Logica per creazione spettacolo */ }
  createFilm() { /* Logica per creazione film */ }
  createActor() { /* Logica per creazione attore */ }
  
  filterActors(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredActors = this.actors.filter(a => `${a.nome} ${a.cognome}`.toLowerCase().includes(query));
  }
  
  addActor(actor: AttoreDto) {
    this.newFilm.actors.push(actor);
    this.filteredActors = [];
  }

  removeActor(actor: AttoreDto) {
    this.newFilm.actors = this.newFilm.actors.filter((a: AttoreDto) => a.id !== actor.id);
  }

  filterGenres(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredGenres = this.genres.filter(g => g.genere.toLowerCase().includes(query));
  }

  addGenre(genre: GenereDto) {
    this.newFilm.genres.push(genre);
    this.filteredGenres = [];
  }

  removeGenre(genre: GenereDto) {
    this.newFilm.genres = this.newFilm.genres.filter((g: GenereDto) => g.id !== genre.id);
  }
  

  showUserOrders(userId: number) {
    this.userOrders = [
      { id: 1, data: '2024-10-08', stato: 'confermato', totale: 50.0, bigliettos: [] } // Mock ordini per l'utente selezionato
    ];
  }
  get selectedUser(): UtenteDto | undefined {
    return this.users.find(user => user.id === this.selectedUserId);
  }
}
