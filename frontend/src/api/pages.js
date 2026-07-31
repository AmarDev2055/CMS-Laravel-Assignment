import api from "./axios";

export const getPages = (params = {}) =>
    api.get("/pages", { params });

export const getPage = (id) =>
    api.get(`/pages/${id}`);

export const createPage = (data) =>
    api.post("/pages", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const updatePage = (id, data) =>
    api.post(`/pages/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deletePage = (id) =>
    api.delete(`/pages/${id}`);

export const getTrashPages = (params = {}) =>
    api.get("/pages/trash", { params });

export const restorePage = (id) =>
    api.post(`/pages/${id}/restore`);

export const forceDeletePage = (id) =>
    api.delete(`/pages/${id}/force`);