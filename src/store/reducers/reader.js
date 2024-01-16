import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  readSetup: [],
  readType: null,
  readTitle: null,
  readTitleAr: null,
  maxSelectedCards: null,
  selectedCards: [],
  createdRead: null,
  numberOfFlippedCards: 0,
  isCustomRead: false,
  isLoadedRead: false,
  readDate: null,
  loading: false,
  error: false,
}

const getCustomReadRequest = state => updateObj(state, { loading: true })
const getCustomReadSetupSuccess = (state, action) => updateObj(state, {
  readSetup: action.readSetup,
  maxSelectedCards: action.maxSelectedCards,
  isLoadedRead: action.isLoadedRead,
  readType: action.readType,
  readTitle: action.readTitle,
  readTitleAr: action.readTitleAr,
  loading: false,
  error: false,
})
const addCardToRead = (state, action) => {
  const newSetupArray = [...state.readSetup]
  const newSetupRowArray = [...newSetupArray[action.rowIndex]]
  const newSetupColObj = { ...newSetupRowArray[action.colIndex], lastDroppedItem: action.card, isReversed: action.isReversed || false }
  newSetupRowArray[action.colIndex] = newSetupColObj
  newSetupArray[action.rowIndex] = newSetupRowArray
  let selectedCards = [...state.selectedCards]
  selectedCards = selectedCards.filter(cardName => cardName !== action.existingCard)
  selectedCards = [...selectedCards, action.card.name]

  return updateObj(state, {
    selectedCards,
    readSetup: newSetupArray,
    loading: false,
    error: false,
  })
}
const removeCardFromRead = (state, action) => {
  const newSetupArray = [...state.readSetup]
  const newSetupRowArray = [...newSetupArray[action.rowIndex]]
  const newSetupColObj = { ...newSetupRowArray[action.colIndex], lastDroppedItem: null }
  newSetupRowArray[action.colIndex] = newSetupColObj
  newSetupArray[action.rowIndex] = newSetupRowArray

  return updateObj(state, {
    selectedCards: state.selectedCards.filter(cardName => cardName !== action.cardName),
    readSetup: newSetupArray,
    loading: false,
    error: false,
  })
}
const reverseCard = (state, action) => {
  const newSetupArray = [...state.readSetup]
  const newSetupRowArray = [...newSetupArray[action.rowIndex]]
  const newSetupColObj = { ...newSetupRowArray[action.colIndex] }
  newSetupColObj.lastDroppedItem.isReversed = !newSetupColObj.lastDroppedItem.isReversed
  newSetupRowArray[action.colIndex] = newSetupColObj
  newSetupArray[action.rowIndex] = newSetupRowArray

  return updateObj(state, {
    readSetup: newSetupArray,
  })
}
const flipCard = (state, action) => {
  const newCreatedReadArray = [...state.createdRead]
  newCreatedReadArray[action.index] = { ...newCreatedReadArray[action.index], isFlipped: true }

  return updateObj(state, {
    createdRead: newCreatedReadArray,
    numberOfFlippedCards: state.numberOfFlippedCards + 1,
  })
}
const getCustomReadFailure = state => updateObj(state, { loading: false, error: true })
const createRead = (state, action) => {
  let readingCards = []

  for (let i = 0; i < state.readSetup.length; i += 1) {
    for (let j = 0; j < state.readSetup[i].length; j += 1) {
      readingCards = [...readingCards, state.readSetup[i][j].lastDroppedItem]
    }
  }

  return updateObj(state, {
    createdRead: readingCards,
    readType: action.readType,
    isCustomRead: action.isCustomRead || false,
    isLoadedRead: action.isLoadedRead || false,
    readDate: action.readDate || null,
    loading: false,
    error: false,
  })
}
const clearRead = state => state

const readerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOM_READ_REQUEST: return getCustomReadRequest(state)
    case actionTypes.GET_CUSTOM_READ_SETUP_SUCCESS: return getCustomReadSetupSuccess(state, action)
    case actionTypes.ADD_CARD_TO_READ: return addCardToRead(state, action)
    case actionTypes.REMOVE_CARD_FROM_READ: return removeCardFromRead(state, action)
    case actionTypes.REVERSE_CARD: return reverseCard(state, action)
    case actionTypes.FLIP_CARD: return flipCard(state, action)
    case actionTypes.CREATE_READING_CARDS: return createRead(state, action)
    case actionTypes.GET_CUSTOM_READ_FAILURE: return getCustomReadFailure(state)
    case actionTypes.CLEAR_READ: return clearRead(initialState)
    default: return state
  }
}

export default readerReducer
