import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films/films.component';

import {  provideHttpClient } from '@angular/common/http';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TastoSopraComponent } from './components/tasto-sopra/tasto-sopra.component';
import { SpettacoliComponent } from './components/spettacoli/spettacoli.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SelezionePostiComponent } from './components/selezione-posti/selezione-posti.component';
import { JoinPipe } from './utils/join.pipe';

import { UtenteComponent } from './components/utente/utente.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { BigliettiComponent } from './components/biglietti/biglietti.component';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';

import { AdminGenereComponent } from './components/admin-genere/admin-genere.component';
import { AdminAttoreComponent } from './components/admin-attore/admin-attore.component';
import { AdminRegistaComponent } from './components/admin-regista/admin-regista.component';
import { AdminFilmComponent } from './components/admin-film/admin-film.component';
import { AdminSpettacoloComponent } from './components/admin-spettacolo/admin-spettacolo.component';
import { AdminSalaComponent } from './components/admin-sala/admin-sala.component';
import { AdminUtenteComponent } from './components/admin-utente/admin-utente.component';
import { AdminBloccaComponent } from './components/admin-blocca/admin-blocca.component';
@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    DettagliFilmComponent,
    NavbarComponent,
    TastoSopraComponent,
    SpettacoliComponent,
    HomepageComponent,
    SelezionePostiComponent,
    JoinPipe,
    UtenteComponent,
    OrdiniComponent,
    BigliettiComponent,
    CheckoutComponent,
    AdminComponent,

    AdminGenereComponent,
    AdminAttoreComponent,
    AdminRegistaComponent,
    AdminFilmComponent,
    AdminSpettacoloComponent,
    AdminSalaComponent,
    AdminUtenteComponent,
    AdminBloccaComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
