import { Component, OnInit } from '@angular/core';
import { FilmDto } from '../../model/film';
import { AttoreDto } from '../../model/film';
import { GenereDto } from '../../model/film';
import { RegistaDto } from '../../model/film';
import { OrdineDto } from '../../model/ordineDto';
import { SalaDto } from '../../model/salaDto';
import { SpettacoloDto } from '../../model/spettacolo';

import { Router } from '@angular/router';
import { NumeriUtiliService } from '../../services/numeri-utili.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {
  isAdminRoute: boolean = false;

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url==='/admin'
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
