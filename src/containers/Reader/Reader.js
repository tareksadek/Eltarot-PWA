import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Button, Grid, Box, Typography, List, ListItem, ListItemText,
} from '@material-ui/core'

import ReadingCard from '../../components/Reader/ReadingCard'
import MeaningSection from '../../components/Reader/MeaningSection'
import DetailsDialog from '../../components/Cards/DetailsDialog'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'
import SubscribeDialog from '../../components/SupportUs/SubscribeDialog'

import { saveRead, getSavedReads } from '../../API/users'
import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { reader } from './styles'

import * as vars from '../../utilities/appVars'

import * as actions from '../../store/actions'

const Reader = ({
  maxSelectedCards,
  numberOfFlippedCards,
  readSetup,
  createdRead,
  readType,
  readTitle,
  readTitleAr,
  isCustomRead,
  isLoadedRead,
  onSetNotification,
  onFlipCard,
  readDate,
  onOpenSession,
  isSubscriberSessionOpen,
}) => {
  const classes = reader()
  const auth = useAuth()
  const language = useLanguage()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [subscibeDialogOpen, setSubscibeDialogOpen] = useState(false)
  const [cardInfo, setCardInfo] = useState(null)
  const [saving, setSaving] = useState(false)
  const [readSaved, setReadSaved] = useState(false)
  const [flippOccurred, setFlippOccurred] = useState(false)

  const readTitleName = language.direction === 'rtl' ? readTitleAr : readTitle

  const pageTitle = () => {
    if (isLoadedRead) {
      return language.languageVars.savedRead
    }
    if (isCustomRead) {
      return language.languageVars.customRead
    }
    return language.languageVars.read
  }

  const openDetailsDialogHandler = info => {
    setDialogOpen(true)
    setCardInfo(info)
  }

  const closeDialogHandler = () => {
    setDialogOpen(false)
  }

  const closeSubscribeDialogHandler = () => {
    setSubscibeDialogOpen(false)
  }

  const flipCardHandler = cardIndex => {
    onFlipCard(cardIndex)
    setFlippOccurred(true)
  }

  const setupReadCards = () => {
    let cardsCounter = 0
    let listedCard
    const readRows = readSetup.map(
      row => Object.entries(row).map(
        (col, j) => {
          listedCard = createdRead[cardsCounter]
          cardsCounter += 1
          return (
            <Grid item xs={12 / Object.keys(row).length} key={j} className={classes.gridItem}>
              <ReadingCard
                card={listedCard}
                onFlip={flipCardHandler}
                isReversed={listedCard.isReversed}
                position={language.direction === 'rtl' ? col[1].nameAr : col[1].name}
              />
            </Grid>
          )
        },
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

  const setupReadMeaning = () => {
    let cardsCounter = 0
    let listedCard
    const readRows = readSetup.map(
      row => Object.entries(row).map(
        (col, j) => {
          listedCard = createdRead[cardsCounter]
          cardsCounter += 1
          return (
            <Grid item xs={12} key={j}>
              <MeaningSection
                card={listedCard}
                position={language.direction === 'rtl' ? col[1].nameAr : col[1].name}
                positionDescription={language.direction === 'rtl' ? col[1].descriptionAr : col[1].description}
                showDetails={openDetailsDialogHandler}
              />
            </Grid>
          )
        },
      ),
    )

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        spacing={3}
        className={classes.meaningGridContainer}
      >
        {readRows}
      </Grid>
    )
  }

  const setupReadAdvice = () => {
    const readRows = readSetup.map(
      row => Object.entries(row).map(
        (col, j) => {
          if (col[1].takeAdvice) {
            return (
              <ListItem alignItems="flex-start" key={j} dir={language.direction}>
                <ListItemText
                  primary={` - ${language.direction === 'rtl' ? col[1].lastDroppedItem.adviceAr : col[1].lastDroppedItem.advice}`}
                  style={language.direction === 'rtl' ? { textAlign: 'right' } : { textAlign: 'left' }}
                />
              </ListItem>
            )
          }
          return false
        },
      ),
    )

    return (
      <List className={classes.root} dir={language.direction}>
        {readRows}
      </List>
    )
  }

  const saveExistingRead = async () => {
    onOpenSession()
    setSaving(true)
    setSubscibeDialogOpen(false)
    let readSetupObject = {}
    let readSetupClone
    for (let i = 0; i < readSetup.length; i += 1) {
      for (let j = 0; j < readSetup[i].length; j += 1) {
        readSetupClone = [...readSetup]
        readSetupClone[i][j].lastDroppedItem.isFlipped = true
        flipCardHandler(readSetupClone[i][j].lastDroppedItem.index)
        readSetupObject = { ...readSetupObject, [i]: { ...readSetup[i] } }
      }
    }

    const readObj = {
      date: Date.now(),
      readType,
      readSetup: readSetupObject,
      isCustomRead,
    }

    try {
      const reads = await getSavedReads(auth.user.uid)
      if (reads.length < vars.MAX_SAVED_READS) {
        await saveRead(auth.user.uid, readObj)
        setReadSaved(true)
        onSetNotification({
          message: language.languageVars.notifications.readSaveSuccess,
          type: 'success',
        })
      } else {
        onSetNotification({
          message: language.languageVars.notifications.readSaveLimit,
          type: 'warning',
        })
      }
      setSaving(false)
    } catch (err) {
      onSetNotification({
        message: language.languageVars.notifications.readSaveFail,
        type: 'error',
      })
    }
  }

  const saveReadHandler = () => {
    if (auth.subscriberStatus || isSubscriberSessionOpen) {
      saveExistingRead()
    } else {
      saveExistingRead()
      // setSubscibeDialogOpen(true)
    }
  }

  return (
    <>
      {saving && <LoadingBackdrop loadingText={language.languageVars.loadingMessages.savingRead} />}
      <PageTitle title={`${pageTitle()}: ${readTitleName || '...'}`} info={isLoadedRead ? new Date(readDate).toLocaleString() : null} />
      <Box mb={3}>
        <Typography className={`${classes.cardSelectInfo} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} align="center" variant="body1" component="p">
          <b>
            {language.languageVars.messages.flipCards}
          </b>
        </Typography>
      </Box>
      {setupReadCards()}
      <Box mt={3} mb={3} className={classes.meaningTitle}>
        {!isLoadedRead
          && (
            <Button className={language.direction === 'rtl' ? classes.arabicFont : ''} variant="contained" color="primary" disabled={readSaved} onClick={() => saveReadHandler()}>
              {language.languageVars.buttons.saveRead}
            </Button>
          )}
      </Box>
      {setupReadMeaning()}
      <Box mt={3} mb={3} className={classes.meaningTitle}>
        {!isLoadedRead && flippOccurred
          && (
            <Button className={language.direction === 'rtl' ? classes.arabicFont : ''} variant="contained" color="primary" disabled={readSaved} onClick={() => saveReadHandler()}>
              {language.languageVars.buttons.saveRead}
            </Button>
          )}
      </Box>
      <Box className={classes.adviceContainer}>
        <Typography className={`${classes.adviceTitle} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} align="center" variant="body1" component="p">
          <b>
            {language.languageVars.titles.reader.advice.title}
          </b>
        </Typography>
        {numberOfFlippedCards === maxSelectedCards ? (
          setupReadAdvice()
        ) : (
          <Typography className={`${language.direction === 'rtl' ? classes.arabicFont : ''}`} align="center" variant="body1" component="p">
            {language.languageVars.messages.reader.advice.flipCards}
          </Typography>
        )}
      </Box>
      <DetailsDialog dialogOpen={dialogOpen} closeDialog={closeDialogHandler} cardInfo={cardInfo} />
      <SubscribeDialog dialogOpen={subscibeDialogOpen} closeDialog={closeSubscribeDialogHandler} paymentSuccess={saveExistingRead} />
    </>
  )
}

const mapStateToProps = state => ({
  maxSelectedCards: state.reader.maxSelectedCards,
  numberOfFlippedCards: state.reader.numberOfFlippedCards,
  createdRead: state.reader.createdRead,
  readSetup: state.reader.readSetup,
  readType: state.reader.readType,
  readTitle: state.reader.readTitle,
  readTitleAr: state.reader.readTitleAr,
  readDate: state.reader.readDate,
  isCustomRead: state.reader.isCustomRead,
  isLoadedRead: state.reader.isLoadedRead,
  isSubscriberSessionOpen: state.subscriberSession.isSubscriberSessionOpen,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onFlipCard: index => dispatch(actions.flipCard(index)),
  onOpenSession: () => dispatch(actions.openSession()),
})

Reader.defaultProps = {
  maxSelectedCards: 0,
  numberOfFlippedCards: 0,
  readSetup: [],
  createdRead: [],
  readType: null,
  readTitle: null,
  readTitleAr: null,
  isCustomRead: false,
  isLoadedRead: false,
  readDate: null,
  isSubscriberSessionOpen: false,
}

Reader.propTypes = {
  maxSelectedCards: PropTypes.number,
  numberOfFlippedCards: PropTypes.number,
  readSetup: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  readTitle: PropTypes.string,
  readTitleAr: PropTypes.string,
  createdRead: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  readType: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
  onFlipCard: PropTypes.func.isRequired,
  isCustomRead: PropTypes.bool,
  isLoadedRead: PropTypes.bool,
  readDate: PropTypes.number,
  onOpenSession: PropTypes.func.isRequired,
  isSubscriberSessionOpen: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader)
