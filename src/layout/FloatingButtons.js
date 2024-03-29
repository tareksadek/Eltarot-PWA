import React from 'react'
import PropTypes from 'prop-types'

import { Fab } from '@material-ui/core'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import Brightness4Icon from '@material-ui/icons/Brightness4'

import { floatingButtonsStyles } from './styles'
import { useLanguage } from '../hooks/useLang'

const FloatingButtons = ({
  theme, toggleTheme,
}) => {
  const language = useLanguage()
  const classes = floatingButtonsStyles()
  const currentLanguage = language.language === 'en' ? 'ar' : 'en'

  return (
    <div className={classes.floatingContainer}>
      <Fab size="small" color="primary" aria-label="add" className={classes.padding} onClick={() => toggleTheme()}>
        {theme === 'light' ? <Brightness5Icon /> : <Brightness4Icon />}
      </Fab>
      <Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick={() => language.toggleLanguage(currentLanguage)}>
        <b>{language.languageVars.languageShort}</b>
      </Fab>
    </div>
  )
}

FloatingButtons.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default FloatingButtons
