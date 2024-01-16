import { makeStyles } from '@material-ui/core/styles'

export const spread = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  pactCount: {
    height: '250px',
    margin: '0 auto',
    padding: '0 40px',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    transition: 'height 1s ease-out, margin-left 1s ease-out',
    '& .card': {
      width: '150px',
      height: '210px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      position: 'absolute',
      backgroundColor: 'white',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      textAlign: 'center',
      marginTop: 0,
      transition: 'all 1s',
      transformOrigin: '0% 95%',
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
    },
    '& .shuffeling': {
      animationName: '$shuffle',
      animationDuration: '1s',
    },
    '& .selected': {
      marginTop: '-2000px !important',
    },
    '&$.open': {
      transformOrigin: 'center center !important',
      transform: 'rotateY( 180deg ) !important',
      '& span': {
        '&:after': {
          content: 'attr(data-title)',
          transform: 'rotateY( 180deg )',
          fontSize: '40px',
          display: 'block',
        },
      },
    },
    '&$.opened': {
      backgroundImage: 'none',
    },
  },
  pactSpread: {
    height: '470px',
    marginLeft: '130px',
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      padding: '0',
      width: '100%',
      flexWrap: 'wrap',
      marginLeft: 0,
    },
    '& .card': {
      [theme.breakpoints.down('xs')]: {
        width: '60px',
        height: '83px',
        borderRadius: '5px',
        transform: 'unset !important',
        position: 'initial',
        display: 'block',
        transformOrigin: 'unset',
        margin: '3px',
      },
    },
  },
  cardSelectInfo: {
    color: theme.palette.background.highlight,
  },
  formLabel: {
    '& .MuiTypography-body1': {
      fontSize: '0.8rem',
    },
  },
  arabicFont: {
    fontFamily: theme.fonts.arabic,
  },
  '@keyframes shuffle': {
    '0%': {
      marginLeft: 0,
    },
    '50%': {
      marginLeft: '200px',
    },
    '100%': {
      marginLeft: 0,
    },
  },

  '@keyframes sellected': {
    '0%': {
      transform: 'rotate(360deg) !important',
      zIndex: '80 !important',
    },
    '50%': {
      bottom: '-500px !important',
    },
    '100%': {
      bottom: '-500px',
    },
  },
}))
