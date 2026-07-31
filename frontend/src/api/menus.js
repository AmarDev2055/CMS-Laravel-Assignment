import api from "./axios";

export const getMenus = (params = {}) =>
    api.get("/menus", { params });

export const getMenu = (id) =>
    api.get(`/menus/${id}`);

export const createMenu = (data) =>
    api.post("/menus", data);

export const updateMenu = (id, data) =>
    api.put(`/menus/${id}`, data);

export const deleteMenu = (id) =>
    api.delete(`/menus/${id}`);

export const reorderMenus = (data) =>
    api.post("/menus/reorder", data);

export const publicMenus = () =>
    api.get("/public/menus");