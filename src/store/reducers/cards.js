import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  cards: null,
  cardsCount: 0,
  cardsPerPage: 12,
  loading: false,
  error: false,
}

const getCardsRequest = state => updateObj(state, { loading: true })
const getCardsSuccess = (state, action) => updateObj(state, {
  cardsCount: action.count,
  cards: action.cards,
  loading: false,
  error: false,
})
const getCardsFailure = state => updateObj(state, { loading: false, error: true })

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CARDS_REQUEST: return getCardsRequest(state)
    case actionTypes.GET_CARDS_SUCCESS: return getCardsSuccess(state, action)
    case actionTypes.GET_CARDS_FAILURE: return getCardsFailure(state)
    default: return state
  }
}

export default cardsReducer
