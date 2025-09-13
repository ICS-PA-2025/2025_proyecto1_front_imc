import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../../auth/AuthContext';

function Header() {
    const location = useLocation();
    const {user, logout} = useAuth();

    // Función para determinar si una ruta está activa
    const isActive = (path: string) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="bi bi-calculator me-2"></i>
                    IMC Calculator
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={isActive('/home')} to="/home">
                                <i className="bi bi-house-door me-1"></i>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={isActive('/historial')} to="/historial">
                                <i className="bi bi-clock-history me-1"></i>
                                Historial
                            </Link>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text text-white me-3">
                                        <i className="bi bi-person-circle me-1"></i>
                                        {user.email}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light btn-sm"
                                        onClick={logout}
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;