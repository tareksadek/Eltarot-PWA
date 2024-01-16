import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import { listStyles } from './styles'

import ReadCard from './ReadCard'
import ReadCardSkeleton from './ReadCardSkeleton'

const ReadsList = ({ reads, loading, custom }) => {
  const classes = listStyles()

  const createReadsList = () => {
    let readsList = []
    if (reads) {
      readsList = reads.map(read => <ReadCard key={read.readId} loading={loading} cardInfo={read} custom={custom} />)
    } else {
      readsList = [...Array(3)].map(() => (
        <ReadCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return readsList
  }

  return (
    <Box className={classes.readsContainer}>
      {createReadsList()}
    </Box>
  )
}

ReadsList.defaultProps = {
  loading: false,
  reads: null,
  custom: false,
}

ReadsList.propTypes = {
  loading: PropTypes.bool,
  reads: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  custom: PropTypes.bool,
}

export default ReadsList
