import React, { createContext, useState } from "react"
import en from "../translations/en.json"
import es from "../translations/es.json"

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")
  const translations = { en, es }

  const t = (key) => {
    const keys = key.split(".")
    return keys.reduce((acc, k) => acc?.[k], translations[language]) || key
  }

  const switchLanguage = (lang) => {
    if (translations[lang]) setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
