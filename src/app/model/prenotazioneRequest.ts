import { PostoResponseDto } from "./postoResponseDto";

export interface PrenotazioneRequestDto {
    postiIds: PostoResponseDto[];
    spettacoloId: number;
    prezzo?: number
  }
  