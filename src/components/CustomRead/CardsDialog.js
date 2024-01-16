import React from 'react'
import PropTypes from 'prop-types'

import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Box,
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

import Cards from '../../containers/Cards/Cards'

import { cardsContext } from '../../context/customRead/cardsContext'

import { useLanguage } from '../../hooks/useLang'

import { cardsDialog } from './styles'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const CardsDialog = ({
  closeDialog, dialogOpen, title, cardBoxOpt,
}) => {
  const classes = cardsDialog()
  const language = useLanguage()
  const cardsGrid = {
    lg: 3, md: 3, sm: 4, xs: 6,
  }

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={Transition}
      classes={{
        paperFullScreen: classes.paperFullScreen,
      }}
      dir={language.direction}
    >
      <AppBar className={classes.dialogHeader}>
        <Toolbar>
          <IconButton edge={language.direction === 'rtl' ? false : 'start'} color="inherit" onClick={closeDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={language.direction === 'rtl' ? classes.arabicFont : ''}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {language.languageVars.data.customRead.selectDialogueTitle.text1} <span className={classes.dialogHeaderSlotName}>{title}</span> {language.languageVars.data.customRead.selectDialogueTitle.text2}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.dialogContent}>
        <cardsContext.Provider value={cardBoxOpt}>
          <Cards gridLayout={cardsGrid} />
        </cardsContext.Provider>
      </Box>
    </Dialog>
  )
}

CardsDialog.defaultProps = {
  dialogOpen: false,
  title: null,
  cardBoxOpt: null,
}

CardsDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  title: PropTypes.string,
  cardBoxOpt: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ])),
}

export default CardsDialog
