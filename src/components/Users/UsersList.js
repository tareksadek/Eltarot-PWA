import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { listStyles } from './styles'

import UserCard from './UserCard'
import UserCardSkeleton from './UserCardSkeleton'

const UsersList = ({
  users,
  makeAdmin,
  disableAdmin,
  makeSubscriber,
  disableSubscriber,
  changeUserClaim,
  processingRequest,
}) => {
  const classes = listStyles()

  const createUsersList = () => {
    let usersList = []
    if (users) {
      usersList = users.map(user => (
        <Grid item lg={3} sm={4} xs={6} key={user.email}>
          <UserCard
            userInfo={user}
            makeAdmin={makeAdmin}
            disableAdmin={disableAdmin}
            makeSubscriber={makeSubscriber}
            disableSubscriber={disableSubscriber}
            changeUserClaim={changeUserClaim}
            processingRequest={processingRequest}
          />
        </Grid>
      ))
    } else {
      usersList = [...Array(12)].map(() => (
        <Grid item lg={3} sm={4} xs={6} key={Math.floor(Math.random() * 1000000)}><UserCardSkeleton /></Grid>
      ))
    }

    return usersList
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {createUsersList()}
      </Grid>
    </div>
  )
}

UsersList.defaultProps = {
  users: null,
  processingRequest: false,
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  makeAdmin: PropTypes.func.isRequired,
  disableAdmin: PropTypes.func.isRequired,
  makeSubscriber: PropTypes.func.isRequired,
  disableSubscriber: PropTypes.func.isRequired,
  changeUserClaim: PropTypes.func.isRequired,
  processingRequest: PropTypes.bool,
}

export default UsersList
