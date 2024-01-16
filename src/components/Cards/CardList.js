import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import Tcard from './Tcard'
import TcardSkeleton from './TcardSkeleton'

import { useLanguage } from '../../hooks/useLang'

import { listStyles } from './styles'

const CardList = ({
  cards,
  loading,
  grid,
  showDetails,
}) => {
  const classes = listStyles()
  const language = useLanguage()

  const createCardsList = () => {
    let cardsList = []
    if (cards) {
      cardsList = cards.map(card => (
        <Grid item lg={grid.lg} md={grid.md} sm={grid.sm} xs={grid.xs} key={card.cardId}>
          <Tcard loading={loading} cardInfo={card} showDetails={showDetails} />
        </Grid>
      ))
    } else {
      cardsList = [...Array(12)].map(() => (
        <Grid item lg={grid.lg} md={grid.md} sm={grid.sm} xs={grid.xs} key={Math.floor(Math.random() * 1000000)}><TcardSkeleton /></Grid>
      ))
    }

    return cardsList
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        dir={language.direction}
      >
        {createCardsList()}
      </Grid>
    </div>
  )
}

CardList.defaultProps = {
  loading: false,
  cards: null,
  grid: null,
}

CardList.propTypes = {
  loading: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  grid: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  showDetails: PropTypes.func.isRequired,
}

export default CardList
