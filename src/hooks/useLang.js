import React, {
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react'

import PropTypes from 'prop-types'

import * as languages from '../languages'

const languageContext = createContext()

export const useLanguage = () => useContext(languageContext)

const useProvideLanguage = () => {
  const [language, setLanguage] = useState('en')
  const [direction, setDirection] = useState('ltr')
  const [languageVars, setLanguageVars] = useState(languages[language])

  const toggleLanguage = lang => {
    window.localStorage.setItem('language', lang)
    window.localStorage.setItem('direction', direction)
    setLanguage(lang)
    setDirection(lang === 'ar' ? 'rtl' : 'ltr')
    setLanguageVars(languages[lang])
  };

  useEffect(() => {
    const localLaguage = window.localStorage.getItem('language')
    if (localLaguage) {
      setLanguage(localLaguage)
      setDirection(localLaguage === 'ar' ? 'rtl' : 'ltr')
      setLanguageVars(languages[localLaguage])
    }
  }, []);

  return {
    language,
    direction,
    toggleLanguage,
    languageVars,
  }
}

const ProvideLanguage = ({ children }) => {
  const language = useProvideLanguage()
  return (
    <languageContext.Provider value={language}>
      {children}
    </languageContext.Provider>
  )
}

ProvideLanguage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProvideLanguage
