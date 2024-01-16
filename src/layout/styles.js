import { fade, makeStyles } from '@material-ui/core/styles'

export const loStyles = makeStyles(() => ({
  appContainer: {
    minHeight: 'calc(100vh - 240px)',
    paddingBottom: '160px',
    maxWidth: '800px',
  },
}))

export const navStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo: {
    maxWidth: '65px',
    display: 'block',
    padding: '16px 8px',
  },
  appName: {
    color: theme.palette.background.reverse,
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: theme.palette.background.reverse,
  },
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingRight: 0,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const floatingButtonsStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  floatingContainer: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 100,
    bottom: 0,
    right: 0,
    width: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      bottom: '65px',
      flexDirection: 'column',
      height: '90px',
      justifyContent: 'space-between',
      padding: 0,
    },
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const sideDrawerStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
  },
  logo: {
    maxWidth: '65px',
    display: 'block',
    padding: '16px 8px',
  },
  appName: {
    color: '#f3f0ea',
    textDecoration: 'none',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#f3f0ea',
  },
  linkTextRight: {
    textAlign: 'right',
  },
  mobileFooter: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: 0,
    width: '100%',
  },
  mobileFooterLinkText: {
    textTransform: 'none',
    color: theme.links.color,
    fontSize: '0.8rem !important',
    opacity: 0.8,
  },
  link: {
    textDecoration: 'none',
  },
  linkList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  linkButton: {
    paddingBottom: '0 important',
  },
  sideDivider: {
    backgroundColor: `${theme.palette.background.reverse} !important`,
    opacity: 0.5,
    marginTop: `${theme.spacing(2)}px !important`,
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const footerStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    width: '100%',
    backgroundColor: '#252525',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    borderBottom: '1px solid #555',
    padding: theme.spacing(2),
    color: '#fff',
  },
  linkList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  linkText: {
    color: '#fff',
    textDecoration: 'none',
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))

export const mobileNavigationStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    zIndex: 100,
    bottom: 0,
    left: 0,
    width: '100%',
    color: theme.palette.background.default,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
  selected: {
    color: theme.palette.background.highlight,
  },
  arabicFont: {
    fontFamily: `${theme.fonts.arabic} !important`,
  },
}))
