import * as actionTypes from './actionTypes'
import { getSavedReads, removeRead } from '../../API/users'

export const getMyReadsRequest = () => ({
  type: actionTypes.GET_MY_READS_REQUEST,
})

export const getMyReadsSuccess = reads => ({
  type: actionTypes.GET_MY_READS_SUCCESS,
  reads,
  count: reads.length,
})

export const getMyReadsFailure = error => ({
  type: actionTypes.GET_MY_READS_FAILURE,
  error,
})

export const loadRead = loadedRead => ({
  type: actionTypes.LOAD_READ,
  loadedRead,
})

export const loadMyReads = userId => async dispatch => {
  dispatch(getMyReadsRequest())
  try {
    const reads = await getSavedReads(userId)
    dispatch(getMyReadsSuccess(reads))
  } catch (err) {
    dispatch(getMyReadsFailure(err))
  }
}

export const removeOneRead = (currentReads, userId, readObj) => async dispatch => {
  dispatch(getMyReadsRequest())
  try {
    await removeRead(userId, readObj)
    const reads = currentReads.filter(read => read.date !== readObj.date)
    dispatch(getMyReadsSuccess(reads))
  } catch (err) {
    dispatch(getMyReadsFailure(err))
  }
}

export const loadOneRead = loadedRead => dispatch => {
  dispatch(loadRead(loadedRead))
}
