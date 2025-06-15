import { BigliettoDto } from "../model/bigliettoDto";

export class UtilsFormatter {
    static bigliettoToString(biglietto : BigliettoDto) : string{
        return `${biglietto.id} - ${biglietto.postospettacoloPosto} - ${biglietto.postospettacoloSpettacoloData} - ${biglietto.postospettacoloSpettacoloFilmTitolo} - ${biglietto.prezzo}`
    }
    static formatTime(time: string): string {
        return time.substring(0, 5); // Mostra solo ore e minuti (HH:mm)
      }
}