import React from 'react'
import PropTypes from 'prop-types'

import { Box, Typography } from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'

import { useLanguage } from '../../hooks/useLang'

import { readingCard } from './styles'

const ReadingCard = ({
  card, position, onFlip,
}) => {
  const language = useLanguage()
  const theme = useTheme()
  const classes = readingCard()
  const cardBackImage = theme.name === 'light' ? 'card-d' : 'card-l'
  const cardFlippedClass = card.isFlipped ? classes.flipped : null
  const cardReversedClass = card.isReversed ? classes.reversedCardImage : null
  const cardName = language.language === 'ar' ? card.nameAr : card.name

  const flipCardHandler = () => {
    if (!card.isFlipped) {
      onFlip(card.index)
    }
  }

  return (
    <>
      <Box
        className={`${classes.flipCard}`}
        onClick={() => flipCardHandler()}
        aria-hidden="true"
      >
        <Box className={`${classes.flipCardInner} ${cardFlippedClass}`}>
          <Box className={classes.flipCardFront}>
            <img src={`/assets/images/${cardBackImage}.png`} className={classes.flipCardImageBack} alt="Card Back" />
          </Box>
          <Box className={classes.flipCardBack}>
            <Typography
              className={`${classes.cardName} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
              style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}
              color="textSecondary"
              noWrap
              component="h3"
            >
              {cardName}
            </Typography>
            <img src={`/assets/images/cards/${card.image}`} className={`${classes.flipCardImage} ${cardReversedClass}`} alt={cardName} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          className={`${classes.cardPosition} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
          color="textPrimary"
          align="center"
          noWrap
          component="p"
        >
          {position}
        </Typography>
      </Box>
    </>
  )
}

ReadingCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  position: PropTypes.string.isRequired,
  onFlip: PropTypes.func.isRequired,
}

export default ReadingCard
