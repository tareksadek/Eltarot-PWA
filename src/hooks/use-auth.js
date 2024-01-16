import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'

import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'

import LoadingBackdrop from '../components/Loading/LoadingBackdrop'

import * as vars from '../utilities/appVars'

import { firebaseApp } from '../API/firebase'
import { createUser } from '../API/users'

const authContext = createContext()

export const useAuth = () => useContext(authContext)

const useProvideAuth = () => {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [emailVerified, setEmailVerified] = useState(false)
  const [verifyEmailSent, setVerifyEmailSent] = useState(false)
  const [authStatus, setAuthStatus] = useState('starting')
  const [adminStatus, setAdminStatus] = useState(false)
  const [superAdminStatus, setSuperAdminStatus] = useState(false)
  const [subscriberStatus, setSubscriberStatus] = useState(false)
  const [authRedirectPath, setAuthRedirectPath] = useState(vars.LOGIN_REDIRECT)

  const authenticate = () => firebaseApp.auth().onAuthStateChanged(authUser => {
    if (authUser) {
      // const userData = {
      //   email: user.email,
      //   name: user.displayName,
      //   picture: user.photoURL,
      //   userId: user.uid,
      // }
      setUser(authUser)
      return authUser
    }

    return false
  })

  const logout = () => firebaseApp.auth().signOut().then(() => {
    setUser(null)
    setAuthStatus('starting')
    setAdminStatus(false)
    setSuperAdminStatus(false)
    setSubscriberStatus(false)
  })

  const resendVerificationEmail = () => {
    firebaseApp.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        try {
          await authUser.sendEmailVerification()
          setVerifyEmailSent(false)
        } catch (err) {
          throw new Error(err.message)
        }
      }
    })
  }

  const refreshToken = async () => {
    try {
      await firebaseApp.auth().currentUser.getIdToken(true)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  useEffect(() => {
    setAuthStatus('processing')
    setAuthRedirectPath(history.location.pathname)
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        try {
          const userExists = await createUser(authUser.uid, authUser.email)
          const idToken = await authUser.getIdTokenResult()
          const tokenClaims = idToken.claims.claims
          if (!userExists && authUser.providerData[0].providerId === 'password' && !authUser.emailVerified) {
            setEmailVerified(false)
            setUser(authUser)
            setAuthStatus('failed')
            setAdminStatus(false)
            setSuperAdminStatus(false)
            setSubscriberStatus(false)
            setVerifyEmailSent(false)
            await authUser.sendEmailVerification()
            return
          }

          if (userExists && authUser.providerData[0].providerId === 'password' && !authUser.emailVerified) {
            setEmailVerified(false)
            setUser(authUser)
            setAuthStatus('failed')
            setAdminStatus(false)
            setSuperAdminStatus(false)
            setSubscriberStatus(false)
            setVerifyEmailSent(true)
            return
          }
          setUser(authUser)
          setAdminStatus(tokenClaims ? tokenClaims.admin : false)
          setSuperAdminStatus(tokenClaims ? tokenClaims.superAdmin : false)
          setSubscriberStatus(tokenClaims ? tokenClaims.subscriber : false)
          setEmailVerified(true)
          setAuthStatus('loggedin')
          setVerifyEmailSent(true)
          history.push(authRedirectPath === vars.AUTH_PAGE ? vars.LOGIN_REDIRECT : authRedirectPath)
        } catch (err) {
          throw new Error(err.message)
        }
      } else {
        setUser(null)
        setAuthStatus('failed')
      }
    });

    return () => unsubscribe();
  }, [history, authRedirectPath]);

  return {
    user,
    emailVerified,
    verifyEmailSent,
    authStatus,
    adminStatus,
    superAdminStatus,
    subscriberStatus,
    authenticate,
    resendVerificationEmail,
    refreshToken,
    logout,
  }
}

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {auth.authStatus === 'processing' && <LoadingBackdrop />}
      {children}
    </authContext.Provider>
  )
}

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProvideAuth
