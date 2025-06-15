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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
