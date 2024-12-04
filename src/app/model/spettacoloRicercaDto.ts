import { NuovoSpettacoloDto } from "./nuovoSpettacolo";
import { PostiSpettacoloResponseDto } from "./postiSpettacoloResponseDto";

export interface SpettacoloRicercaDto{
    spettacolo : NuovoSpettacoloDto,
    posti : PostiSpettacoloResponseDto
}