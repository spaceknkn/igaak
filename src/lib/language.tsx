'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isKorean: boolean;
    isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                isKorean: language === 'ko',
                isEnglish: language === 'en',
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Language switcher component - can be added to Header later
export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 text-sm">
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 transition-colors ${language === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
            >
                ENG
            </button>
            <span className="text-white/30">|</span>
            <button
                onClick={() => setLanguage('ko')}
                className={`px-2 py-1 transition-colors ${language === 'ko' ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                disabled
                title="Coming Soon"
            >
                KOR
            </button>
        </div>
    );
}
