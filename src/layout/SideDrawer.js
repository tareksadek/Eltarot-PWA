import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  IconButton, Drawer, List, ListItem, ListItemText, Box, Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'

import { useLanguage } from '../hooks/useLang'

import * as vars from '../utilities/appVars'

import { sideDrawerStyles } from './styles'

const SideDrawer = ({
  toggleDrawer, anchor, drawerState, logo,
}) => {
  const classes = sideDrawerStyles()
  const language = useLanguage()

  const listLinks = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      dir={language.direction}
    >
      <List>
        {vars.footerLinks.map(({ linkfor, path }) => (
          <Link
            to={path}
            key={linkfor}
            className={classes.linkText}
          >
            <ListItem button>
              <ListItemIcon>
                {language.direction === 'rtl' ? <ArrowLeft style={{ color: '#f3f0ea' }} /> : <ArrowRight style={{ color: '#f3f0ea' }} />}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  classes: {
                    body1: language.direction === 'rtl' ? classes.arabicFont : '',
                  },
                }}
                primary={language.languageVars.footerLinks[linkfor]}
                className={`${language.direction === 'rtl' ? classes.linkTextRight : ''} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Box className={classes.mobileFooter}>
        <Typography variant="body1" component="p" align="center" className={classes.title} style={{ color: '#f3f0ea' }}>El Tarot &copy;2020</Typography>
      </Box>
    </div>
  )

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={anchor} open={drawerState} onClose={toggleDrawer(anchor, false)}>
        <Link to="/" style={{ textDecoration: 'none' }} className={language.direction === 'rtl' ? classes.linkTextRight : ''}>
          <Box
            className={classes.logoContainer}
            style={
              {
                margin: language.direction === 'rtl' ? '0 0 0 16px' : '0 16px 0 0',
                flexDirection: language.direction === 'rtl' ? 'row-reverse' : 'row',
              }
            }
          >
            <img src={`/assets/images/${logo}`} alt={language.languageVars.appName} className={classes.logo} />
            <Typography style={{ fontFamily: language.languageVars.fonts.cardTitle.family }} component="h5" variant="h5" className={classes.appName}>
              {language.languageVars.appName}
            </Typography>
          </Box>
        </Link>
        {listLinks()}
      </Drawer>
    </>
  )
}

SideDrawer.defaultProps = {
  anchor: 'left',
  drawerState: false,
  logo: null,
}

SideDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  anchor: PropTypes.string,
  drawerState: PropTypes.bool,
  logo: PropTypes.string,
}

export default SideDrawer
