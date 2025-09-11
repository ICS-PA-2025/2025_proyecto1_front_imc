import axios, {AxiosResponse} from 'axios';
import {BACKEND_URL} from '../config/config';
import {ApiError} from "../dto/api-error.ts";
import {CalcularImcDto} from "../dto/calcular-imc.dto.ts";
import {ResponseImcDto} from "../dto/response-imc.dto.ts";
import {ImcHistoryFilters} from "../dto/imd-history-filters.dto.ts";
import {ResponseImcHistoryDto} from "../dto/response-imc-history.dto.ts";


// Configuración base de axios para el servicio IMC
const imcApi = axios.create({
    baseURL: `${BACKEND_URL}/imc`,
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejo de errores global
imcApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error en la API:', error);
        return Promise.reject(error);
    }
);

class ImcService {
    /**
     * Calcula el IMC enviando datos al backend
     */
    async calcularImc(data: CalcularImcDto): Promise<ResponseImcDto> {
        try {
            const response: AxiosResponse<ResponseImcDto> = await imcApi.post('/calcular', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Error de respuesta del servidor
                if (error.response?.data) {
                    const apiError: ApiError = error.response.data;
                    throw new Error(apiError.message || 'Error al calcular el IMC');
                }
                // Error de conexión
                if (error.code === 'ECONNREFUSED') {
                    throw new Error('No se puede conectar con el servidor. Verifica que el backend esté corriendo.');
                }
                // Error de timeout
                if (error.code === 'ECONNABORTED') {
                    throw new Error('La petición tardó demasiado. Intenta nuevamente.');
                }
            }
            throw new Error('Error inesperado al calcular el IMC');
        }
    }

    /**
     * Obtiene el historial de cálculos IMC
     */
    async obtenerHistorial(filters?: ImcHistoryFilters): Promise<ResponseImcHistoryDto[]> {
        try {
            const params = new URLSearchParams();

            if (filters?.startDate) {
                params.append('startDate', filters.startDate);
            }

            if (filters?.endDate) {
                params.append('endDate', filters.endDate);
            }

            const response: AxiosResponse<ResponseImcHistoryDto[]> = await imcApi.get('/', {
                params: Object.fromEntries(params)
            });

            // Convertir strings de fecha a objetos Date
            return response.data.map(item => ({
                ...item,
                fechahora: new Date(item.fechahora)
            }));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data) {
                    const apiError: ApiError = error.response.data;
                    throw new Error(apiError.message || 'Error al obtener el historial');
                }
                if (error.code === 'ECONNREFUSED') {
                    throw new Error('No se puede conectar con el servidor. Verifica que el backend esté corriendo.');
                }
            }
            throw new Error('Error inesperado al obtener el historial');
        }
    }
}

// Exportar una instancia única del servicio (Singleton)
export const imcService = new ImcService();
export default imcService;