import React, { useEffect } from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme, darkTheme } from './theme/main'
import { useDarkMode } from './hooks/useDarkMode'

import AppLayout from './layout/AppLayout'
import ErrorNotification from './components/Error/ErrorNotification'
import Notification from './components/Notification/Notification'
import Landing from './containers/Landing/Landing'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout'
import Cards from './containers/Cards/Cards'
import Reads from './containers/Reads/Reads'
import MyReads from './containers/MyReads/MyReads'
import Spread from './containers/Spread/Spread'
import EditCard from './containers/EditCard/EditCard'
import Users from './containers/Users/Users'
import CustomReader from './containers/CustomRead/CustomReader'
import Reader from './containers/Reader/Reader'
import Support from './containers/SupportUs/SupportUs'
import Philosophy from './containers/Pages/Philosophy'
import History from './containers/Pages/History'
import Learn from './containers/Pages/Learn'

import PrivateRoute from './hoc/privateRoute'

import ProvideLanguage from './hooks/useLang'

import ProvideAuth from './hooks/use-auth'

import * as vars from './utilities/appVars'

const App = () => {
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  useEffect(() => {
    document.title = 'El-Tarot'
  }, []);

  return (
    <MuiThemeProvider theme={themeMode}>
      <CssBaseline />
      <>
        <ProvideLanguage>
          <ProvideAuth>
            <ErrorNotification />
            <Notification />
            <AppLayout toggleTheme={toggleTheme} theme={theme}>
              <Switch>
                <Route path="/" component={props => <Landing {...props} />} exact />
                <Route path={vars.AUTH_PAGE} component={props => <Auth {...props} />} />
                <Route path="/logout" component={props => <Logout {...props} />} />
                <Route path="/support" component={props => <Support {...props} />} />
                <Route path="/philosophy" component={props => <Philosophy {...props} />} />
                <Route path="/history" component={props => <History {...props} />} />
                <Route path="/learn" component={props => <Learn {...props} />} />
                <Route path="/cards" component={props => <Cards {...props} />} exact />
                <PrivateRoute path="/cards/:cardId/edit" component={EditCard} allow={['admin']} />
                <PrivateRoute path="/reads/:readRef" component={Spread} />
                <PrivateRoute path="/reads" component={Reads} />
                <PrivateRoute path="/customRead/:readRef" component={CustomReader} />
                <PrivateRoute path="/customRead" render={props => <Reads custom {...props} />} />
                <PrivateRoute path="/reader" component={Reader} />
                <PrivateRoute path="/myReads" component={MyReads} />
                <PrivateRoute path="/users" component={Users} allow={['superAdmin']} />
                <Redirect to="/dfsdf" />
              </Switch>
            </AppLayout>
          </ProvideAuth>
        </ProvideLanguage>
      </>
    </MuiThemeProvider>
  )
}

export default App
