import * as actionTypes from './actionTypes'

export const subscribeUser = () => ({
  type: actionTypes.START_SESSION,
})

export const openSession = () => dispatch => {
  dispatch(subscribeUser())
}
