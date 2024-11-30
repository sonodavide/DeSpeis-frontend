import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { FilmDto } from '../../model/film';
import { Router } from '@angular/router';
import { RegistaService } from '../../services/regista.service';
import { GenereService } from '../../services/genere.service';
import { AttoreService } from '../../services/attore.service';
import { MessagesService } from '../../services/messages.service';
@Component({
  selector: 'app-cerca-tag',
  templateUrl: './cerca-tag.component.html',
  styleUrl: './cerca-tag.component.css',
})
export class CercaTagComponent {
  tag: string = '';
  id: number = 0;
  nome: string = ''
  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private router: Router,
    private attoreService: AttoreService,
    private genereService: GenereService,
    private registaService: RegistaService,
    private messageService: MessagesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tag = params['tag'];
      this.id = params['id'];
    });
    this.loadData();
    switch (this.tag) {
      case 'genere':
        this.genereService.getNomeById(this.id).subscribe(nome => this.nome=nome);
        break;
      case 'attore':
        this.attoreService.getNomeById(this.id).subscribe(nome => this.nome=nome);
        break;
      case 'regista':
        this.registaService.getNomeById(this.id).subscribe(nome => this.nome=nome);
        break;
    }
  }
  films: FilmDto[] = [];
  paginaCorrente: number = 0;
  totalePagine: number = 0;
  loadData(): void {
    this.filmService
      .cercaTag(this.tag, this.id, this.paginaCorrente)
      .subscribe({next : (data) => {
        this.films = data.content;
        this.totalePagine = data.totalPages;
      },
      error : (error) =>{
        this.messageService.addMessageError("impossibile caricare film")
      }
  });
  }
  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.loadData();
    }
  }

  paginaSuccessiva(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.loadData();
    }
  }

  goToFilmDetail(filmId: number): void {
    this.router.navigate(['/film', filmId]); // Naviga alla rotta del film con l'ID specifico
  }
}
