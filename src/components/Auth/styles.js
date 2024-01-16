import { makeStyles } from '@material-ui/core/styles'

export const messageStyles = makeStyles(theme => ({
  container: {
    maxWidth: '500px',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.background.reverse}`,
    textAlign: 'center',
    margin: '0 auto',
  },
}))
