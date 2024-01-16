import { makeStyles } from '@material-ui/core/styles'

export const supportStyles = makeStyles(theme => ({
  pageInfo: {
    color: theme.palette.background.highlight,
  },
  poweredBy: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      maxWidth: '50px',
    },
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
