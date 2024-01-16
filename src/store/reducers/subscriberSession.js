import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  isSubscriberSessionOpen: false,
  loading: false,
  error: false,
}

const subscribeUser = state => updateObj(state, { isSubscriberSessionOpen: true })

const subscriberSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SESSION: return subscribeUser(state)
    default: return state
  }
}

export default subscriberSessionReducer
