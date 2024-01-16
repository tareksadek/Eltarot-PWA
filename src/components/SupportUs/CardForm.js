import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  useStripe, useElements, CardElement,
} from '@stripe/react-stripe-js'

import { Box, Typography, Button } from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'
import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { dbFunctions } from '../../API/firebase'
import { setUserClaims } from '../../API/users'

import * as actions from '../../store/actions'

import { cardFormStyles } from './styles'

const useOptions = () => {
  const theme = useTheme()
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: theme.palette.background.reverse,
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
      hidePostalCode: true,
    }), [theme],
  )

  return options
}

const CardForm = ({ onSetNotification, paymentSuccess }) => {
  const language = useLanguage()
  const auth = useAuth()
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()
  const classes = cardFormStyles()
  const [processing, setProcessing] = useState(false)
  const [formError, setFormError] = useState(null)

  const makeSubscriber = async email => {
    const addSubscriberRole = dbFunctions.httpsCallable('addSubscriberRole')
    try {
      const res = await addSubscriberRole({ email })
      return res.data.message
    } catch (err) {
      throw new Error(err)
    }
  }

  const changeUserClaim = (userId, claim) => {
    setUserClaims(userId, claim)
  }

  const onPaymentHandler = async (stripeInstance, elementsInstance, component, callBack) => {
    if (!stripeInstance || !elementsInstance) {
      return
    }
    setProcessing(true)
    try {
      const getClientSecret = dbFunctions.httpsCallable('createOrderAndSession')
      const clientSecret = await getClientSecret()

      const result = await stripeInstance.confirmCardPayment(clientSecret.data, {
        payment_method: {
          card: elementsInstance.getElement(component),
          billing_details: {
            email: auth.user.email,
          },
        },
      })

      if (result.error) {
        setProcessing(false)
        onSetNotification({
          message: language.languageVars.notifications.subscriptionPaymentFail,
          type: 'danger',
        })
        return
      }
      if (result.paymentIntent.status === 'succeeded') {
        await makeSubscriber(auth.user.email)
        await changeUserClaim(auth.user.uid, { subscriber: true })
        await auth.refreshToken()
        setProcessing(false)
        callBack()
        onSetNotification({
          message: language.languageVars.notifications.subscriptionPaymentSuccess,
          type: 'success',
        })
      } else {
        setProcessing(false)
        onSetNotification({
          message: language.languageVars.notifications.subscriptionPaymentFail,
          type: 'error',
        })
      }
    } catch (err) {
      setProcessing(false)
      onSetNotification({
        message: language.languageVars.notifications.subscriptionPaymentFail,
        type: 'error',
      })
    }
  }

  const formErrorHandler = e => {
    if (e.error) {
      setFormError(e.error.message)
    } else {
      setFormError(null)
    }
  }

  return (
    <>
      {processing && <LoadingBackdrop />}
      <Box className={classes.container}>
        <Typography component="p" variant="body1" className={language.direction === 'rtl' ? classes.arabicFont : ''}>
          {language.languageVars.titles.paymentFormTitle}
        </Typography>
        <Box className={classes.formContainer}>
          <form>
            <CardElement
              options={options}
              onChange={e => formErrorHandler(e)}
            />
          </form>
          {formError && (
            <Typography component="p" variant="body1" className={classes.formError}>{formError}</Typography>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={language.direction === 'rtl' ? classes.arabicFont : ''}
          disabled={!stripe}
          onClick={() => onPaymentHandler(stripe, elements, CardElement, paymentSuccess)}
        >
          {language.languageVars.buttons.support}
        </Button>
      </Box>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

CardForm.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  paymentSuccess: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(CardForm)
