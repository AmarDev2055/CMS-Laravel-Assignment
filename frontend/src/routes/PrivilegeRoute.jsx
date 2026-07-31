import { Navigate } from "react-router-dom";
import { hasPrivilege } from "../utils/permissions";

export default function PrivilegeRoute({
    privilege,
    children,
}) {

    if (!hasPrivilege(privilege)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}