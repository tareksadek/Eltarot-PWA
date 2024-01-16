import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Box, Button, FormGroup, FormControlLabel, Checkbox, Typography,
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'
import { useLanguage } from '../../hooks/useLang'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Reader from '../Reader/Reader'
import PageTitle from '../../layout/PageTitle'

import { shuffleArray } from '../../utilities/utils'

import * as actions from '../../store/actions'

import { spread } from './styles'

const Spread = ({
  onLoadCards,
  onSetNotification,
  onLoadCustomReadSetup,
  onCreateRead,
  selectedCards,
  maxSelectedCards,
  loading,
  cards,
  cardsCount,
  readSetup,
  readTitle,
  readTitleAr,
  onAddCardToRead,
}) => {
  const { readRef } = useParams()
  const [isSpread, setIsSpread] = useState(false)
  const [isShuffeling, setIsShuffeling] = useState(false)
  const [shuffled, setShuffled] = useState(false)
  const [shuffeledCards, setShuffeledCards] = useState(null)
  const [readStart, setReadStart] = useState(false)
  const [reversedEnabled, setReversedEnabled] = useState(true)
  const [loadingSetup, setLoadingSetup] = useState(false)
  const numberOfSelectedCards = useRef()
  const currentReadRow = useRef(0)
  const currentReadCol = useRef(0)

  const theme = useTheme()
  const classes = spread()
  const language = useLanguage()
  const cardBackImage = theme.name === 'light' ? 'card-d' : 'card-l'
  const readTitleName = language.direction === 'rtl' ? readTitleAr : readTitle

  numberOfSelectedCards.current = selectedCards.length

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        if (!cards) {
          await onLoadCards()
        } else {
          onLoadCustomReadSetup(readRef)
        }
      })()
    }

    return () => { mounted = false }
  }, [cards, onLoadCards, onLoadCustomReadSetup, readRef])

  const selectCardHandler = card => {
    if (!shuffled) {
      onSetNotification({
        message: language.languageVars.notifications.cardsNotShuffled,
        type: 'success',
        horizontal: 'center',
        vertical: 'top',
      })
      return
    }
    if (!isSpread) {
      onSetNotification({
        message: language.languageVars.notifications.cardsNotSpread,
        type: 'success',
        horizontal: 'center',
        vertical: 'top',
      })
      return
    }

    const isReversed = reversedEnabled ? Math.random() <= 0.5 : false
    const selectedCard = card
    selectedCard.isFlipped = false
    selectedCard.isReversed = isReversed
    selectedCard.index = numberOfSelectedCards.current

    onAddCardToRead(currentReadRow.current, currentReadCol.current, card, isReversed)

    if (currentReadCol.current < readSetup[currentReadRow.current].length) {
      currentReadCol.current += 1
    }
    if (readSetup[currentReadRow.current].length === currentReadCol.current) {
      currentReadRow.current += 1
      currentReadCol.current = 0
    }

    numberOfSelectedCards.current += 1

    if (numberOfSelectedCards.current === maxSelectedCards) {
      setIsSpread(false)
      setLoadingSetup(true)
      setTimeout(() => {
        onCreateRead(readRef, false, false)
        setReadStart(true)
        setLoadingSetup(false)
      }, 2000)
    }
  }

  const isCardSelected = card => {
    let selected = false

    if (selectedCards.length > 0) {
      selectedCards.map(selectedCard => {
        if (selectedCard === card.name) {
          selected = true
        }
        return selected
      })
    }
    return selected
  }

  const generateCards = () => {
    let spreadCards
    const deck = shuffeledCards || cards
    const step = 360 / cardsCount
    const delay = 2 / cardsCount
    let angle = 0
    let seconds = 0

    if (cards) {
      spreadCards = deck.map((card, i) => {
        angle += step
        seconds += delay

        return (
          <div
            key={card.cardId}
            className={`card ${isShuffeling && 'shuffeling'} ${isCardSelected(card) && 'selected'}`}
            style={{
              transform: isSpread && `rotate(${angle}deg)`,
              animationDelay: isShuffeling && `${seconds}s`,
              zIndex: i,
              backgroundImage: `url(/assets/images/${cardBackImage}.png)`,
            }}
            aria-hidden="true"
            onClick={() => selectCardHandler(card)}
          >
            <span />
          </div>
        )
      })
    }

    return spreadCards
  }

  const spreadDeckHandler = () => {
    setIsSpread(true)
  }

  const shuffleDeckHandler = () => {
    setIsShuffeling(true)
    setShuffeledCards(shuffleArray([...cards]))
    setTimeout(() => {
      setIsShuffeling(false)
    }, 3000)
    if (!shuffled) {
      setShuffled(true)
    }
  }

  const changeReversedHandler = () => {
    setReversedEnabled(!reversedEnabled)
  }

  if (readStart) { return <Reader /> }

  return (
    <>
      {!cards || loading ? <LoadingBackdrop />
        : (
          <>
            <PageTitle title={`${language.languageVars.read}: ${readTitleName || '...'}`} />
            {
              maxSelectedCards !== selectedCards.length
              && isSpread
              && (
              <Typography className={`${classes.cardSelectInfo} ${isSpread && classes.cardSelectInfoShown} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} align="center" variant="body1" component="p">
                <b>
                  {language.languageVars.messages.selectCards.select}
                  {maxSelectedCards - selectedCards.length === 1 ? language.languageVars.oneCard : maxSelectedCards - selectedCards.length}
                  {maxSelectedCards - selectedCards.length === 1 ? language.languageVars.messages.selectCards.toContinue : language.languageVars.messages.selectCards.cardsToContinue}
                </b>
              </Typography>
              )
            }
            <Box mt={10}>
              {loadingSetup && <LoadingBackdrop />}
              <div className={`${classes.pactCount} ${isSpread && classes.pactSpread}`}>
                {generateCards()}
              </div>
              <Box display="flex" justifyContent="center" mb={3}>
                {shuffled && !isSpread && maxSelectedCards !== selectedCards.length ? (
                  <Button
                    size="large"
                    className={`${classes.button} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
                    variant="contained"
                    disabled={!shuffled || isShuffeling}
                    color="primary"
                    onClick={() => spreadDeckHandler()}
                  >
                    {language.languageVars.buttons.spread}
                  </Button>
                ) : null}
                {!shuffled && (
                  <Button
                    size="large"
                    className={`${classes.button} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
                    variant="contained"
                    color="primary"
                    disabled={isShuffeling || isSpread}
                    onClick={() => shuffleDeckHandler()}
                  >
                    {language.languageVars.buttons.shuffle}
                  </Button>
                )}
              </Box>
              <Box display="flex" justifyContent="center">
                <FormGroup row>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={reversedEnabled}
                        onChange={changeReversedHandler}
                        name="reversed"
                        color="primary"
                      />
                    )}
                    label={language.languageVars.buttons.enableReversed}
                    className={`${classes.formLabel} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
                    dir={language.direction}
                  />
                </FormGroup>
              </Box>
            </Box>
          </>
        )}
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.cards.loading,
  cards: state.cards.cards,
  cardsCount: state.cards.cardsCount,
  readSetup: state.reader.readSetup,
  readTitle: state.reader.readTitle,
  readTitleAr: state.reader.readTitleAr,
  selectedCards: state.reader.selectedCards,
  maxSelectedCards: state.reader.maxSelectedCards,
})

const mapDispatchToProps = dispatch => ({
  onLoadCards: () => dispatch(actions.loadCards()),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCustomReadSetup: readRef => dispatch(actions.loadCustomReadSetup(readRef)),
  onAddCardToRead: (rowIndex, colIndex, card, cardState) => dispatch(actions.addCard(rowIndex, colIndex, card, cardState)),
  onCreateRead: (readType, isCustomRead, isLoadedRead) => (dispatch(actions.createRead(readType, isCustomRead, isLoadedRead))),
})

Spread.defaultProps = {
  loading: false,
  cards: null,
  cardsCount: 0,
  readSetup: [],
  readTitle: null,
  readTitleAr: null,
  selectedCards: [],
  maxSelectedCards: null,
}

Spread.propTypes = {
  loading: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  cardsCount: PropTypes.number,
  onLoadCards: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onLoadCustomReadSetup: PropTypes.func.isRequired,
  readSetup: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  readTitle: PropTypes.string,
  readTitleAr: PropTypes.string,
  onAddCardToRead: PropTypes.func.isRequired,
  onCreateRead: PropTypes.func.isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.string),
  maxSelectedCards: PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(Spread)
