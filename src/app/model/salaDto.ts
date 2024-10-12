import { PostoDto } from "./postoDto";

export interface SalaDto {
    id? : number;
    post: Set<PostoDto>
}