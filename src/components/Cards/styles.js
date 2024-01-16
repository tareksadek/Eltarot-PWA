import { makeStyles } from '@material-ui/core/styles'

export const listStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mobileSpacing: {
    padding: '3px',
  },
}))

export const cardStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: '0 auto',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  media: {
    height: 'auto',
    padding: '0 8px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 5px 5px 5px',
    },
  },
  cardContent: {
    padding: theme.spacing(1),
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
  headerRoot: {
    padding: '8px',
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },
  avatarContainer: {
    marginRight: theme.spacing(1),
  },
  avatarContainerAr: {
    marginLeft: theme.spacing(1),
    marginRight: 0,
  },
  avatar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.reverse,
    width: '25px',
    height: '25px',
    [theme.breakpoints.down('xs')]: {
      width: '20px',
      height: '20px',
    },
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    padding: '4px',
  },
  cardTitle: {
    en: 'Berkshire Swash',
    ar: 'Reem Kufi',
  },
  cardMenu: {
    background: theme.palette.secondary.main,
  },
  cardMenuButton: {
    color: theme.palette.background.reverse,
  },
  disabledCard: {
    opacity: '0.5',
  },
  disabledCardImage: {
    filter: 'grayscale(1)',
  },
  disabledCardAvatar: {
    backgroundColor: '#3d3d3d',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const searchStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
    background: 'transparent',
    border: `1px solid ${theme.palette.background.reverse}`,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  searchContainer: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
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
    background: theme.palette.background.reverse,
    opacity: '0.26',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))

export const filterStyles = makeStyles(theme => ({
  filterContainer: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
  root: {
    '&:focus': {
      backgroundColor: theme.palette.background.reverse,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.background.default,
      },
    },
  },
  divider: {
    height: 28,
    margin: '4px 4px 4px 8px',
    background: theme.palette.background.reverse,
    opacity: '0.26',
  },
  filterButton: {
    border: `1px solid ${theme.palette.background.reverse}`,
    minHeight: '50px',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
    textAlign: 'right',
  },
}))

export const detailsDialog = makeStyles(theme => ({
  paperFullScreen: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      top: 0,
    },
  },
  dialogHeader: {
    top: theme.dialogSpacing,
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      top: 0,
    },
  },
  dialogHeaderSlotName: {
    border: `1px dashed ${theme.palette.background.default}`,
    padding: '2px 5px',
  },
  dialogTitle: {
    width: '100%',
  },
  cardContentContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  dialogContent: {
    paddingBottom: theme.dialogSpacing + 20,
    backgroundColor: theme.palette.background.default,
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(2),
    paddingTop: '50px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  dialogImage: {
    maxWidth: '250px',
    width: '100%',
  },
  keywordsContainer: {
    backgroundColor: theme.palette.background.reverse,
    color: theme.palette.background.default,
  },
  keywordsBox: {
    padding: theme.spacing(2),
  },
  keywordsTitle: {
    borderBottom: `1px solid ${theme.palette.background.default}`,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  multiLine: {
    whiteSpace: 'pre-line',
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
}))
