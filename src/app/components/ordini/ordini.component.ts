import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdineService } from '../../services/ordine.service';
import { OrdineDto } from '../../model/ordineDto';
import { UtilsFormatter } from '../../utils/utilsFormatter';
import { BigliettoDto } from '../../model/bigliettoDto';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.css']
})
export class OrdiniComponent implements OnInit {
  ordini: OrdineDto[] = [];
  paginaCorrente = 0;
  totalePagine=10
  constructor(
    private ordineService: OrdineService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paginaCorrente = +params['page'] || 0;
      this.getOrdini();
    });
  }

  getOrdini(): void { //hardcoded id
    this.ordineService.getOrdiniByUserPaginated(1, this.paginaCorrente, 5).subscribe(response => {
      this.ordini = response.content;
      this.totalePagine = response.totalPages;
    });
  }

  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.aggiornaURL();
    }
  }

  paginaSuccessiva(): void {
    this.paginaCorrente++;
    this.aggiornaURL();
  }

  aggiornaURL(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.paginaCorrente },
      queryParamsHandling: 'merge'
    });
  }

  tornaAreaUtente(): void {
    this.router.navigate(['/utente']);
  }
  bigliettoToString(biglietto : BigliettoDto): string{
    return UtilsFormatter.bigliettoToString(biglietto)
  }
}
