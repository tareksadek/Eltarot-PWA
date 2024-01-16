import React, { useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import {
  BottomNavigation, BottomNavigationAction, Hidden,
} from '@material-ui/core'

import { navIcons } from '../utilities/utils'

import { useLanguage } from '../hooks/useLang'

import * as vars from '../utilities/appVars'

import { mobileNavigationStyles } from './styles'

const MobileNavigation = () => {
  const classes = mobileNavigationStyles()
  const language = useLanguage()
  const history = useHistory()
  const location = useLocation()
  const { navLinks } = vars
  const [value, setValue] = useState(navLinks.findIndex(link => location.pathname.includes(link.path)))

  const navigationChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Hidden mdUp>
      <BottomNavigation
        value={value}
        onChange={navigationChange}
        showLabels
        className={classes.root}
        dir={language.direction}
      >
        {navLinks.map(({ linkfor, path }) => (
          <BottomNavigationAction
            key={path}
            label={language.languageVars.navLinks[linkfor]}
            icon={navIcons(linkfor, 'inherit', 'small', classes.avatarImage)}
            onClick={() => { history.push(path) }}
            classes={{
              selected: classes.selected,
            }}
            className={language.direction === 'rtl' ? classes.arabicFont : ''}
          />
        ))}
      </BottomNavigation>
    </Hidden>
  )
}

export default MobileNavigation
