import { makeStyles } from '@material-ui/core/styles'

export const notificationStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
