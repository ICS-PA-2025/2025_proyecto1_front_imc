import {useAuth} from "./AuthContext";
import {Navigate} from "react-router-dom";

function PrivateRoute({children}: { children: JSX.Element }) {
    const {user} = useAuth();
    return user ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;
