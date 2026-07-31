import api from "./axios"; // your existing axios instance

export const getDashboard = async () => {
    const { data } = await api.get("/dashboard");
    return data;
};