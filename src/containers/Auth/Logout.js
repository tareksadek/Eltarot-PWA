import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useAuth } from '../../hooks/use-auth'

const Logout = () => {
  const auth = useAuth()

  useEffect(() => {
    auth.logout()
  }, [auth])

  return <Redirect to="/" />
}

export default Logout
