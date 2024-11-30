// LanguageContext.js
import React, { createContext, useState, useContext } from "react";

export const LanguageContext = createContext();

const translations = {
  en: { home: "Home", about: "About", contact: "Contact", login: "Login", signup: "Sign Up", logout: "Logout" },
  fr: { home: "Accueil", about: "À propos", contact: "Contact", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion" },
  es: { home: "Inicio", about: "Acerca de", contact: "Contacto", login: "Iniciar sesión", signup: "Registrarse", logout: "Cerrar sesión" },
  hi: { home: "मुख्य पृष्ठ", about: "हमारे बारे में", contact: "संपर्क करें", login: "लॉगिन", signup: "साइन अप करें", logout: "लॉगआउट" },
};


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translate = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);
