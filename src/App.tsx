import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from "./pages/Home.tsx";
import Historial from './pages/Historial'
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }/>
                    <Route path="/historial" element={
                        <PrivateRoute>
                            <Historial/>
                        </PrivateRoute>
                    }/>
                    <Route path="*" element={<Login/>}/>
                </Routes>
            </Layout>
        </Router>
    )
}

export default App