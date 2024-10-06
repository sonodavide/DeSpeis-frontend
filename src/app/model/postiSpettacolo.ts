import { postoResponseDto } from "./postoResponseDto";

export interface PostispettacoloDto {
    spettacoloId: number;
    posti : Map<string, postoResponseDto[]>;
    
  }