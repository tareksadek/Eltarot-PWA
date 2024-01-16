import { makeStyles } from '@material-ui/core/styles'

export const listItemStyles = makeStyles(theme => ({
  listItem: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    cursor: 'pointer',
  },
  listPrimaryText: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const listContainerStyles = makeStyles(() => ({
  myReadsListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myReadsList: {
    maxWidth: '500px',
    minWidth: '300px',
  },
}))
