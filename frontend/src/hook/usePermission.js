import { useAuth } from "../context/AuthContext";

export default function usePermission() {
    const { user } = useAuth();

    const hasPrivilege = (privilege) => {
        if (!user) return false;

        return user.privileges?.includes(privilege);
    };

    const hasAnyPrivilege = (privileges) => {
        if (!user) return false;

        return privileges.some(privilege =>
            user.privileges?.includes(privilege)
        );
    };

    const hasRole = (role) => {
        if (!user) return false;

        return user.roles?.includes(role);
    };

    return {
        user,
        hasPrivilege,
        hasAnyPrivilege,
        hasRole,
    };
}