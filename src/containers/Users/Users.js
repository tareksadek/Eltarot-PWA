import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'

import { getAllUsers, setUserClaims } from '../../API/users'
import { useAuth } from '../../hooks/use-auth'
import { dbFunctions } from '../../API/firebase'
import UsersList from '../../components/Users/UsersList'

import * as vars from '../../utilities/appVars'

const Users = () => {
  const [users, setUsers] = useState(null)
  const [processingRequest, setProcessingRequest] = useState(false)
  const auth = useAuth()
  const history = useHistory()

  useEffect(() => {
    let mounted = true
    let { user } = auth
    const { superAdminStatus } = auth

    if (mounted) {
      (async () => {
        if (user) {
          if (superAdminStatus) {
            const allUsers = await getAllUsers(auth.user.email);
            setUsers(allUsers)
          } else {
            history.push(vars.LOGIN_REDIRECT)
          }
        }
      })()
    }

    return () => {
      mounted = false
      user = null
    }
  }, [auth, history])

  const makeAdminHandler = async email => {
    setProcessingRequest(true)
    const addAdminRole = dbFunctions.httpsCallable('addAdminRole')
    try {
      const res = await addAdminRole({ email })
      setProcessingRequest(false)
      return res.data.message
    } catch (err) {
      setProcessingRequest(false)
      throw new Error(err)
    }
  }

  const disableAdminHandler = async email => {
    setProcessingRequest(true)
    const disableAdminRole = dbFunctions.httpsCallable('disableAdminRole')
    try {
      const res = await disableAdminRole({ email })
      setProcessingRequest(false)
      return res.data.message
    } catch (err) {
      setProcessingRequest(false)
      throw new Error(err)
    }
  }

  const changeUserClaim = (userId, claim) => {
    setUserClaims(userId, claim)
  }

  const makeSubscriberHandler = async email => {
    setProcessingRequest(true)
    const addSubscriberRole = dbFunctions.httpsCallable('addSubscriberRole')
    try {
      const res = await addSubscriberRole({ email })
      setProcessingRequest(false)
      return res.data.message
    } catch (err) {
      setProcessingRequest(false)
      throw new Error(err)
    }
  }

  const disableSubscriberHandler = async email => {
    setProcessingRequest(true)
    const disableSubscriberRole = dbFunctions.httpsCallable('disableSubscriberRole')
    try {
      const res = await disableSubscriberRole({ email })
      setProcessingRequest(false)
      return res.data.message
    } catch (err) {
      setProcessingRequest(false)
      throw new Error(err)
    }
  }

  return (
    <Box mx="auto" mt={5} mb={5}>
      <UsersList
        users={users}
        makeAdmin={makeAdminHandler}
        disableAdmin={disableAdminHandler}
        changeUserClaim={changeUserClaim}
        makeSubscriber={makeSubscriberHandler}
        disableSubscriber={disableSubscriberHandler}
        processingRequest={processingRequest}
      />
    </Box>
  )
}

export default Users
