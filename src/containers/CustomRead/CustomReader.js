import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Grid, Button, Typography, Box,
} from '@material-ui/core'

import CardBox from '../../components/CustomRead/CardBox'
import CardsDialog from '../../components/CustomRead/CardsDialog'
import PageTitle from '../../layout/PageTitle'
import LoadingPlaceholder from '../../layout/LoadingPlaceholder'
import Reader from '../Reader/Reader'
import SubscribeDialog from '../../components/SupportUs/SubscribeDialog'

import { reader } from './styles'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const CustomReader = ({
  readSetup,
  selectedCards,
  onLoadCustomReadSetup,
  onCreateRead,
  onClearBox,
  onReverseCard,
  onAddCardToRead,
  maxSelectedCards,
  loadingReadSetup,
  onOpenSession,
  isSubscriberSessionOpen,
  readTitle,
  readTitleAr,
}) => {
  const { readRef } = useParams()
  const classes = reader()
  const auth = useAuth()
  const language = useLanguage()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [subscibeDialogOpen, setSubscibeDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState(null)
  const [cardRowIndex, setCardRowIndex] = useState(null)
  const [cardColumnIndex, setCardColumnIndex] = useState(null)
  const [replacingCard, setReplacingCard] = useState(null)
  const [readStart, setReadStart] = useState(false)

  const readTitleName = language.direction === 'rtl' ? readTitleAr : readTitle

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        onLoadCustomReadSetup(readRef)
      })()
    }

    return () => { mounted = false }
  }, [onCreateRead, onLoadCustomReadSetup, readRef])

  const isSelected = cardName => selectedCards.indexOf(cardName) > -1

  const startReadEnabeled = selectedCards.length === maxSelectedCards

  const cardsToDrop = () => {
    let dropCards

    if (selectedCards.length === 0) {
      dropCards = `${maxSelectedCards} ${language.languageVars.cards}`
    }
    if (maxSelectedCards - selectedCards.length === 1) {
      dropCards = language.languageVars.oneCard
    } else {
      dropCards = `${maxSelectedCards - selectedCards.length} ${language.languageVars.cards}`
    }

    return dropCards
  }

  const openDialogHandler = (title, rowIndex, colIndex, existingCardName) => {
    setDialogTitle(title)
    setCardRowIndex(rowIndex)
    setCardColumnIndex(colIndex)
    setDialogOpen(true)
    setReplacingCard(existingCardName)
  }

  const closeDialogHandler = () => {
    setDialogOpen(false)
  }

  const closeSubscribeDialogHandler = () => {
    setSubscibeDialogOpen(false)
  }

  const addCardHandler = (rowIndex, colIndex, card, existingCard) => {
    const selectedCard = card
    selectedCard.isFlipped = true
    selectedCard.isReversed = false
    onAddCardToRead(rowIndex, colIndex, card, existingCard, false)
    closeDialogHandler()
  }

  const handleClear = (rowIndex, colIndex, cardName) => {
    onClearBox(rowIndex, colIndex, cardName)
  }

  const handleReverse = (rowIndex, colIndex) => {
    onReverseCard(rowIndex, colIndex)
  }

  const setupRead = () => {
    const readRows = readSetup.map(
      (row, i) => Object.entries(row).map(
        (col, j) => (
          <Grid
            item
            xs={12 / Object.keys(row).length}
            key={j}
            className={classes.readItem}
          >
            <CardBox
              position={language.direction === 'rtl' ? col[1].nameAr : col[1].name}
              openDialog={() => openDialogHandler(language.direction === 'rtl' ? col[1].nameAr : col[1].name, i, j, col[1].lastDroppedItem ? col[1].lastDroppedItem.name : null)}
              onClear={cardName => handleClear(i, j, cardName)}
              onReverse={() => handleReverse(i, j)}
              lastDroppedItem={col[1].lastDroppedItem}
            />
          </Grid>
        ),
      ),
    )

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        spacing={3}
        className={classes.gridContainer}
        dir={language.direction}
      >
        {readRows}
      </Grid>
    )
  }

  const processRead = () => {
    onOpenSession()
    onCreateRead(readRef, true, false)
    setReadStart(true)
  }

  const startReadHandler = () => {
    if (auth.subscriberStatus || isSubscriberSessionOpen) {
      processRead()
    } else {
      processRead()
      // setSubscibeDialogOpen(true)
    }
  }

  if (readStart) { return <Reader /> }

  return (
    <>
      {loadingReadSetup || readSetup.length === 0 ? (
        <LoadingPlaceholder loadingText={language.languageVars.loadingMessages.loadingCustomReadSlots} />
      ) : (
        <>
          <PageTitle title={`${language.languageVars.titles.customRead}: ${readTitleName || '...'}`} />
          {!startReadEnabeled && (
            <Typography align="center" component="p" variant="body1" className={`${classes.cardSelectInfo} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
              <b>
                {`${language.languageVars.messages.selectCards.select} ${cardsToDrop()} ${language.languageVars.messages.selectCards.toContinue}`}
              </b>
            </Typography>
          )}
          <Box mt={4} align="center">
            {setupRead()}
          </Box>
          <Box mt={2} align="center">
            <Button className={language.direction === 'rtl' ? classes.arabicFont : ''} variant="contained" color="primary" disabled={!startReadEnabeled} onClick={startReadHandler}>Start</Button>
          </Box>
          <CardsDialog
            closeDialog={closeDialogHandler}
            dialogOpen={dialogOpen}
            title={dialogTitle}
            cardBoxOpt={{
              addCard: card => addCardHandler(cardRowIndex, cardColumnIndex, card, replacingCard),
              isSelected,
            }}
          />
          <SubscribeDialog dialogOpen={subscibeDialogOpen} closeDialog={closeSubscribeDialogHandler} paymentSuccess={processRead} />
        </>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  loadingReadSetup: state.reader.loading,
  cards: state.cards.cards,
  cardsCount: state.cards.cardsCount,
  cardsPerPage: state.cards.cardsPerPage,
  readSetup: state.reader.readSetup,
  readTitle: state.reader.readTitle,
  readTitleAr: state.reader.readTitleAr,
  maxSelectedCards: state.reader.maxSelectedCards,
  selectedCards: state.reader.selectedCards,
  isSubscriberSessionOpen: state.subscriberSession.isSubscriberSessionOpen,
})

const mapDispatchToProps = dispatch => ({
  onLoadCustomReadSetup: readRef => dispatch(actions.loadCustomReadSetup(readRef)),
  onAddCardToRead: (rowIndex, colIndex, card, cardState) => dispatch(actions.addCard(rowIndex, colIndex, card, cardState)),
  onReverseCard: (rowIndex, colIndex, cardState) => dispatch(actions.reverseCard(rowIndex, colIndex, cardState)),
  onClearBox: (rowIndex, colIndex, cardName) => dispatch(actions.clearDropArea(rowIndex, colIndex, cardName)),
  onCreateRead: (readType, isCustomRead, isLoadedRead) => dispatch(actions.createRead(readType, isCustomRead, isLoadedRead)),
  onOpenSession: () => dispatch(actions.openSession()),
})

CustomReader.defaultProps = {
  readSetup: [],
  selectedCards: [],
  maxSelectedCards: null,
  loadingReadSetup: false,
  isSubscriberSessionOpen: false,
  readTitle: null,
  readTitleAr: null,
}

CustomReader.propTypes = {
  readSetup: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  selectedCards: PropTypes.arrayOf(PropTypes.string),
  onLoadCustomReadSetup: PropTypes.func.isRequired,
  onCreateRead: PropTypes.func.isRequired,
  onClearBox: PropTypes.func.isRequired,
  onReverseCard: PropTypes.func.isRequired,
  onAddCardToRead: PropTypes.func.isRequired,
  maxSelectedCards: PropTypes.number,
  loadingReadSetup: PropTypes.bool,
  onOpenSession: PropTypes.func.isRequired,
  isSubscriberSessionOpen: PropTypes.bool,
  readTitle: PropTypes.string,
  readTitleAr: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomReader)
