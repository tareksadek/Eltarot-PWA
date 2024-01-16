import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, Divider,
} from '@material-ui/core'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import LayersIcon from '@material-ui/icons/Layers'

import { customIcons } from '../../utilities/utils'

import { useLanguage } from '../../hooks/useLang'

import { filterStyles } from './styles'

import * as vars from '../../utilities/appVars'

const FilterCards = ({ onFilter, onClear }) => {
  const classes = filterStyles()
  const language = useLanguage()

  const [filterValue, setFilterValue] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const filterChangeHandler = suit => {
    setFilterValue(suit)
    onFilter(suit)
    handleClose()
  }

  const filterClearHandler = () => {
    setFilterValue('')
    onClear()
  }

  return (
    <Box mt={5} mb={5} className={classes.filterContainer}>
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        onClick={handleClick}
        className={`${classes.filterButton} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
      >
        {`${language.languageVars.data.filterBox.filter}: ${filterValue || language.languageVars.data.filterBox.all}`}
        <Divider className={classes.divider} orientation="vertical" />
        <ArrowDropDownIcon />
      </Button>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        dir={language.direction}
      >
        <MenuItem
          classes={{
            root: classes.root,
          }}
          onClick={() => filterClearHandler()}
        >
          <ListItemIcon>
            <LayersIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={language.languageVars.suits.all} className={language.direction === 'rtl' ? classes.arabicFont : ''} />
        </MenuItem>
        {vars.SUITS.map(suit => (
          <MenuItem
            classes={{
              root: classes.root,
            }}
            onClick={() => filterChangeHandler(suit.name)}
            key={suit.name}
          >
            <ListItemIcon>
              {customIcons(suit.name, 'secondary', 'small')}
            </ListItemIcon>
            <ListItemText
              primary={language.languageVars.suits[suit.name]}
              primaryTypographyProps={{
                classes: {
                  body1: language.direction === 'rtl' ? classes.arabicFont : '',
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

FilterCards.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default FilterCards
