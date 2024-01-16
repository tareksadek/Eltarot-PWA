import { makeStyles } from '@material-ui/core/styles'

export const bottomDrawerStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logo: {
    maxWidth: '150px',
    display: 'block',
    padding: theme.spacing(2),
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: theme.links.color,
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    width: '480px',
    [theme.breakpoints.down('sm')]: {
      width: '320px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '150px',
    },
  },
  arrowButton: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    '&:before': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
      opacity: 0.75,
    },
    '&:focus': {
      backgroundColor: theme.palette.background.reverse,
      color: theme.palette.background.default,
      opacity: 0.75,
    },
  },
  sliderNext: {
    right: '-35px',
  },
  sliderPrev: {
    left: '-35px',
  },
  dropAreaInfo: {
    textAlign: 'center',
    padding: 0,
    marginBottom: theme.spacing(1),
  },
  dropArea: {
    minHeight: '250px',
    boxShadow: '0 -15px 50px black',
    paddingBottom: theme.spacing(2),
    borderTop: '0',
    zIndex: '10',
  },
  dropAreaStart: {
    backgroundColor: theme.palette.background.default,
  },
  loadingDropArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    top: 0,
    bottom: 0,
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: 'transparent',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipDone: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.success.main,
    },
  },
}))

export const dropBoxStyles = makeStyles(theme => ({
  dropBox: {
    width: '160px',
    minHeight: '226px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1),
    paddingTop: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  actions: {
    justifyContent: 'center',
  },
  dropNotification: {
    opacity: '0.5',
    border: `1px dashed ${theme.palette.background.default}`,
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    transition: 'all 0.6s',
    transitionTimingFunction: 'ease-in',
  },
  reversedCard: {
    transform: 'rotate(0.5turn)',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const cardsDialog = makeStyles(theme => ({
  paperFullScreen: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.default,
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
  },
  dialogHeaderSlotName: {
    border: `1px dashed ${theme.palette.background.default}`,
    padding: '2px 5px',
  },
  dialogContent: {
    paddingBottom: theme.dialogSpacing + 20,
    backgroundColor: theme.palette.background.default,
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(2),
    paddingTop: '50px',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
