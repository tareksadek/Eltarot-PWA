import React from 'react'

import parse from 'html-react-parser'

import { Box, Grid, Typography } from '@material-ui/core'

import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import { philosophyStyles } from './styles'

const Learn = () => {
  const classes = philosophyStyles()
  const language = useLanguage()

  return (
    <Box className={classes.landingContainer} dir={language.direction}>
      <Box className={classes.hero} mt={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PageTitle
              title={language.languageVars.titles.learn.title}
              info={parse(language.languageVars.titles.learn.titleInfo)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.imageSection} mt={2} mb={2}>
              <img src="/assets/images/drawing.svg" alt="Tarot" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <hr className={classes.pageSeparator} />
          </Grid>
          <Grid item xs={12}>
            <Box mt={3} mb={3}>
              <Typography component="h4" variant="h4" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.learn.section1.title}
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.learn.section1.paragraph)}
              </Typography>
            </Box>
            <Box mt={10} mb={3}>
              <Typography component="h4" variant="h4" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.learn.section2.title}
              </Typography>
              <br />
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.learn.section2.paragraph)}
              </Typography>
            </Box>
            <Box mt={10} mb={3}>
              <Typography component="h4" variant="h4" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.learn.section3.title}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.learn.section3.subTitle1}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.learn.section3.paragraph1)}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.learn.section3.subTitle2}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.learn.section3.paragraph2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Learn
