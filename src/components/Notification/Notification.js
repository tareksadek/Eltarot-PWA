import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import { notificationStyles } from './styles'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const Notification = ({
  notification,
  isOpen,
  hideNotification,
}) => {
  const language = useLanguage()
  const classes = notificationStyles()

  const handleClose = () => {
    hideNotification()
  }

  if (!notification) {
    return false
  }

  const horizontal = notification.horizontal || 'right'
  const vertical = notification.vertical || 'top'

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ horizontal, vertical }}>
      <Alert
        onClose={handleClose}
        severity={notification.type}
        className={language.direction === 'rtl' ? classes.arabicFont : ''}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

const mapStateToProps = state => ({
  notification: state.notification.notification,
  isOpen: state.notification.isOpen,
})

const mapDispatchToProps = dispatch => ({
  hideNotification: () => dispatch(actions.hideNotification()),
})

Notification.defaultProps = {
  notification: null,
  isOpen: false,
}

Notification.propTypes = {
  notification: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  isOpen: PropTypes.bool,
  hideNotification: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
