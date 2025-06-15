import { PostispettacoloDto } from "./postispettacoloDto";
import { PostiSpettacoloResponseDto } from "./postiSpettacoloResponseDto";

export interface PrenotazioneRequestDto {
    postiSpettacoloResponseDto : PostiSpettacoloResponseDto
    prezzo?: number
  }
  