import { Component } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../model/film';
import { Router } from '@angular/router';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent {
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.FilmModifica]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 10,
      risultati: [],
    }}
  SearchType = SearchType
  searchTypeUtils: SearchTypeUtils;
  constructor(private filmService : FilmService, private router: Router){
    this.searchTypeUtils = new SearchTypeUtils(this.searchData, filmService)
  }
  films : FilmDto[] = []
  
  ngOnInit() : void{
    this.searchTypeUtils.loader(SearchType.FilmModifica)
    
  }

 

  goToFilmDetail(filmId: number): void {
    this.router.navigate(['/film', filmId]);  // Naviga alla rotta del film con l'ID specifico
  }
}
