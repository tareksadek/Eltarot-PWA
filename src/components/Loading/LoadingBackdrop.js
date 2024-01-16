import React from 'react'
import PropTypes from 'prop-types'

import { Backdrop, Typography, CircularProgress } from '@material-ui/core'

import { useLanguage } from '../../hooks/useLang'

import { backdropStyles } from './styles'

const LoadingBackdrop = ({ loadingText }) => {
  const classes = backdropStyles()
  const language = useLanguage()

  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
      <Typography className={language.direction === 'rtl' ? classes.arabicFont : ''}>{loadingText}</Typography>
    </Backdrop>
  )
}

LoadingBackdrop.defaultProps = {
  loadingText: null,
}

LoadingBackdrop.propTypes = {
  loadingText: PropTypes.string,
}

export default LoadingBackdrop
