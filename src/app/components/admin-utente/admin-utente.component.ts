import { Component } from '@angular/core';
import { UserProfile } from '../../model/user-profile';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { UtenteService } from '../../services/utente.service';
import { OrdineService } from '../../services/ordine.service';
import { BigliettoService } from '../../services/biglietto.service';
import { BigliettoDto } from '../../model/bigliettoDto';
import { OrdineDto } from '../../model/ordineDto';
import { SearchData, SearchType } from '../../utils/searchType';
import { SearchTypeUtils } from '../../utils/searchTypeUtils';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-admin-utente',
  templateUrl: './admin-utente.component.html',
  styleUrl: './admin-utente.component.css'
})
export class AdminUtenteComponent {
  SearchType = SearchType
  // Search data for different types
  searchData: Partial<Record<SearchType, SearchData>> = {
    [SearchType.Ordine]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.Biglietto]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
    [SearchType.Utente]: {
      termine: '',
      paginaCorrente: 0,
      totalePagine: 0,
      pageSize: 4,
      risultati: [],
    },
  };
  constructor(private utenteService: UtenteService, private bigliettoService: BigliettoService, private ordineService: OrdineService, private messageService : MessagesService) {
    this.searchTypeUtils = new SearchTypeUtils(this.searchData, undefined, undefined, undefined, undefined, undefined, undefined, utenteService, bigliettoService, ordineService, messageService)
  }


  biglietti: BigliettoDto[] = [];
  ordini: OrdineDto[] = [];
  
  searchTypeUtils: SearchTypeUtils;
  ngOnInit(): void {
    this.searchTypeUtils.loader(SearchType.Utente)
  }

  utenti: UserProfile[] = [];
  utenteSelezionato: UserProfile | null = null;



  


  

  selezionaUtente(utente: UserProfile) {
    this.utenteSelezionato = utente;
    this.searchTypeUtils.loader(SearchType.Ordine, utente.id)
    this.searchTypeUtils.loader(SearchType.Biglietto, utente.id)
  }



  





}
