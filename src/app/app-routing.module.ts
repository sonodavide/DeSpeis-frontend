import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './components/films/films.component';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';
import { SpettacoliComponent } from './components/spettacoli/spettacoli.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SelezionePostiComponent } from './components/selezione-posti/selezione-posti.component';

const routes: Routes = [
  {path:'films', component:FilmsComponent},
  {path: 'film/:id', component: DettagliFilmComponent},
  {path: 'spettacoli', component: SpettacoliComponent},
  {path: '', component: HomepageComponent},
  {path: 'selezione-posti', component: SelezionePostiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
