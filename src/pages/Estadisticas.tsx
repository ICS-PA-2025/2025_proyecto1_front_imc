import { Link } from 'react-router-dom';
import imcService from "../services/imcService.ts";
import { useEffect, useState } from "react";
import { ResponseImcHistoryDto } from "../dto/response-imc-history.dto.ts";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Estadisticas() {
    const [historial, setHistorial] = useState<ResponseImcHistoryDto[]>([]);
    const [totalMediciones, setTotalMediciones] = useState<number>(0);
    const [promedioPeso, setPromedioPeso] = useState<number>(0);
    const [promedioImc, setPromedioImc] = useState<number>(0);
    const [variacionPeso, setVariacionPeso] = useState<number>(0);
    const [variacionImc, setVariacionImc] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchHistorial = async (filters?: { startDate?: string, endDate?: string }) => {
        setLoading(true);
        try {
            const data = await imcService.obtenerHistorialConStats(filters);
            setHistorial(data.items);
            setTotalMediciones(data.stats.total);
            setPromedioPeso(data.stats.promedioPeso);
            setPromedioImc(data.stats.promedioImc);
            setVariacionPeso(data.stats.variacionPeso);
            setVariacionImc(data.stats.variacionImc);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistorial();
    }, []);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchHistorial({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        });
    };

    const labels = historial.map(item => new Date(item.fechahora).toLocaleDateString());

    const data = {
        labels,
        datasets: [
            {
                label: 'Peso',
                data: historial.map(item => item.peso),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
            {
                label: 'IMC',
                data: historial.map(item => item.imc),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="display-5 text-primary mb-0">
                            <i className="bi bi-clock-history me-2"></i>
                            Estadisticas
                        </h1>
                        <Link to="/home" className="btn btn-primary">
                            <i className="bi bi-plus-circle me-2"></i>
                            Nuevo Cálculo
                        </Link>
                    </div>
                    <form className="mb-3" onSubmit={handleFilter}>
                        <div className="row g-2 align-items-end">
                            <div className="col-auto">
                                <label className="form-label mb-0">Fecha inicio</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="col-auto">
                                <label className="form-label mb-0">Fecha fin</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-secondary">
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    </form>
                    {loading ? (
                        <div className="text-center py-5">Cargando...</div>
                    ) : historial.length === 0 ? (
                        <div className="alert alert-info">No hay datos para graficar.</div>
                    ) : (
                        <div className="mt-4">
                            <Line data={data} />
                        </div>
                    )}
                    <div className="mt-4">
                        <ul>
                            <li>Total de mediciones: {totalMediciones}</li>
                            <li>Promedio de peso: {promedioPeso.toFixed(2)}</li>
                            <li>Promedio de IMC: {promedioImc.toFixed(2)}</li>
                            <li>Variacion de peso: {variacionPeso.toFixed(2)}</li>
                            <li>Variacion de IMC: {variacionImc.toFixed(2)}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estadisticas;