import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'

import ReadsList from '../../components/Reads/ReadsList'

import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const Reads = ({
  onLoadReads,
  loading,
  reads,
  readsCount,
  custom,
}) => {
  const language = useLanguage()
  const pageTitle = custom ? language.languageVars.titles.reads.title.customRead : language.languageVars.titles.reads.title.read

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => { onLoadReads() })()
    }

    return () => { mounted = false }
  }, [onLoadReads])

  return (
    <Box>
      <PageTitle title={pageTitle} info={language.languageVars.titles.reads.titleInfo} />
      <ReadsList reads={reads} readsCount={readsCount} loading={loading} custom={custom} />
    </Box>
  )
}

const mapStateToProps = state => ({
  loading: state.reads.loading,
  reads: state.reads.reads,
  readsCount: state.reads.readsCount,
})

const mapDispatchToProps = dispatch => ({
  onLoadReads: () => dispatch(actions.loadReads()),
})

Reads.defaultProps = {
  loading: false,
  reads: null,
  readsCount: 0,
  custom: false,
}

Reads.propTypes = {
  loading: PropTypes.bool,
  reads: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  readsCount: PropTypes.number,
  onLoadReads: PropTypes.func.isRequired,
  custom: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reads)
