import { makeStyles } from '@material-ui/core/styles'

export const reader = makeStyles(theme => ({
  gridContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '300px',
    },
  },
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      padding: '3px !important',
    },
  },
  meaningGridContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  meaningTitle: {
    textAlign: 'center',
  },
  cardSelectInfo: {
    color: theme.palette.background.highlight,
  },
  cardSelectInfoShown: {
    maxHeight: '100px',
    opacity: 1,
  },
  adviceContainer: {
    backgroundColor: theme.palette.background.highlight,
    color: '#fff',
    padding: theme.spacing(2),
  },
  adviceTitle: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
