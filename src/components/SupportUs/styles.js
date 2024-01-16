import { makeStyles } from '@material-ui/core/styles'

export const cardFormStyles = makeStyles(theme => ({
  container: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  formContainer: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.background.reverse}`,
    margin: '16px 0',
  },
  formError: {
    color: '#d00000',
    fontSize: '0.7rem',
  },
}))

export const subscribeDialog = makeStyles(theme => ({
  paperFullScreen: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.default,
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
  },
  dialogTitle: {
    width: '100%',
  },
  dialogContent: {
    paddingBottom: theme.dialogSpacing + 20,
    backgroundColor: theme.palette.background.default,
    maxWidth: '500px',
    margin: '0 auto',
    padding: theme.spacing(2),
    paddingTop: '50px',
    width: '100%',
    marginTop: theme.spacing(6),
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
