import { BigliettoDto } from './bigliettoDto';

export interface OrdineDto {
  id: number;
  data: string;
  stato: string;
  totale: number;
  bigliettos: BigliettoDto[];
}
