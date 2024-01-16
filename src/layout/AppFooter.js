import React from 'react'
import { Link } from 'react-router-dom'

import {
  Box, Typography, List, ListItem, ListItemText,
} from '@material-ui/core'

import { useLanguage } from '../hooks/useLang'

import * as vars from '../utilities/appVars'

import { footerStyles } from './styles'

const AppFooter = () => {
  const classes = footerStyles()
  const language = useLanguage()

  return (
    <Box className={classes.container}>
      <Typography variant="body1" component="p" align="center" className={classes.title}>El Tarot &copy;2020</Typography>
      <List component="nav" aria-labelledby="footer navigation" className={classes.linkList} dir={language.direction}>
        {vars.footerLinks.map(({ linkfor, path }) => (
          <Link to={path} key={linkfor} className={classes.linkText}>
            <ListItem button>
              <ListItemText
                primaryTypographyProps={{
                  classes: {
                    body1: language.direction === 'rtl' ? classes.arabicFont : '',
                  },
                }}
                className={language.direction === 'rtl' ? classes.arabicFont : ''}
                primary={language.languageVars.footerLinks[linkfor]}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}

export default AppFooter
