import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  reads: null,
  readsCount: 0,
  loading: false,
  error: false,
}

const getReadsRequest = state => updateObj(state, { loading: true })
const getReadsSuccess = (state, action) => updateObj(state, {
  readsCount: action.count,
  reads: action.reads,
  loading: false,
  error: false,
})
const getReadsFailure = state => updateObj(state, { loading: false, error: true })

const readsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_READS_REQUEST: return getReadsRequest(state)
    case actionTypes.GET_READS_SUCCESS: return getReadsSuccess(state, action)
    case actionTypes.GET_READS_FAILURE: return getReadsFailure(state)
    default: return state
  }
}

export default readsReducer
