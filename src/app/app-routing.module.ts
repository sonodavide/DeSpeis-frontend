import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './components/films/films.component';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';
import { SpettacoliComponent } from './components/spettacoli/spettacoli.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SelezionePostiComponent } from './components/selezione-posti/selezione-posti.component';
import { UtenteComponent } from './components/utente/utente.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { BigliettiComponent } from './components/biglietti/biglietti.component';

const routes: Routes = [
  {path:'films', component:FilmsComponent},
  {path: 'film/:id', component: DettagliFilmComponent},
  {path: 'spettacoli', component: SpettacoliComponent},
  {path: '', component: HomepageComponent},
  {path: 'selezione-posti/:id', component: SelezionePostiComponent},
  {path: 'utente', component:UtenteComponent},
  {path: 'ordini', component:OrdiniComponent},
  {path: 'biglietti', component: BigliettiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
