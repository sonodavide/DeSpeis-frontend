import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginatedResponse';
import { SearchData, SearchType } from './searchType';
import { FilmService } from '../services/film.service';
import { SalaService } from '../services/sala.service';
import { SpettacoloService } from '../services/spettacolo.service';
import { AttoreService } from '../services/attore.service';
import { RegistaService } from '../services/regista.service';
import { GenereService } from '../services/genere.service';
import { UtenteService } from '../services/utente.service';
import { BigliettoService } from '../services/biglietto.service';
import { OrdineService } from '../services/ordine.service';

export class SearchTypeUtils {
  constructor(
    private searchData: Partial<Record<SearchType, SearchData>>,
    private filmService?: FilmService,
    private salaService?: SalaService,
    private spettacoloService?: SpettacoloService,
    private attoreService?: AttoreService,
    private registaService?: RegistaService,
    private genereService?: GenereService,
    private utenteService?: UtenteService,
    private bigliettoService?: BigliettoService,
    private ordineService?: OrdineService
  ){}
  getSearchData(
    searchType: SearchType
  ): SearchData {
    return (
      this.searchData[searchType] || {
        termine: '',
        paginaCorrente: 0,
        totalePagine: 0,
        pageSize: 0,
        risultati: [],
      }
    );
  }
  loader(tipo: SearchType, userId? : string) {
    const data = this.searchData[tipo];
    if (data) {
      let serviceCall: Observable<PaginatedResponse<any>> | undefined;

      switch (tipo) {
        case SearchType.FilmCreazione:
        case SearchType.FilmModifica:
          serviceCall = this.filmService?.getAllPaginated(data.paginaCorrente, data.pageSize);
          break;
        case SearchType.SalaCreazione:
        case SearchType.SalaModifica:
          serviceCall = this.salaService?.getAllPaginated(data.paginaCorrente, data.pageSize);
          break;
        case SearchType.SpettacoloModifica:
          serviceCall = this.spettacoloService?.getAllPaginated(data.paginaCorrente, data.pageSize);
          break;
        case SearchType.AttoreModifica:
        case SearchType.AttoreCreazione:
          serviceCall = this.attoreService?.getAllPaginated(data.paginaCorrente, data.pageSize);
          break;
        case SearchType.RegistaModifica:
        case SearchType.RegistaCreazione:
          serviceCall = this.registaService?.getAllPaginated(data.paginaCorrente, data.pageSize);
          break;
        case SearchType.GenereModifica:
        case SearchType.GenereCreazione:
          serviceCall = this.genereService?.getAllPaginated(data.paginaCorrente, data.pageSize);
          break;
        case SearchType.Utente:
          serviceCall = this.utenteService?.getAllPaged(data.paginaCorrente, data.pageSize);
          break
        case SearchType.Biglietto:
          if(userId){
            serviceCall = this.bigliettoService?.getByUserId(userId, data.paginaCorrente, data.pageSize);
          }
          break
        case SearchType.Ordine:
          if(userId){
            serviceCall = this.ordineService?.getAllByUserIdPaged(userId, data.paginaCorrente, data.pageSize);
          }
          break
        // Aggiungere eventuali nuovi tipi di ricerca
        default:
          console.warn(`Service for SearchType ${tipo} is not implemented.`);
      }

      if (serviceCall) {
        serviceCall.subscribe((response: PaginatedResponse<any>) => {
          data.risultati = response.content;
          console.log(data.risultati)
          data.totalePagine = response.totalPages;
        });
      }
    }
  }

  eseguiRicerca(tipo: SearchType) {
    const data = this.searchData[tipo];
    if (data) {
      const termine = data.termine.trim();
      let serviceCall: Observable<PaginatedResponse<any>> | undefined;

      switch (tipo) {
        case SearchType.FilmCreazione:
        case SearchType.FilmModifica:
          serviceCall = this.filmService?.cerca(termine, data.paginaCorrente, data.pageSize);
          break;
        case SearchType.AttoreCreazione:
        case SearchType.AttoreModifica:
          serviceCall = this.attoreService?.cerca(termine, data.paginaCorrente, data.pageSize);
          break;
        case SearchType.RegistaCreazione:
        case SearchType.RegistaModifica:
          serviceCall = this.registaService?.cerca(termine, data.paginaCorrente, data.pageSize);
          break;
        case SearchType.GenereCreazione:
        case SearchType.GenereModifica:
          serviceCall = this.genereService?.cerca(termine, data.paginaCorrente, data.pageSize);
          break;
        case SearchType.SpettacoloModifica:
          serviceCall = this.spettacoloService?.cerca(termine, data.paginaCorrente, data.pageSize);
          break;
        // Aggiungere eventuali nuovi tipi di ricerca
        default:
          console.warn(`Search operation for SearchType ${tipo} is not implemented.`);
      }

      if (serviceCall) {
        serviceCall.subscribe((response: PaginatedResponse<any>) => {
          data.risultati = response.content;
          data.totalePagine = response.totalPages;
        });
      }
    }
  }

  paginaSuccessiva(tipo: SearchType) {
    const data = this.searchData[tipo];
    if (data) {
      if (data.paginaCorrente < data.totalePagine - 1) {
        data.paginaCorrente++;
        data.termine ? this.eseguiRicerca(tipo) : this.loader(tipo);
      }
    }
  }

  paginaPrecedente(tipo: SearchType) {
    const data = this.searchData[tipo];
    if (data) {
      if (data.paginaCorrente > 0) {
        data.paginaCorrente--;
        data.termine ? this.eseguiRicerca(tipo) : this.loader(tipo);
      }
    }
  }
  resettaRicerca(tipo: SearchType): void {
    const data = this.searchData[tipo];
    if (data) {
      data.termine = '';
      data.paginaCorrente = 0;
      this.loader(tipo);
    }
  }
}
