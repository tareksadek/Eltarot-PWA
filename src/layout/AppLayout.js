import React from 'react'
import PropTypes from 'prop-types'

import CookieConsent from 'react-cookie-consent';

import Container from '@material-ui/core/Container'

import { loStyles } from './styles'

import AppNav from './AppNav'
import AppFooter from './AppFooter'
import FloatingButtons from './FloatingButtons'
import MobileNavigation from './MobileNavigation'

const AppLayout = ({ children, toggleTheme, theme }) => {
  const classes = loStyles()

  return (
    <>
      <AppNav toggleTheme={toggleTheme} theme={theme} />
      <Container maxWidth={false} className={classes.appContainer}>
        {children}
        <FloatingButtons toggleTheme={toggleTheme} theme={theme} />
      </Container>
      <AppFooter />
      <MobileNavigation />
      <CookieConsent
        location="bottom"
        buttonText="Close"
        cookieName="disclaimerCookie"
        style={{ background: '#000' }}
        buttonStyle={{ backgroundColor: '#fff', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}

export default AppLayout
