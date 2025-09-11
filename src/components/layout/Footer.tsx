import {Link} from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="mb-3">IMC Calculator</h5>
                        <p className="text-muted">
                            Herramienta para calcular tu Índice de Masa Corporal de forma rápida y sencilla.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5 className="mb-3">Enlaces útiles</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-light text-decoration-none">
                                    <i className="bi bi-calculator me-2"></i>
                                    Calculadora
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/historial" className="text-light text-decoration-none">
                                    <i className="bi bi-clock-history me-2"></i>
                                    Historial
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-4"/>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0 text-muted">
                            © {currentYear} IMC Calculator. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="col-md-6 text-end">
                        <small className="text-muted">
                            Todos los derechos reservados. Proyecto IMC 2025 Ingenieria y calidad - Programacion
                            avanzada.
                        </small>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;