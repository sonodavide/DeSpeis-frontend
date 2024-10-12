import { PostoResponseDto } from "./postoResponseDto";

export interface PostiSpettacoloResponseDto {
    spettacoloId: number;
    posti : { [key: string]: PostoResponseDto[] };
    
  }