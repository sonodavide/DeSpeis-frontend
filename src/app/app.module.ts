import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films/films.component';

import {  HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
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
import { FooterComponent } from './components/footer/footer.component';
import { KeycloakService } from './services/keycloak.service';
import { HttpTokenInterceptor } from './interceptor/http-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { UtenteHomepageComponent } from './components/utente-homepage/utente-homepage.component';
import { CercaTagComponent } from './components/cerca-tag/cerca-tag.component';
import { MessagesComponent } from './components/messages/messages.component';

export function kcFactory(kcService:KeycloakService){
  return ()=>kcService.init()
}
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
    FooterComponent,
    AdminHomepageComponent,
    UtenteHomepageComponent,
    CercaTagComponent,
    MessagesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi:true
   },
  {
  provide:APP_INITIALIZER,
  deps: [KeycloakService],
  useFactory: kcFactory,
  multi: true
},
  provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
