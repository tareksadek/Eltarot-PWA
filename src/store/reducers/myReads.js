import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  reads: null,
  readsCount: 0,
  loadedRead: null,
  loading: false,
  error: false,
}

const getMyReadsRequest = state => updateObj(state, { loading: true })
const getMyReadsSuccess = (state, action) => updateObj(state, {
  readsCount: action.count,
  reads: action.reads,
  loading: false,
  error: false,
})
const loadRead = (state, action) => updateObj(state, {
  loadedRead: action.loadedRead,
  loading: false,
  error: false,
})
const getMyReadsFailure = state => updateObj(state, { loading: false, error: true })

const myReadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MY_READS_REQUEST: return getMyReadsRequest(state)
    case actionTypes.GET_MY_READS_SUCCESS: return getMyReadsSuccess(state, action)
    case actionTypes.LOAD_READ: return loadRead(state, action)
    case actionTypes.GET_MY_READS_FAILURE: return getMyReadsFailure(state)
    default: return state
  }
}

export default myReadsReducer
