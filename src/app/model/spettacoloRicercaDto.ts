import { NuovoSpettacoloDto } from "./nuovoSpettacolo";
import { PostiSpettacoloResponseDto } from "./postiSpettacolo";

export interface SpettacoloRicercaDto{
    spettacolo : NuovoSpettacoloDto,
    posti : PostiSpettacoloResponseDto
}