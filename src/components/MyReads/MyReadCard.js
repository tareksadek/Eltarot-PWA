import React from 'react'
import PropTypes from 'prop-types'

import {
  ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Divider,
} from '@material-ui/core'

import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import DeleteIcon from '@material-ui/icons/Delete'

import { useLanguage } from '../../hooks/useLang'

import { listItemStyles } from './styles'

const MyReadCard = ({
  readInfo,
  removeRead,
  loadRead,
  loading,
}) => {
  const classes = listItemStyles()
  const language = useLanguage()

  const startReadHandler = () => {
    loadRead(readInfo.date)
  }

  const removeReadHandler = () => {
    removeRead(readInfo)
  }

  return (
    <>
      <ListItem className={classes.listItem} onClick={() => startReadHandler()}>
        <ListItemAvatar>
          <Avatar>
            <ChromeReaderModeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: classes.listPrimaryText,
          }}
          primary={readInfo.readType.replace('_', ' ')}
          secondary={new Date(readInfo.date).toLocaleString()}
          className={language.direction === 'rtl' ? classes.arabicFont : ''}
        />
        <ListItemSecondaryAction>
          {loading ? <CircularProgress size={20} />
            : (
              <>
                <IconButton
                  edge="end"
                  aria-label="Delete"
                  onClick={e => {
                    e.stopPropagation()
                    removeReadHandler()
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  )
}

MyReadCard.defaultProps = {
  readInfo: null,
  loading: false,
}

MyReadCard.propTypes = {
  readInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  removeRead: PropTypes.func.isRequired,
  loadRead: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default MyReadCard
