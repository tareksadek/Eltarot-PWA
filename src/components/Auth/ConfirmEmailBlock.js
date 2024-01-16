import React from 'react'
import parse from 'html-react-parser'

import {
  Box, Typography, Button,
} from '@material-ui/core'

import SecurityIcon from '@material-ui/icons/Security'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { messageStyles } from './styles'

const ConfirmEmailBlock = () => {
  const classes = messageStyles()
  const auth = useAuth()
  const language = useLanguage()

  return (
    <Box className={classes.container}>
      <SecurityIcon />
      <br />
      <Typography
        align="center"
        component="p"
      >
        {parse(language.languageVars.messages.emailNotVerified)}
      </Typography>
      <br />
      <Button variant="contained" color="primary" onClick={() => auth.resendVerificationEmail()}>{language.languageVars.buttons.resendVerificationEmail}</Button>
    </Box>
  )
}

export default ConfirmEmailBlock
