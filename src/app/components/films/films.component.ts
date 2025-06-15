import { Component } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../model/film';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent {

  constructor(private filmService : FilmService, private router: Router){}
  films : FilmDto[] = []
  
  ngOnInit() : void{
    this.loadFilms()
    
  }

  loadFilms() : void{
    this.filmService.getFilms().subscribe(film => this.films = film)
  }

  goToFilmDetail(filmId: number): void {
    this.router.navigate(['/film', filmId]);  // Naviga alla rotta del film con l'ID specifico
  }
}
