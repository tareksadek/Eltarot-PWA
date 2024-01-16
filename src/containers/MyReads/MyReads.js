import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Box, Button } from '@material-ui/core'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import MyReadsList from '../../components/MyReads/MyReadsList'
import PageTitle from '../../layout/PageTitle'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Reader from '../Reader/Reader'

const MyReads = ({
  savedReads,
  loading,
  onLoadMyReads,
  onRemoveRead,
  onLoadRead,
  onSetNotification,
  processingRead,
  onClearReader,
}) => {
  const auth = useAuth()
  const language = useLanguage()
  const [readStart, setReadStart] = useState(false)
  const loadingProgress = processingRead || loading

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        await onLoadMyReads(auth.user.uid)
        onClearReader()
      })()
    }

    return () => { mounted = false }
  }, [auth.user.uid, onClearReader, onLoadMyReads])

  const removeReadHandler = async read => {
    try {
      await onRemoveRead(savedReads, auth.user.uid, read)
      onSetNotification({
        message: language.languageVars.notifications.readRemovedSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: language.languageVars.notifications.readRemovedFail,
        type: 'error',
      })
    }
  }

  const loadReadHandler = async readDate => {
    try {
      await onLoadRead(auth.user.uid, readDate)
      setReadStart(true)
    } catch (err) {
      onSetNotification({
        message: language.languageVars.notifications.readLoadFail,
        type: 'error',
      })
    }
  }

  const backToListHandler = () => {
    setReadStart(false)
    onClearReader()
  }

  if (readStart) {
    return (
      <>
        <Box align="center" mt={4}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => backToListHandler()}
          >
            {language.languageVars.buttons.myReads.backToSavedReads}
          </Button>
        </Box>
        <Reader />
        <Box align="center">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => backToListHandler()}
          >
            {language.languageVars.buttons.myReads.backToSavedReads}
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Box>
      {loadingProgress && <LoadingBackdrop loadingText={language.languageVars.loadingMessages.loadingSavedReads} />}
      <PageTitle
        title={language.languageVars.titles.myReads.title}
        info={savedReads && savedReads.length > 0 ? language.languageVars.titles.myReads.titleInfoWithReads : language.languageVars.titles.myReads.titleInfoWithoutReads}
      />
      <MyReadsList reads={savedReads} loading={loading} removeRead={removeReadHandler} loadRead={loadReadHandler} />
    </Box>
  )
}

MyReads.defaultProps = {
  loading: false,
  savedReads: null,
  processingRead: false,
}

MyReads.propTypes = {
  savedReads: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  loading: PropTypes.bool,
  onLoadMyReads: PropTypes.func.isRequired,
  onRemoveRead: PropTypes.func.isRequired,
  onLoadRead: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  processingRead: PropTypes.bool,
  onClearReader: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  savedReads: state.myReads.reads,
  loading: state.myReads.loading,
  processingRead: state.reader.loading,
})

const mapDispatchToProps = dispatch => ({
  onLoadMyReads: userId => dispatch(actions.loadMyReads(userId)),
  onRemoveRead: (currentReads, userId, readObj) => dispatch(actions.removeOneRead(currentReads, userId, readObj)),
  onLoadRead: (userId, readDate) => dispatch(actions.loadSavedRead(userId, readDate)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onClearReader: () => dispatch(actions.clearReader()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyReads)
