export function hasPrivilege(privilege) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return false;

    return user.privileges?.includes(privilege);
}

export function hasAnyPrivilege(privileges) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return false;

    return privileges.some(p =>
        user.privileges?.includes(p)
    );
}