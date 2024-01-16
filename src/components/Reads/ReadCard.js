import React from 'react'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import {
  Typography, Box,
} from '@material-ui/core'

import { useLanguage } from '../../hooks/useLang'

import { readCard } from './styles'

const Tcard = ({ cardInfo, custom }) => {
  const classes = readCard()
  const history = useHistory()
  const language = useLanguage()

  const name = language.language === 'ar' ? cardInfo.nameAr : cardInfo.name
  const description = language.language === 'ar' ? cardInfo.descriptionAr : cardInfo.description

  const startReadHandler = () => {
    if (custom) {
      history.push(`/customRead/${cardInfo.ref}/`)
    } else {
      history.push(`/reads/${cardInfo.ref}/`)
    }
  }

  const cardsList = () => {
    let list = []
    for (let i = 0; i < cardInfo.cards.length; i += 1) {
      list = [...list, (
        <div key={i}>
          <img src="/assets/images/card.svg" alt="Tarot Readings" />
        </div>
      )]
    }

    return list
  }

  return (
    <Box className={classes.readCardWrapper}>
      <Box className={classes.readCardContainer} onClick={startReadHandler}>
        {cardsList()}
        <Typography className={`${classes.capitalize} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} color="secondary" variant="h6" component="h6">{name}</Typography>
      </Box>
      <Typography className={language.direction === 'rtl' ? classes.arabicFont : ''} align="center" variant="body2" color="primary" component="p">
        {description}
      </Typography>
    </Box>
  )
}

Tcard.defaultProps = {
  cardInfo: null,
  custom: false,
}

Tcard.propTypes = {
  cardInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  custom: PropTypes.bool,
}

export default Tcard
