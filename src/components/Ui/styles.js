import { makeStyles } from '@material-ui/core/styles'

export const formStyles = makeStyles(theme => ({
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(1),
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
  },
  inputEl: {
    outline: 'none',
    padding: '6px 10px',
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    '&.Invalid': {
      borderColor: '#dd0000',
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: '#ccc',
    },
  },
}))
