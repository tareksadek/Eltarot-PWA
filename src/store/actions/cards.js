import * as actionTypes from './actionTypes'
import { getCards } from '../../API/cards'

export const getCardsRequest = () => ({
  type: actionTypes.GET_CARDS_REQUEST,
})

export const getCardsSuccess = cards => ({
  type: actionTypes.GET_CARDS_SUCCESS,
  cards,
  count: cards.length,
})

export const getCardsFailure = error => ({
  type: actionTypes.GET_CARDS_FAILURE,
  error,
})

export const loadCards = () => async dispatch => {
  dispatch(getCardsRequest())
  try {
    const cards = await getCards()
    dispatch(getCardsSuccess(cards))
  } catch (err) {
    dispatch(getCardsFailure(err))
  }
}
