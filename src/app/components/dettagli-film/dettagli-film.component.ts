import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../model/film';
import { Router } from '@angular/router';
import { AttoreService } from '../../services/attore.service';
import { GenereService } from '../../services/genere.service';
import { RegistaService } from '../../services/regista.service';
import { MessagesService } from '../../services/messages.service';
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
    private route: ActivatedRoute,  // Per accedere ai parametri della rotta
    private router: Router,
    private messageService : MessagesService

  ) {}

  ngOnInit(): void {
    // Recupera l'ID del film dalla rotta
    this.filmId = +this.route.snapshot.paramMap.get('id')!;

    // Chiama il service per ottenere i dettagli del film
    this.getFilmDetails(this.filmId);
  }

  getFilmDetails(id: number): void {
    this.filmService.getFilm(id).subscribe({
      next : (film) => this.film = film,  
      error : () => this.messageService.addMessageError("errore caricamento dettagli")
  })
  }


  cercaTag(tag: string, id?: number){
    if(id)
    this.router.navigate(['/cerca'], { queryParams: { tag, id } })
  }
}

