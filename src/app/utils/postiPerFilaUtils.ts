import { PostiResponse } from "../model/postiResponse";
import { PostispettacoloDto } from "../model/postispettacoloDto";
import { PostiPerFila } from "../model/postiSpettacoloResponseDto";

export class PostiPerFilaUtils {
    
    private postiPerFila : PostiPerFila[] = []
    constructor(){

    }

    setPostiPerFila(postiPerFila: PostiPerFila[]) {
        this.postiPerFila = postiPerFila;
    }
    getFile(): string[] {
        let res: string[] = [];
        for (let posto of this.postiPerFila) {
            res.push(posto.fila);
        }
        return res;
    }

    getPostiPerFila(fila: string): PostiResponse[] | undefined {
        const filaFound = this.postiPerFila.find(posto => posto.fila === fila);
        return filaFound?.posti;
    }
    include(fila: string, posto: PostiResponse): boolean {
        const postiInFila = this.getPostiPerFila(fila);
        return postiInFila?.some(p => p.postoSpettacoloId === posto.postoSpettacoloId) ?? false;
    }

    togglePosto(fila: string, posto: PostiResponse) {
        const filaIndex = this.postiPerFila.findIndex(p => p.fila === fila);
        
        if (filaIndex === -1) {
            this.postiPerFila.push({
                fila: fila,
                posti: [posto]
            });
            return;
        }

        const postoIndex = this.postiPerFila[filaIndex].posti.findIndex(
            p => p.postoSpettacoloId === posto.postoSpettacoloId
        );

        if (postoIndex === -1) {
            this.postiPerFila[filaIndex].posti.push(posto);
        } else {
            this.postiPerFila[filaIndex].posti.splice(postoIndex, 1);
        }
    }
    getTotalePosti(): number {
        let totale = 0;
        for (let fila of this.postiPerFila) {
            totale += fila.posti.length;
        }
        return totale;
    }
    getAllPosti(): PostiResponse[] {
        let allPosti: PostiResponse[] = [];
        for (let fila of this.postiPerFila) {
            for (let posto of fila.posti) {
                allPosti.push(posto);
            }
        }
        return allPosti;
    }
    toPostiSpettacoloDto(): PostispettacoloDto[] {
        let postiDto: PostispettacoloDto[] = [];
        for (let fila of this.postiPerFila) {
            for (let posto of fila.posti) {
                postiDto.push({
                    id: posto.postoSpettacoloId,
                    sedile: posto.postoSedile,
                    stato: posto.stato,
                    fila: fila.fila
                });
            }
        }
        return postiDto;
    }

}