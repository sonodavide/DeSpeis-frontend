import { BigliettoDto } from "../model/bigliettoDto";
import { SpettacoloDto } from "../model/spettacolo";
import { SpettacoloSenzaFilmTagsDto } from "../model/spettacoloSenzaFilmTags";

export class FormatterUtils {
    static bigliettoToString(biglietto : BigliettoDto) : string{
        return `${biglietto.id} - [${biglietto.postospettacoloSedile} - ${biglietto.postospettacoloFila }] - ${biglietto.postospettacoloSpettacoloData} - ${biglietto.postospettacoloSpettacoloFilmTitolo} - €${biglietto.prezzo}`
    }
    static formatTime(time: string): string {
        return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
    }
    static mapKeysToArrayReversed(map : Map<any, any>) : any[] {
        return Array.from(map.keys()).reverse()
    }
    static spettacoloSenzaFilmTagsFromSpettacolo(spettacolo : SpettacoloDto) : SpettacoloSenzaFilmTagsDto {
        if(!spettacolo.id) spettacolo.id=-1
        return {
            id: spettacolo.id!,
            data : spettacolo.data,
            dataFine : spettacolo.dataFine,
            ora : spettacolo.ora,
            oraFine : spettacolo.oraFine,
            prezzo : spettacolo.prezzo,
            salaId : spettacolo.salaId,
            filmId : spettacolo.film.id!,
            filmTitolo : spettacolo.film.titolo
        }
    }
}