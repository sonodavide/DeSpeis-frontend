import { BigliettoDto } from "../model/bigliettoDto";

export class FormatterUtils {
    static bigliettoToString(biglietto : BigliettoDto) : string{
        return `${biglietto.id} - [${biglietto.postospettacoloSedile} - ${biglietto.postospettacoloFila }] - ${biglietto.postospettacoloSpettacoloData} - ${biglietto.postospettacoloSpettacoloFilmTitolo} - ${biglietto.prezzo}`
    }
    static formatTime(time: string): string {
        return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
    }
    static mapKeysToArrayReversed(map : Map<any, any>) : any[] {
        return Array.from(map.keys()).reverse()
    }
}