import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../model/film';
@Component({
  selector: 'app-dettagli-film',
  templateUrl: './dettagli-film.component.html',
  styleUrls: ['./dettagli-film.component.css']
})
export class DettagliFilmComponent implements OnInit {

  film: FilmDto | null = null;  // Il film che verrà mostrato
  filmId!: number;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute  // Per accedere ai parametri della rotta
  ) { }

  ngOnInit(): void {
    // Recupera l'ID del film dalla rotta
    this.filmId = +this.route.snapshot.paramMap.get('id')!;

    // Chiama il service per ottenere i dettagli del film
    this.getFilmDetails(this.filmId);
  }

  getFilmDetails(id: number): void {
    this.filmService.getFilm(id).subscribe(
      film => this.film = film,  // Supponendo che il risultato sia un array e prendi il primo elemento
    )
  }
}

