import api from "./axios";

export const login = (credentials) => {
    return api.post("/login", credentials);
};

export const logout = () => {
    return api.post("/logout");
};

export const currentUser = () => {
    return api.get("/user");
};