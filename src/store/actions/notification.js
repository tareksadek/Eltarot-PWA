import * as actionTypes from './actionTypes'

export const setNotification = notification => ({
  type: actionTypes.SET_NOTIFICATION,
  notification,
})

export const hideNotification = () => ({
  type: actionTypes.HIDE_NOTIFICATION,
})
