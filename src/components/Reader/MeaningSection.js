import React from 'react'
import PropTypes from 'prop-types'

import {
  Card, CardHeader, CardContent, CardMedia, Typography, Box, Button, Hidden,
} from '@material-ui/core'

import { useLanguage } from '../../hooks/useLang'

import { meaningBox } from './styles'

const MeaningSection = ({
  card, position, positionDescription, showDetails,
}) => {
  const classes = meaningBox()
  const language = useLanguage()

  const cardName = language.language === 'ar' ? card.nameAr : card.name
  const keywords = language.language === 'ar' ? card.uprightAr.replace(/,/g, ' - ') : card.upright.replace(/,/g, ' - ')
  const keywordsReversed = language.language === 'ar' ? card.reversedAr.replace(/,/g, ' - ') : card.reversed.replace(/,/g, ' - ')
  const summary = language.language === 'ar' ? card.summaryAr : card.summary
  const summaryReversed = language.language === 'ar' ? card.summaryReversedAr : card.summaryReversed

  const isFlippedClass = card.isFlipped ? classes.sectionFlipped : null
  const flippedClass = card.isReversed ? classes.cardFlipped : null

  return (
    <Card className={`${classes.root} ${isFlippedClass}`} dir={language.direction}>
      <CardHeader
        title={position}
        subheader={positionDescription}
        className={classes.cardHeader}
      />
      <Box className={classes.meaningData}>
        <div className={classes.mediaContainer}>
          <CardMedia
            className={`${classes.cover} ${flippedClass}`}
            component="img"
            src={`/assets/images/cards/${card.image}`}
            title={card.name}
          />
          <Hidden xsDown>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => showDetails(card)}
              className={language.direction === 'rtl' ? classes.arabicFont : ''}
            >
              {language.languageVars.buttons.cardFullDetails}
            </Button>
          </Hidden>
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography
              component="h5"
              variant="h5"
              style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}
              className={language.direction === 'rtl' ? classes.arabicFont : ''}
            >
              {cardName}
              {card.isReversed && (
                <span className={`${language.direction === 'rtl' ? classes.arabicFont : ''} ${classes.titleSub}`}>{`(${language.languageVars.reversed})`}</span>
              )}
            </Typography>
            <Box mt={1}>
              <Typography component="p" variant="body1" className={`${classes.keywords} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {card.isReversed ? keywordsReversed : keywords}
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography component="p" variant="body1" className={language.direction === 'rtl' ? classes.arabicFont : ''}>
                {card.isReversed ? summaryReversed : summary}
              </Typography>
            </Box>
          </CardContent>
        </div>
      </Box>
      <Hidden smUp>
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => showDetails(card)}
            className={language.direction === 'rtl' ? classes.arabicFont : ''}
          >
            {language.languageVars.buttons.cardFullDetails}
          </Button>
        </div>
      </Hidden>
    </Card>
  )
}

MeaningSection.propTypes = {
  card: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  position: PropTypes.string.isRequired,
  positionDescription: PropTypes.string.isRequired,
  showDetails: PropTypes.func.isRequired,
}

export default MeaningSection
