import api from "./axios";

export const getTranslations = (locale = "en") => {
    return api.get(`/translations/${locale}`);
};