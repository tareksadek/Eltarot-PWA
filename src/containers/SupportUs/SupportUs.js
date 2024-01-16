import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { Box, Typography } from '@material-ui/core'
import CardForm from '../../components/SupportUs/CardForm'
import PageTitle from '../../layout/PageTitle'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { supportStyles } from './styles'

import * as vars from '../../utilities/appVars'

const stripeLoad = loadStripe(vars.STRIPE_PIBLISHABLE_KEY)

const Support = ({ isSubscriberSessionOpen }) => {
  const classes = supportStyles()
  const auth = useAuth()
  const language = useLanguage()

  return (
    <>
      {auth.subscriberStatus || isSubscriberSessionOpen ? (
        <Box dir={language.direction}>
          <PageTitle title={language.languageVars.titles.support.subscribed.title} info={language.languageVars.titles.support.subscribed.titleInfo} />
          <Box mb={3}>
            <Typography className={`${classes.pageInfo} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} align="center" variant="body1" component="p">
              <b>
                {language.languageVars.data.support.paragraph1}
              </b>
              <br />
              <a href={`mailto:${vars.CONTACT_EMAIL}`}>{vars.CONTACT_EMAIL}</a>
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box dir={language.direction}>
          <PageTitle title={language.languageVars.titles.support.notSubscribed.title} info={language.languageVars.titles.support.notSubscribed.titleInfo} />
          <Box mb={3}>
            <Typography className={`${classes.pageInfo} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} align="center" variant="body1" component="p">
              <b>
                {language.languageVars.data.support.paragraph2}
              </b>
            </Typography>
          </Box>
          <Elements stripe={stripeLoad}>
            <CardForm paymentSuccess={() => true} />
          </Elements>
          <Box className={classes.poweredBy} mt={2}>
            {language.languageVars.data.support.paragraph3}
            &nbsp;
            <img src="/assets/images/stripe.svg" alt="Powered by stripe" />
          </Box>
        </Box>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  isSubscriberSessionOpen: state.subscriberSession.isSubscriberSessionOpen,
})

Support.defaultProps = {
  isSubscriberSessionOpen: false,
}

Support.propTypes = {
  isSubscriberSessionOpen: PropTypes.bool,
}

export default connect(mapStateToProps, null)(Support)
