import React from 'react'

import firebase from 'firebase'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { Box } from '@material-ui/core'

import PageTitle from '../../layout/PageTitle'

import ConfirmEmailRequest from '../../components/Auth/ConfirmEmailRequest'
import ConfirmEmailBlock from '../../components/Auth/ConfirmEmailBlock'

import { useLanguage } from '../../hooks/useLang'

import { useAuth } from '../../hooks/use-auth'

const Signup = () => {
  const auth = useAuth()
  const language = useLanguage()
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/cardssss',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  if (auth.user && !auth.emailVerified && !auth.verifyEmailSent) {
    return <ConfirmEmailRequest />
  }

  if (auth.user && !auth.emailVerified && auth.verifyEmailSent) {
    return <ConfirmEmailBlock />
  }

  return (
    <Box>
      <PageTitle title={language.languageVars.titles.auth.title} info={language.languageVars.titles.auth.titleInfo} />
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </Box>
  )
}

export default Signup
