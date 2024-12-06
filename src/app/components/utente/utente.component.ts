import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent  {
  isUtenteRoute: boolean = false;

  constructor(private router: Router) {}
  ngOnInit() {

    this.router.events.subscribe(() => {
      this.isUtenteRoute = this.router.url==='/utente'
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/utente']);
  }
  
}
