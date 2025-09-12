import {useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

function Register() {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const success = await register(email, password);
            if (success) {
                navigate("/home");
            }
        } catch (error: any) {
            // Extract specific error message from the API response
            if (error.message) {
                setError(error.message);
            } else {
                setError("Error en el registro");
            }
        }
    };

    return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                    )}
                    <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control mb-2"
                            required
                    />
                    <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control mb-2"
                            required
                    />
                    <button className="btn btn-primary w-100" type="submit">
                        Registrarse
                    </button>
                </form>

                <p className="mt-3">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </div>
    );
}

export default Register;