import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'

const ErrorNotification = ({ error, isOpen, onHideError }) => {
  const handleClose = () => {
    onHideError()
  }

  return (
    <>
      {isOpen && error && (
      <div className="errorClass">
        <button type="button" onClick={handleClose}>Close Error</button>
        <span>{error.message}</span>
      </div>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  error: state.errorCenter.error,
  isOpen: state.errorCenter.isOpen,
})

const mapDispatchToProps = dispatch => ({
  onHideError: () => dispatch(actions.hideError()),
})

ErrorNotification.defaultProps = {
  error: null,
  isOpen: null,
}

ErrorNotification.propTypes = {
  error: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.func,
  ])),
  isOpen: PropTypes.bool,
  onHideError: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
