import React from 'react'

import parse from 'html-react-parser'

import { Box, Grid, Typography } from '@material-ui/core'

import { useLanguage } from '../../hooks/useLang'

import PageTitle from '../../layout/PageTitle'

import { philosophyStyles } from './styles'

const History = () => {
  const classes = philosophyStyles()
  const language = useLanguage()

  return (
    <Box className={classes.landingContainer} dir={language.direction}>
      <Box className={classes.hero} mt={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PageTitle title={language.languageVars.titles.history.title} info={language.languageVars.titles.history.titleInfo} />
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.imageSection} mt={2} mb={2}>
              <img src="/assets/images/hand.svg" alt="Tarot History" />
            </Box>
          </Grid>
          <hr className={classes.pageSeparator} />
          <Grid item xs={12}>
            <Box mt={3} mb={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.history.section1.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.history.section1.paragraph)}
              </Typography>
            </Box>
            <Box mt={3} mb={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.history.section2.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.history.section2.paragraph)}
              </Typography>
            </Box>
            <Box mt={3} mb={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.history.section3.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.history.section3.paragraph)}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.history.section4.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.history.section4.paragraph)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default History
