import { ResponseImcHistoryDto } from "./response-imc-history.dto";

export interface ImcStats {
    total: number;
    promedioPeso: number;
    promedioImc: number;
    variacionPeso: number;
    variacionImc: number;
}

export interface ImcListWithStats {
    items: ResponseImcHistoryDto[];
    stats: ImcStats;
}