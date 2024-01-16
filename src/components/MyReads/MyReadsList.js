import React from 'react'
import PropTypes from 'prop-types'

import { List, Box } from '@material-ui/core'

import MyReadCard from './MyReadCard'
import MyReadCardSkeleton from './MyReadCardSkeleton'
import * as vars from '../../utilities/appVars'

import { listContainerStyles } from './styles'

const myReadsList = ({
  reads,
  loading,
  removeRead,
  loadRead,
}) => {
  const classes = listContainerStyles()

  const createReadsList = () => {
    let readsList = []
    if (reads) {
      readsList = reads.map(read => (
        <MyReadCard
          key={read.date}
          loading={loading}
          readInfo={read}
          removeRead={removeRead}
          loadRead={loadRead}
        />
      ))
    } else {
      readsList = [...Array(vars.MAX_SAVED_READS)].map(() => (
        <MyReadCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return readsList
  }

  return (
    <Box className={classes.myReadsListContainer}>
      <List className={classes.myReadsList}>
        {createReadsList()}
      </List>
    </Box>
  )
}

myReadsList.defaultProps = {
  loading: false,
  reads: null,
}

myReadsList.propTypes = {
  loading: PropTypes.bool,
  reads: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  removeRead: PropTypes.func.isRequired,
  loadRead: PropTypes.func.isRequired,
}

export default myReadsList
