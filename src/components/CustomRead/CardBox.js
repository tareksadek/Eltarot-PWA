import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  IconButton, Card, CardHeader, Typography, CardMedia, CardContent, CardActions,
} from '@material-ui/core'

import RotateRightIcon from '@material-ui/icons/RotateRight'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { useLanguage } from '../../hooks/useLang'

import { dropBoxStyles } from './styles'

const DropBox = ({
  lastDroppedItem,
  onClear,
  onReverse,
  position,
  openDialog,
}) => {
  const classes = dropBoxStyles()
  const language = useLanguage()

  const [cardReversed, setCardReversed] = useState(false)

  const reverseCard = () => {
    setCardReversed(!cardReversed)
    onReverse()
  }

  return (
    <Card
      className={classes.dropBox}
      square
      elevation={0}
      onClick={() => openDialog()}
    >
      <CardHeader
        classes={{ root: classes.header }}
        title={(
          <Typography
            align="center"
            color="secondary"
            component="p"
            variant="body1"
            className={`${classes.capitalize} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
          >
            {position}
          </Typography>
        )}
      />

      {lastDroppedItem && (
        <CardMedia height="140" component="img" className={`${classes.media} ${cardReversed && classes.reversedCard}`} image={`/assets/images/cards/${lastDroppedItem.image}`} title={lastDroppedItem.name} />
      )}

      {!lastDroppedItem && (
        <CardContent classes={{ root: classes.content }}>
          <Typography
            classes={{ root: classes.dropNotification }}
            align="center"
            color="textSecondary"
            component="p"
            className={language.direction === 'rtl' ? classes.arabicFont : ''}
          >
            {language.languageVars.data.customRead.cardBoxText}
          </Typography>
        </CardContent>
      )}

      {lastDroppedItem && (
        <CardActions classes={{ root: classes.actions }}>
          <IconButton
            size="small"
            color="secondary"
            disabled={!lastDroppedItem}
            onClick={e => {
              e.stopPropagation()
              onClear(lastDroppedItem.name)
            }}
          >
            <HighlightOffIcon />
          </IconButton>
          <IconButton
            size="small"
            color="secondary"
            onClick={e => {
              e.stopPropagation()
              reverseCard()
            }}
          >
            {cardReversed ? <RotateLeftIcon /> : <RotateRightIcon />}
          </IconButton>
        </CardActions>
      )}
    </Card>
  )
}

DropBox.defaultProps = {
  lastDroppedItem: null,
  position: null,
}

DropBox.propTypes = {
  lastDroppedItem: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onClear: PropTypes.func.isRequired,
  onReverse: PropTypes.func.isRequired,
  position: PropTypes.string,
  openDialog: PropTypes.func.isRequired,
}

export default DropBox
