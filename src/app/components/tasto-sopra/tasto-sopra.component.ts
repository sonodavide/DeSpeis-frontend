import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tasto-sopra',
  templateUrl: './tasto-sopra.component.html',
  styleUrl: './tasto-sopra.component.css'
})
export class TastoSopraComponent {
  showScrollButton = false;


  @HostListener('window:scroll', [])
  onWindowScroll() {

    this.showScrollButton = window.pageYOffset > 400;
  }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
