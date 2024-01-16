import React from 'react'

import parse from 'html-react-parser'

import { Box, Grid, Typography } from '@material-ui/core'

import FormatQuoteIcon from '@material-ui/icons/FormatQuote'

import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import { philosophyStyles } from './styles'

const Philosophy = () => {
  const classes = philosophyStyles()
  const language = useLanguage()

  return (
    <Box className={classes.landingContainer} dir={language.direction}>
      <Box className={classes.hero} mt={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PageTitle title={language.languageVars.titles.philosophy.title} info={language.languageVars.titles.philosophy.titleInfo} />
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.quoteSection} mt={2} mb={2}>
              <FormatQuoteIcon />
              <Typography component="p" variant="body1" className={`${classes.quoteParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.philosophy.quote}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.quoteParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                <b>{language.languageVars.data.philosophy.quoter}</b>
              </Typography>
              <FormatQuoteIcon />
            </Box>
          </Grid>
          <hr className={classes.pageSeparator} />
          <Grid item xs={12}>
            <Box mt={3} mb={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.philosophy.section1.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.philosophy.section1.paragraph)}
              </Typography>
            </Box>
            <Box mt={3} mb={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.philosophy.section2.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.philosophy.section2.paragraph)}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography component="p" variant="body1" className={`${classes.textTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {language.languageVars.data.philosophy.section3.title}
              </Typography>
              <Typography component="p" variant="body1" className={`${classes.textParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
                {parse(language.languageVars.data.philosophy.section3.paragraph)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Philosophy
