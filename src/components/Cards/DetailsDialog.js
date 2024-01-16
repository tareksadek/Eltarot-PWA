import React from 'react'
import PropTypes from 'prop-types'

import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Box, Grid,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { useLanguage } from '../../hooks/useLang'

import { detailsDialog } from './styles'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const DetailsDialog = ({
  closeDialog, dialogOpen, cardInfo,
}) => {
  const classes = detailsDialog()
  const language = useLanguage()
  let cardName = null
  let uprightKeywords = null
  let reversedKeywords = null
  let fullMeaning = null
  let summary = null
  let summaryReversed = null

  if (cardInfo) {
    cardName = language.language === 'ar' ? cardInfo.nameAr : cardInfo.name
    uprightKeywords = language.language === 'ar' ? cardInfo.uprightAr : cardInfo.upright
    reversedKeywords = language.language === 'ar' ? cardInfo.reversedAr : cardInfo.reversed
    fullMeaning = language.language === 'ar' ? cardInfo.fullMeaningAr : cardInfo.fullMeaning
    summary = language.language === 'ar' ? cardInfo.summaryAr : cardInfo.summary
    summaryReversed = language.language === 'ar' ? cardInfo.summaryReversedAr : cardInfo.summaryReversed
  }

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={Transition}
      classes={{
        paperFullScreen: classes.paperFullScreen,
      }}
      dir={language.direction}
    >
      <AppBar className={classes.dialogHeader}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography
            className={`${classes.dialogTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
            align="center"
            variant="h4"
            style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}
          >
            {cardInfo && cardName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.dialogContent} dir={language.direction}>
        {!cardInfo ? (
          <LoadingBackdrop loadingText={language.languageVars.loadingMessages.loadingCardDetails} />
        ) : (
          <>
            <Grid container spacing={4}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Box mt={6} align="center">
                  <img src={`/assets/images/cards/${cardInfo.image}`} alt={cardInfo.name} className={classes.dialogImage} />
                </Box>
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box mt={6} className={classes.cardContentContainer}>
                  <Grid container spacing={0} className={classes.keywordsContainer}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Box className={classes.keywordsBox}>
                        <Typography
                          component="h4"
                          variant="body1"
                          className={`${classes.keywordsTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
                        >
                          <b>{language.languageVars.data.cardDetails.uprightKeywords}</b>
                        </Typography>
                        <Typography component="p" variant="body1" className={language.direction === 'rtl' ? classes.arabicFont : ''}>{uprightKeywords}</Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Box className={classes.keywordsBox}>
                        <Typography
                          component="h4"
                          variant="body1"
                          className={`${classes.keywordsTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
                        >
                          <b>{language.languageVars.data.cardDetails.reversedKeywords}</b>
                        </Typography>
                        <Typography component="p" variant="body1" className={language.direction === 'rtl' ? classes.arabicFont : ''}>{reversedKeywords}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={6}>
                  <Typography
                    component="h4"
                    variant="h4"
                    style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}
                    className={language.direction === 'rtl' ? classes.arabicFont : ''}
                  >
                    {language.languageVars.data.cardDetails.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography
                      component="p"
                      variant="body1"
                      className={`${classes.multiLine} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
                    >
                      {fullMeaning}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={6}>
                  <Typography component="h4" variant="h4" style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}>
                    {language.languageVars.data.cardDetails.uprightMeaning}
                  </Typography>
                  <Box mt={2}>
                    <Typography component="p" variant="body1" className={language.direction === 'rtl' ? classes.arabicFont : ''}>{summary}</Typography>
                  </Box>
                </Box>
                <Box mt={6}>
                  <Typography component="h4" variant="h4" style={{ fontFamily: language.languageVars.fonts.cardTitle.family }}>
                    {language.languageVars.data.cardDetails.reversedMeaning}
                  </Typography>
                  <Box mt={2}>
                    <Typography component="p" variant="body1" className={language.direction === 'rtl' ? classes.arabicFont : ''}>{summaryReversed}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Dialog>
  )
}

DetailsDialog.defaultProps = {
  dialogOpen: false,
  cardInfo: null,
}

DetailsDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  cardInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default DetailsDialog
