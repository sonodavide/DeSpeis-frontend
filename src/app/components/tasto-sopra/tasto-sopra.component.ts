import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tasto-sopra',
  templateUrl: './tasto-sopra.component.html',
  styleUrl: './tasto-sopra.component.css'
})
export class TastoSopraComponent {
  showScrollButton = false;

  // Ascolta lo scroll dell'utente
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Mostra il pulsante quando si è scesi oltre i 400px
    this.showScrollButton = window.pageYOffset > 400;
  }

  // Funzione per scorrere verso l'alto
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
