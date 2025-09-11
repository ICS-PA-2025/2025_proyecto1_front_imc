import {Link} from 'react-router-dom';
import imcService from "../services/imcService.ts";
import {useEffect, useState} from "react";
import {ResponseImcHistoryDto} from "../dto/response-imc-history.dto.ts";

function Historial() {
    const [historial, setHistorial] = useState<ResponseImcHistoryDto[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchHistorial = async (filters?: { startDate?: string, endDate?: string }) => {
        setLoading(true);
        try {
            const data = await imcService.obtenerHistorial(filters);
            setHistorial(data);
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="display-5 text-primary mb-0">
                            <i className="bi bi-clock-history me-2"></i>
                            Historial de Cálculos
                        </h1>
                        <Link to="/" className="btn btn-primary">
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
                    <div className="mt-4">
                        <table className="table table-striped mt-3">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Peso</th>
                                <th>Altura</th>
                                <th>IMC</th>
                                <th>Categoría</th>
                                <th>Fecha y Hora</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center">Cargando...</td>
                                </tr>
                            ) : historial.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center">No hay registros</td>
                                </tr>
                            ) : (
                                historial.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.peso}</td>
                                        <td>{item.altura}</td>
                                        <td>{item.imc}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.fechahora.toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Historial;