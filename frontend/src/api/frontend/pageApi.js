import api from "../../services/api";

export function getPages() {
    return api.get("/public/pages");
}

export function getPage(slug) {
    return api.get(`/public/pages/${slug}`);
}