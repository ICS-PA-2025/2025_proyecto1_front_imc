import {Link} from 'react-router-dom';

function Historial() {
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

                    <div className="card shadow-sm">
                        <div className="card-body text-center py-5">
                            <div className="mb-4">
                                <i className="bi bi-clipboard-data display-1 text-muted"></i>
                            </div>
                            <h4 className="text-muted mb-3">No hay registros aún</h4>
                            <p className="text-muted mb-4">
                                Los cálculos de IMC que realices aparecerán aquí para que puedas
                                hacer un seguimiento de tu progreso a lo largo del tiempo.
                            </p>
                            <Link to="/" className="btn btn-primary btn-lg">
                                <i className="bi bi-calculator me-2"></i>
                                Realizar primer cálculo
                            </Link>
                        </div>
                    </div>

                    {/* Vista previa de cómo se vería con datos */}
                    <div className="mt-4">
                        <h5 className="text-muted">Vista previa del historial:</h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <strong>25 Sep 2024</strong>
                                        <br/>
                                        <small className="text-muted">14:30</small>
                                    </div>
                                    <div className="col-md-2">
                                        <strong>1.75m</strong>
                                        <br/>
                                        <small className="text-muted">Altura</small>
                                    </div>
                                    <div className="col-md-2">
                                        <strong>70kg</strong>
                                        <br/>
                                        <small className="text-muted">Peso</small>
                                    </div>
                                    <div className="col-md-2">
                                        <strong className="text-success">22.86</strong>
                                        <br/>
                                        <small className="text-muted">IMC</small>
                                    </div>
                                    <div className="col-md-2">
                                        <span className="badge bg-success">Normal</span>
                                    </div>
                                    <div className="col-md-1">
                                        <button className="btn btn-sm btn-outline-danger">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <small className="text-muted">* Esta es solo una vista previa de cómo se mostrará el historial
                            cuando tengas datos.</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Historial;