import { makeStyles } from '@material-ui/core/styles'

export const readingCard = makeStyles(theme => ({
  flipCard: {
    backgroundColor: 'transparent',
    width: '160px',
    height: '225px',
    perspective: '1000px',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '90px',
      height: '163px',
    },
  },
  flipCardImageBack: {
    width: '100%',
  },
  flipCardImage: {
    width: '105px',
    [theme.breakpoints.down('xs')]: {
      width: '80px',
    },
  },
  reversedCardImage: {
    transform: 'rotate(0.5turn)',
  },
  flipped: {
    transform: 'rotateY(180deg)',
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
  },
  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    transform: 'rotateY(180deg)',
    borderRadius: '6px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: '3px',
      borderRadius: '2px',
    },
  },
  cardName: {
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  cardPosition: {
    padding: theme.spacing(1),
    textTransform: 'capitalize',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const meaningBox = makeStyles(theme => ({
  root: {
    transition: 'max-height 0.5s ease-out',
    maxHeight: 0,
  },
  meaningData: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  sectionFlipped: {
    maxHeight: '1000px',
    border: `1px solid ${theme.palette.background.reverse}`,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  mediaContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  cardHeader: {
    textAlign: 'center',
    color: theme.palette.background.default,
  },
  cardFlipped: {
    transform: 'rotate(0.5turn)',
  },
  titleSub: {
    fontSize: 12,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  keywords: {
    color: theme.palette.background.highlight,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    paddingTop: 0,
    [theme.breakpoints.down('xs')]: {
      padding: '16px 0',
    },
  },
  cover: {
    width: 151,
    marginBottom: theme.spacing(1),
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
