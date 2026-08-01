import api from "../../services/api";
export function getMenus() {
    return api.get("/public/menus");
}