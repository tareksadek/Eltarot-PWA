import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, useHistory, Link } from 'react-router-dom'

import {
  AppBar, Toolbar, IconButton, Avatar, Button, List, ListItem, ListItemText, Container, Box, Typography,
} from '@material-ui/core'

import SideDrawer from './SideDrawer'
import UserMenu from './UserMenu'

import { navStyles } from './styles'
import { useAuth } from '../hooks/use-auth'
import { useLanguage } from '../hooks/useLang'

import * as vars from '../utilities/appVars'

const AppNav = ({ theme }) => {
  const auth = useAuth()
  const language = useLanguage()
  const classes = navStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerState, setDrawerState] = React.useState({
    left: false,
    right: false,
  })

  const isMenuOpen = Boolean(anchorEl)
  const navLinks = auth.user ? vars.navLinks.filter(link => link.linkfor !== 'authintication') : vars.navLinks
  const userMenu = auth.superAdminStatus ? vars.userMenu : vars.userMenu.filter(link => link.linkfor !== 'users')
  const logoTheme = theme === 'light' ? 'dark' : 'light'
  const logoDirection = language.direction === 'rtl' ? 'ltr' : 'rtl'
  const logoImage = `icon-${logoTheme}-${logoDirection}.svg`
  const sideDrawerLogo = `icon-light-${logoDirection}.svg`

  const toggleDrawerHandler = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerState({ ...drawerState, [anchor]: open })
  }

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogin = () => {
    history.push(vars.AUTH_PAGE)
  }

  const handleUserMenu = path => {
    setAnchorEl(null)
    history.push(path)
  }

  const menuId = 'primary-search-account-menu'

  return (
    <Box className={`${classes.grow}`} dir={language.direction}>
      <AppBar
        position="static"
        color="primary"
      >
        <Toolbar>
          <Container className={classes.navbarDisplayFlex}>
            <Box className={classes.logoContainer}>
              <div className={classes.sectionMobile}>
                <SideDrawer
                  toggleDrawer={toggleDrawerHandler}
                  drawerState={language.direction === 'rtl' ? drawerState.right : drawerState.left}
                  logo={sideDrawerLogo}
                  anchor={language.direction === 'rtl' ? 'right' : 'left'}
                />
              </div>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Box className={classes.logoContainer} style={{ margin: language.direction === 'rtl' ? '0 0 0 16px' : '0 16px 0 0' }}>
                  <img src={`/assets/images/${logoImage}`} alt={language.languageVars.appName} className={classes.logo} />
                  <Typography style={{ fontFamily: language.languageVars.fonts.cardTitle.family }} component="h5" variant="h5" className={classes.appName}>
                    {language.languageVars.appName}
                  </Typography>
                </Box>
              </Link>
            </Box>
            <List component="nav" aria-labelledby="main navigation" className={`${classes.navDisplayFlex} ${classes.sectionDesktop}`}>
              {navLinks.map(({ linkfor, path }) => (
                <Link to={path} key={linkfor} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText
                      primaryTypographyProps={{
                        classes: {
                          body1: language.direction === 'rtl' ? classes.arabicFont : '',
                        },
                      }}
                      className={language.direction === 'rtl' ? classes.arabicFont : ''}
                      primary={language.languageVars.navLinks[linkfor]}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Container>
          <div className={classes.grow} />
          <div>
            {auth.user ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt={auth.user.displayName} src={auth.user.photoURL} className={classes.small} />
              </IconButton>
            ) : <Button className={language.direction === 'rtl' ? classes.arabicFont : ''} color="inherit" onClick={handleLogin}>{language.languageVars.login}</Button>}
          </div>
        </Toolbar>
      </AppBar>
      <UserMenu open={isMenuOpen} links={userMenu} anchorEl={anchorEl} onClose={handleMenuClose} onLinkClicked={handleUserMenu} menuId={menuId} />
    </Box>
  )
}

AppNav.propTypes = {
  theme: PropTypes.string.isRequired,
}

export default withRouter(AppNav)
