import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

export const listStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  readsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}))

export const readCard = makeStyles(theme => ({
  capitalize: {
    textTransform: 'capitalize',
  },
  readCardWrapper: {
    width: '150px',
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  readCardContainer: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    borderRadius: '4px',
    width: '150px',
    padding: theme.spacing(1),
    height: '200px',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    cursor: 'pointer',
    marginBottom: theme.spacing(1),
    '& div': {
      position: 'absolute',
      width: '65px',
      height: '98px',
      left: 0,
      right: 0,
      margin: 'auto',
      '&:first-child': {
        transform: 'rotate(-7deg)',
        top: '-20px',
        zIndex: 0,
      },
      '&:nth-child(2)': {
        transform: 'rotate(15deg)',
        backgroundColor: theme.palette.background.reverse,
        top: '20px',
        zIndex: 3,
        left: '40px',
      },
      '&:nth-child(3)': {
        transform: 'rotate(-30deg)',
        backgroundColor: theme.palette.background.reverse,
        top: '45px',
        zIndex: 2,
        left: '-25px',
      },
      '&:nth-child(4)': {
        transform: 'rotate(-20deg)',
        backgroundColor: theme.palette.background.reverse,
        top: '42px',
        zIndex: 1,
        left: '40px',
      },
      '&:nth-child(5)': {
        transform: 'rotate(25deg)',
        backgroundColor: theme.palette.background.reverse,
        top: '30px',
        zIndex: 1,
        left: '-40px',
      },
    },
    '& img': {
      width: '65px',
    },
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const cardStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}))

export const searchStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))
