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
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { UtenteHomepageComponent } from './components/utente-homepage/utente-homepage.component';
import { CercaTagComponent } from './components/cerca-tag/cerca-tag.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'film/:id', component: DettagliFilmComponent },
  { path: 'cerca', component: CercaTagComponent },
  { path: 'spettacoli', component: SpettacoliComponent },
  { path: 'selezione-posti/:id', component: SelezionePostiComponent },
  {
    path: 'utente',
    component: UtenteComponent,
    canActivate: [authGuard], // Guardia applicata a tutte le rotte figlie
    children: [
      { path: '', component: UtenteHomepageComponent }, // Rotta di default
      { path: 'ordini', component: OrdiniComponent },   // Rotta utente/ordini
      { path: 'biglietti', component: BigliettiComponent } // Rotta utente/biglietti
    ]
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  
  {
    path: 'admin',
    component: AdminComponent, // componente layout generale dell'admin (opzionale)
    canActivate: [authGuard, roleGuard], // Guardie globali per tutto il modulo admin
    data : {role : 'admin'},
    children: [
      { path: '', component: AdminHomepageComponent},
      { path: 'film', component: AdminFilmComponent },
      { path: 'regista', component: AdminRegistaComponent },
      { path: 'genere', component: AdminGenereComponent },
      { path: 'attore', component: AdminAttoreComponent },
      { path: 'sala', component: AdminSalaComponent },
      { path: 'spettacolo', component: AdminSpettacoloComponent },
      { path: 'utente', component: AdminUtenteComponent },
      { path: 'blocca', component: AdminBloccaComponent },
    ]
  },
  //{path : '**', redirectTo : '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
