import * as actionTypes from './actionTypes'
import { getReads } from '../../API/reads'

export const getReadsRequest = () => ({
  type: actionTypes.GET_READS_REQUEST,
})

export const getReadsSuccess = reads => ({
  type: actionTypes.GET_READS_SUCCESS,
  reads,
  count: reads.length,
})

export const getReadsFailure = error => ({
  type: actionTypes.GET_READS_FAILURE,
  error,
})

export const loadReads = () => async dispatch => {
  dispatch(getReadsRequest())
  try {
    const cards = await getReads()
    dispatch(getReadsSuccess(cards))
  } catch (err) {
    dispatch(getReadsFailure(err))
  }
}
