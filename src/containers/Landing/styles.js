import { makeStyles } from '@material-ui/core/styles'

export const landingStyles = makeStyles(theme => ({
  landingContainer: {
    maxWidth: '960px',
    margin: '0 auto',
  },
  heroParagraph: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  sectionBoxesContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  readSectionBox: {
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
        zIndex: 2,
        left: '40px',
      },
      '&:nth-child(3)': {
        transform: 'rotate(-30deg)',
        backgroundColor: theme.palette.background.reverse,
        top: '45px',
        zIndex: 1,
        left: '-25px',
      },
    },
    '& img': {
      width: '65px',
    },
  },
  readSectionBoxDarker: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: theme.palette.background.reverse,
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
    '& div': {
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      width: '85px',
      top: '-25px',
    },
    '& img': {
      width: '100%',
    },
  },
  readSectionBoxText: {
    textTransform: 'uppercase',
    fontSize: '0.8rem',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
