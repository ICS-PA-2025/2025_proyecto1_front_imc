import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from "./pages/Home.tsx";
import Historial from './pages/Historial'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/historial" element={<Historial/>}/>
                    {/* Ruta 404 - página no encontrada */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Layout>
        </Router>
    )
}

// Componente para página no encontrada
function NotFound() {
    return (
        <div className="container text-center py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="display-1 text-muted">404</h1>
                            <h4 className="mb-3">Página no encontrada</h4>
                            <p className="text-muted mb-4">
                                La página que buscas no existe o ha sido movida.
                            </p>
                            <a href="/" className="btn btn-primary">
                                <i className="bi bi-house-door me-2"></i>
                                Volver al inicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App