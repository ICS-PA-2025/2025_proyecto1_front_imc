import ImcForm from "../components/forms/ImcForm.tsx";

function Home() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="text-center mb-4">
                        <h1 className="display-4 text-primary mb-3">
                            <i className="bi bi-calculator me-2"></i>
                            Calculadora IMC
                        </h1>
                        <p className="lead text-muted">
                            Calcula tu Índice de Masa Corporal y conoce tu categoría de peso
                        </p>
                    </div>
                    <ImcForm/>

                    {/* Información adicional sobre IMC */}
                    <div className="mt-5">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="bi bi-info-circle me-2"></i>
                                    ¿Qué es el IMC?
                                </h5>
                                <p className="card-text text-muted">
                                    El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso y altura
                                    para determinar si tienes un peso saludable. Se calcula dividiendo el peso
                                    en kilogramos por el cuadrado de la altura en metros.
                                </p>
                                <div className="row text-center mt-3">
                                    <div className="col-6 col-md-3">
                                        <small className="d-block text-primary fw-bold">Bajo peso</small>
                                        <small className="text-muted">&lt; 18.5</small>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <small className="d-block text-success fw-bold">Normal</small>
                                        <small className="text-muted">18.5 - 24.9</small>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <small className="d-block text-warning fw-bold">Sobrepeso</small>
                                        <small className="text-muted">25 - 29.9</small>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <small className="d-block text-danger fw-bold">Obesidad</small>
                                        <small className="text-muted">&gt;= 30</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;