import { makeStyles } from '@material-ui/core/styles'

export const searchFilterStyles = makeStyles(theme => ({
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))
