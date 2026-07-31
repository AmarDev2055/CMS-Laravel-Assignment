import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {

    const { authenticated, loading } = useAuth();

    if (loading)
        return <div className="p-10">Loading...</div>;

    if (authenticated)
        return <Navigate to="/dashboard" replace />;

    return children;
}

export default GuestRoute;