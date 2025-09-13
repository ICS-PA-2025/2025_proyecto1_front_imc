import {useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await login(email, password);
            if (success) {
                navigate("/home");
            } else {
                alert("Credenciales inválidas");
            }
        } catch (error) {
            alert("Error en el inicio de sesión");
        }
    };

    return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control mb-2"
                    />
                    <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control mb-2"
                    />
                    <button className="btn btn-primary w-100" type="submit">
                        Ingresar
                    </button>
                </form>

                <p className="mt-3">
                    ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </p>
            </div>
    );
}

export default Login;
