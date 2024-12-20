import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BigliettoDto } from '../../model/bigliettoDto';
import { BigliettoService } from '../../services/biglietto.service';
import { MessagesService } from '../../services/messages.service';
@Component({
  selector: 'app-biglietti',
  templateUrl: './biglietti.component.html',
  styleUrl: './biglietti.component.css'
})
export class BigliettiComponent {
  biglietti : BigliettoDto[] = []
  paginaCorrente=0;
  totalePagine=10;
  constructor(private bigliettoService: BigliettoService, private route: ActivatedRoute, private router : Router, private messageService : MessagesService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paginaCorrente = +params['page'] || 0;
      this.getBiglietti();
    });
  }

  getBiglietti() : void {
    this.bigliettoService.getBiglietti(this.paginaCorrente, 10)
    .subscribe({next : response =>{
      this.biglietti = response.content;
      this.totalePagine = response.totalPages;

    },
    error : (error) =>{
      this.messageService.addMessageError("impossibile caricare biglietti")
    }
   })
  }
  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.aggiornaURL();
    }
  }

  paginaSuccessiva(): void {
    if(this.paginaCorrente < this.totalePagine - 1){
      this.paginaCorrente++;
      this.aggiornaURL();
    }
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
  formatTime(time: string): string {
    return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
  }
}
