import React from 'react'
import PropTypes from 'prop-types'

import {
  Box, Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { useLanguage } from '../hooks/useLang'

const pageTitleStyles = makeStyles(theme => ({
  info: {
    padding: theme.spacing(1),
    maxWidth: '800px',
    margin: '0 auto',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

const PageTitle = ({ title, info }) => {
  const classes = pageTitleStyles()
  const language = useLanguage()

  return (
    <Box mt={5} mb={5}>
      <Typography variant="h3" component="h3" align="center" style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}>{title}</Typography>
      {info && <Typography variant="body1" component="p" align="center" className={`${classes.info} ${language.direction === 'rtl' && classes.arabicFont}`}>{info}</Typography>}
    </Box>
  )
}

PageTitle.defaultProps = {
  title: null,
  info: null,
}

PageTitle.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
}

export default PageTitle
