"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { dictionary, type Language } from "../locales/dictionary";

type DictionaryType = typeof dictionary.id;

// Helper to get nested properties safely
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj) || path;
}

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("id");

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && ["id", "en", "jp"].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        const dict = dictionary[language];
        return getNestedValue(dict, key);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
