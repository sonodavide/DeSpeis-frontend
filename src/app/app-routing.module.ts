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
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAttoreComponent } from './components/admin-attore/admin-attore.component';
import { AdminGenereComponent } from './components/admin-genere/admin-genere.component';
import { AdminRegistaComponent } from './components/admin-regista/admin-regista.component';
import { AdminFilmComponent } from './components/admin-film/admin-film.component';
import { AdminSalaComponent } from './components/admin-sala/admin-sala.component';
import { AdminSpettacoloComponent } from './components/admin-spettacolo/admin-spettacolo.component';
import { AdminUtenteComponent } from './components/admin-utente/admin-utente.component';
import { AdminBloccaComponent } from './components/admin-blocca/admin-blocca.component';

const routes: Routes = [
  {path:'films', component:FilmsComponent},
  {path: 'film/:id', component: DettagliFilmComponent},
  {path: 'spettacoli', component: SpettacoliComponent},
  {path: '', component: HomepageComponent},
  {path: 'selezione-posti/:id', component: SelezionePostiComponent},
  {path: 'utente', component:UtenteComponent},
  {path: 'ordini', component:OrdiniComponent},
  {path: 'biglietti', component: BigliettiComponent},
  {path: 'checkout', component : CheckoutComponent},
  {path: 'admin', component : AdminComponent},
  {path: 'admin-attore', component: AdminAttoreComponent},
  {path: 'admin-genere', component: AdminGenereComponent},
  {path: 'admin-regista', component: AdminRegistaComponent},
  {path: 'admin-film', component: AdminFilmComponent},
  {path: 'admin-sala', component: AdminSalaComponent},
  {path: 'admin-spettacolo', component: AdminSpettacoloComponent},
  {path: 'admin-utente', component: AdminUtenteComponent},
  {path: 'admin-blocca', component: AdminBloccaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
