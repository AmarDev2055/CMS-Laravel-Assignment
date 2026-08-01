import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getTranslations } from "../api/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    const [translations, setTranslations] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTranslations(language);

    }, [language]);

    async function loadTranslations(locale) {

        try {

            const response = await getTranslations(locale);

            setTranslations(response.data);

            document.documentElement.lang = locale;

            document.documentElement.dir =
                locale === "ar"
                    ? "rtl"
                    : "ltr";

            localStorage.setItem(
                "language",
                locale
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    function changeLanguage(locale) {

        setLanguage(locale);

    }

    function t(key) {

        return translations[key] || key;

    }

    return (

        <LanguageContext.Provider
            value={{
                language,
                changeLanguage,
                t,
                loading,
            }}
        >
            {children}
        </LanguageContext.Provider>

    );

}

export const useLanguage = () =>
    useContext(LanguageContext);