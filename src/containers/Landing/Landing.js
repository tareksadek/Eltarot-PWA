import React from 'react'

import { useHistory } from 'react-router-dom'

import parse from 'html-react-parser'

import {
  Box, Grid, Typography, Divider,
} from '@material-ui/core'

import { useLanguage } from '../../hooks/useLang'

import { landingStyles } from './styles'

const Landing = () => {
  const classes = landingStyles()
  const language = useLanguage()
  const history = useHistory()

  const normalReadHndler = () => {
    history.push('/reads')
  }

  const customReadHndler = () => {
    history.push('/customRead')
  }

  return (
    <Box className={classes.landingContainer}>
      <Box className={classes.hero} mt={6} dir={language.direction}>
        <Grid container spacing={3}>
          <Grid item md={language.direction === 'rtl' ? 6 : 7}>
            <Typography style={{ fontFamily: language.languageVars.fonts.cardTitle.family }} component="h3" variant="h3" className={classes.heroTitle}>
              {parse(language.languageVars.titles.landing.hero)}
            </Typography>
          </Grid>
          <Grid item md={language.direction === 'rtl' ? 6 : 5}>
            <Typography component="p" variant="body1" className={`${classes.heroParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
              {parse(language.languageVars.data.landing.heroText)}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Box className={classes.sectionBoxesContainer} mt={8}>
              <Box className={classes.readSectionBox} onClick={() => normalReadHndler()}>
                <div>
                  <img src="/assets/images/card.svg" alt="Tarot Readings" />
                </div>
                <div>
                  <img src="/assets/images/card.svg" alt="Tarot Readings" />
                </div>
                <div>
                  <img src="/assets/images/card.svg" alt="Tarot Readings" />
                </div>
                <Typography align="center" component="p" variant="body1" className={`${classes.readSectionBoxText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                  {language.languageVars.buttons.landing.startNormalRead}
                </Typography>
              </Box>
              <Box className={classes.readSectionBoxDarker} onClick={() => customReadHndler()}>
                <div>
                  <img src="/assets/images/custom.svg" alt="Tarot Custom Readings" />
                </div>
                <Typography align="center" component="p" variant="body1" className={`${classes.readSectionBoxText} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                  {language.languageVars.buttons.landing.startCustomRead}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box dir={language.direction}>
        <Grid container spacing={4}>
          <Grid item md={7}>
            <Typography style={{ fontFamily: language.languageVars.fonts.cardTitle.family }} component="h4" variant="h4" className={classes.heroTitle}>
              {parse(language.languageVars.titles.landing.learn)}
            </Typography>
            <br />
            <Typography component="p" variant="body1" className={`${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
              {parse(language.languageVars.data.landing.learnText)}
            </Typography>
          </Grid>
          <Grid item md={5}>
            <img src="/assets/images/custom.gif" alt="Custom Reading" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Landing
