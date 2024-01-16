import { makeStyles } from '@material-ui/core/styles'

export const backdropStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    flexDirection: 'column',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
