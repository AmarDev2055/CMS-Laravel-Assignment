import api from "./axios";

export const getPrivileges = (params = {}) =>
    api.get("/privileges", { params });

export const getPrivilege = (id) =>
    api.get(`/privileges/${id}`);

export const createPrivilege = (data) =>
    api.post("/privileges", data);

export const updatePrivilege = (id, data) =>
    api.put(`/privileges/${id}`, data);

export const deletePrivilege = (id) =>
    api.delete(`/privileges/${id}`);