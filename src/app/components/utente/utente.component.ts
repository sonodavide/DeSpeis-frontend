import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent  {
  isAdminRoute: boolean = false;

  constructor(private router: Router) {}
  ngOnInit() {
    // Controlla l'URL corrente
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url==='/utente'
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/utente']);
  }
  
}
