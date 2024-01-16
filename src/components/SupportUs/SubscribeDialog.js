import React from 'react'
import PropTypes from 'prop-types'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Box,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import CardForm from './CardForm'

import * as vars from '../../utilities/appVars'

import { subscribeDialog } from './styles'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)
const stripeLoad = loadStripe(vars.STRIPE_PIBLISHABLE_KEY)

const SubscribeDialog = ({
  closeDialog, dialogOpen, paymentSuccess,
}) => {
  const classes = subscribeDialog()

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={Transition}
      classes={{
        paperFullScreen: classes.paperFullScreen,
      }}
    >
      <AppBar className={classes.dialogHeader}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography className={classes.dialogTitle} align="center" variant="h4">
            Subscribe
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.dialogContent}>
        <Elements stripe={stripeLoad}>
          <CardForm paymentSuccess={paymentSuccess} />
        </Elements>
      </Box>
    </Dialog>
  )
}

SubscribeDialog.defaultProps = {
  dialogOpen: false,
}

SubscribeDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  paymentSuccess: PropTypes.func.isRequired,
}

export default SubscribeDialog
