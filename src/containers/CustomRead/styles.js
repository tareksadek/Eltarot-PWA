import { makeStyles } from '@material-ui/core/styles'

export const reader = makeStyles(theme => ({
  gridContainer: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  readItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardSelectInfo: {
    color: theme.palette.background.highlight,
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
