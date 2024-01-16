import { createMuiTheme } from '@material-ui/core/styles'

const globalTheme = {
  fonts: {
    arabic: 'Cairo',
    cardTitle: {
      en: {
        family: 'Berkshire Swash',
      },
      ar: {
        family: 'Reem Kufi',
      },
    },
  },
  typography: {
    h2: {
      '@media (max-width:992px)': {
        fontSize: '3rem',
      },
    },
  },
  palette: {
    background: {
      highlight: '#B14E17',
    },
  },
  dialogSpacing: 100,
  overrides: {
    MuiTypography: {
      body1: {
        lineHeight: '1.8',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        boxShadow: '0 0 0 transparent',
      },
    },
    MuiDivider: {
      root: {
        margin: '6em',
        opacity: '0.2',
      },
    },
    MuiFab: {
      root: {
        marginRight: '10px',
      },
    },
    MuiCard: {
      root: {
        borderRadius: 0,
        boxShadow: '0 0 0 transparent',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&.Mui-selected': {
          color: '#B14E17',
        },
      },
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: '8px',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiGrid: {
      container: {
        '&$spacing-xs-3': {
          margin: '0 auto',
          width: '100%',
          '& $item': {
            padding: 3,
          },
        },
      },
    },
    MuiMenu: {
      paper: {
        borderRadius: 0,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '30px',
      },
    },
  },
}

export const lightTheme = createMuiTheme({
  name: 'light',
  typography: {
    fontFamily: 'Open Sans',
  },
  palette: {
    background: {
      default: '#f3f0ea',
      reverse: '#303131',
    },
    action: {
      disabledBackground: 'rgba(48, 49, 49, 0.26)',
      disabled: 'rgba(48, 49, 49, 0.26)',
    },
    text: {
      primary: '#303131',
      secondary: '#f3f0ea',
    },
    primary: { main: '#303131' },
    secondary: { main: '#f3f0ea' },
  },
  links: {
    color: '#303131',
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#f3f0ea',
        color: '#303131',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#303131',
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#303131',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#303131',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#303131',
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: 'rgba(243, 240, 234, 0.11)',
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#303131',
        '&$selected': {
          color: '#f3f0ea',
          backgroundColor: '#303131',
        },
      },
      page: {
        '&$selected': {
          color: '#f3f0ea',
          backgroundColor: '#303131',
        },
      },
      outlined: {
        border: '1px solid rgba(48, 49, 49, 0.26)',
      },
    },
    MuiInput: {
      root: {
        color: '#f3f0ea',
      },
    },
    MuiButton: {
      outlined: {
        borderColor: 'rgba(48, 49, 49, 0.26)',
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#303131',
        color: '#f3f0ea',
      },
    },
  },
}, globalTheme)

export const darkTheme = createMuiTheme({
  name: 'dark',
  typography: {
    fontFamily: 'Open Sans',
  },
  palette: {
    background: {
      default: '#303131',
      reverse: '#f3f0ea',
    },
    action: {
      disabledBackground: 'rgba(243, 240, 234, 0.26)',
      disabled: 'rgba(243, 240, 234, 0.26)',
    },
    text: {
      primary: '#f3f0ea',
      secondary: '#303131',
    },
    primary: { main: '#f3f0ea' },
    secondary: { main: '#303131' },
  },
  links: {
    color: '#f3f0ea',
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#303131',
        color: '#f3f0ea',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#f3f0ea',
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#303131',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#f3f0ea',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#f3f0ea',
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: 'rgba(48, 49, 49, 0.11)',
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#f3f0ea',
        '&$selected': {
          color: '#303131',
          backgroundColor: '#f3f0ea',
        },
      },
      page: {
        '&$selected': {
          color: '#303131',
          backgroundColor: '#f3f0ea',
        },
      },
      outlined: {
        border: '1px solid rgba(243, 240, 234, 0.26)',
      },
    },
    MuiInput: {
      root: {
        color: '#303131',
      },
    },
    MuiButton: {
      outlined: {
        borderColor: 'rgba(243, 240, 234, 0.26)',
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: '#f3f0ea',
        color: '#303131',
      },
    },
  },
}, globalTheme)
