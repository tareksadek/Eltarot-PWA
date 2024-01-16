import React from 'react'
import parse from 'html-react-parser'

import {
  Box, Typography,
} from '@material-ui/core'

import SecurityIcon from '@material-ui/icons/Security'

import { useLanguage } from '../../hooks/useLang'

import { messageStyles } from './styles'

const ConfirmEmailRequest = () => {
  const classes = messageStyles()
  const language = useLanguage()

  return (
    <Box className={classes.container}>
      <SecurityIcon />
      <br />
      <Typography
        align="center"
        component="p"
      >
        {parse(language.languageVars.messages.verifyEmail)}
      </Typography>
    </Box>
  )
}

export default ConfirmEmailRequest
