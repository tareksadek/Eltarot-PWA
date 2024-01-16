import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import {
  Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Menu, MenuItem, Hidden,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { customIcons } from '../../utilities/utils'

import { useAuth } from '../../hooks/use-auth'
import { cardsContext } from '../../context/customRead/cardsContext'
import { useLanguage } from '../../hooks/useLang'

import { cardStyles } from './styles'

const Tcard = ({
  cardInfo, showDetails,
}) => {
  const classes = cardStyles()
  const auth = useAuth()
  const language = useLanguage()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const useCardContext = useContext(cardsContext)

  const cardName = language.language === 'ar' ? cardInfo.nameAr : cardInfo.name
  const cardSummary = language.language === 'ar' ? cardInfo.fullMeaningAr : cardInfo.fullMeaning
  const avatarContainerClass = language.language === 'ar' ? classes.avatarContainerAr : classes.avatarContainer

  const handleClick = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const editCardHandler = () => {
    setAnchorEl(null)
    history.push(`/cards/${cardInfo.id}/edit`)
  }

  const isSelected = useCardContext && useCardContext.isSelected(cardInfo.name)

  const addCardToCustomRead = () => {
    if (useCardContext && !isSelected) {
      useCardContext.addCard(cardInfo)
    }
  }

  const clickCardHandler = () => {
    if (useCardContext) {
      addCardToCustomRead()
    } else {
      showDetails(cardInfo)
    }
  }

  const isAdmin = auth.adminStatus || auth.superAdminStatus
  const cardTypeIcon = cardInfo.type ? cardInfo.type : 'major'
  const hoverText = useCardContext ? `${cardInfo.name} ${language.languageVars.data.cardHoverText.text1}` : `${cardInfo.name} ${language.languageVars.data.cardHoverText.text2}`

  return (
    <Card
      className={`${classes.root} ${isSelected && classes.disabledCard}`}
      square
      elevation={0}
      onClick={() => clickCardHandler()}
      dir={language.direction}
    >
      <CardHeader
        avatar={(
          <Avatar aria-label="card" className={`${classes.avatar} ${isSelected && classes.disabledCardAvatar}`}>
            {customIcons(cardTypeIcon, 'primary', 'small', classes.avatarImage)}
          </Avatar>
        )}
        action={!useCardContext && isAdmin && <Hidden smDown><IconButton aria-label="settings" aria-haspopup="true" color="secondary" onClick={handleClick}><MoreVertIcon /></IconButton></Hidden>}
        title={<Typography className={classes.title} style={{ fontFamily: language.languageVars.fonts.cardTitle.family }} color="textSecondary" noWrap component="h4">{cardName}</Typography>}
        classes={{
          root: classes.headerRoot,
          avatar: avatarContainerClass,
        }}
      />

      <CardMedia
        className={`${classes.media} ${isSelected && classes.disabledCardImage}`}
        component="img"
        src={`/assets/images/cards/${cardInfo.image}`}
        title={hoverText}
      />

      {!useCardContext && (
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" noWrap component="p" className={language.direction === 'rtl' ? classes.arabicFont : ''}>
            {cardSummary}
          </Typography>
        </CardContent>
      )}

      {!useCardContext && isAdmin
        && (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ paper: classes.cardMenu }}
          >
            <MenuItem onClick={editCardHandler} className={classes.cardMenuButton}>Edit</MenuItem>
          </Menu>
        )}
    </Card>
  )
}

Tcard.defaultProps = {
  cardInfo: null,
}

Tcard.propTypes = {
  cardInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  showDetails: PropTypes.func.isRequired,
}

export default Tcard
