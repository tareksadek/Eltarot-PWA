import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Card, CardContent, CardActions, Button, CircularProgress, Typography,
} from '@material-ui/core'

import * as actions from '../../store/actions'

import { cardStyles } from './styles'

const UserCard = ({
  userInfo,
  makeAdmin,
  disableAdmin,
  changeUserClaim,
  makeSubscriber,
  disableSubscriber,
  onSetNotification,
  processingRequest,
}) => {
  const classes = cardStyles()
  const [isAdmin, setIsAdmin] = useState(userInfo.claims.admin)
  const [isSubscriber, setIsSubscriber] = useState(userInfo.claims.subscriber)
  const [adminChangeProgress, setAdminChangeProgress] = useState(false)
  const [subscriberChangeProgress, setSubscriberChangeProgress] = useState(false)

  const changeAdminStatusHandler = async () => {
    let changeMessage
    setAdminChangeProgress(true)
    try {
      if (isAdmin) {
        changeMessage = await disableAdmin(userInfo.email)
        await changeUserClaim(userInfo.userId, { admin: false })
        setIsAdmin(false)
      } else {
        changeMessage = await makeAdmin(userInfo.email)
        await changeUserClaim(userInfo.userId, { admin: true })
        setIsAdmin(true)
      }
      setAdminChangeProgress(false)
      onSetNotification({
        message: changeMessage.body,
        type: changeMessage.type,
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  const changeSubscriberStatusHandler = async () => {
    let changeMessage
    setSubscriberChangeProgress(true)
    try {
      if (isSubscriber) {
        changeMessage = await disableSubscriber(userInfo.email)
        await changeUserClaim(userInfo.userId, { subscriber: false })
        setIsSubscriber(false)
      } else {
        changeMessage = await makeSubscriber(userInfo.email)
        await changeUserClaim(userInfo.userId, { subscriber: true })
        setIsSubscriber(true)
      }
      setSubscriberChangeProgress(false)
      onSetNotification({
        message: changeMessage.body,
        type: changeMessage.type,
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Card
      classes={{
        root: classes.root,
      }}
      className={classes.root}
    >
      <CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userInfo.email}
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        {adminChangeProgress
          ? <CircularProgress size={20} />
          : (
            <Button size="small" color="secondary" disabled={processingRequest} onClick={changeAdminStatusHandler}>
              {isAdmin ? 'Disable admin' : 'Make admin'}
            </Button>
          )}
        {subscriberChangeProgress
          ? <CircularProgress size={20} />
          : (
            <Button size="small" color="secondary" disabled={processingRequest} onClick={changeSubscriberStatusHandler}>
              {isSubscriber ? 'Disable Subscriber' : 'Make Subscriber'}
            </Button>
          )}
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

UserCard.defaultProps = {
  userInfo: null,
  processingRequest: false,
}

UserCard.propTypes = {
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  makeAdmin: PropTypes.func.isRequired,
  disableAdmin: PropTypes.func.isRequired,
  makeSubscriber: PropTypes.func.isRequired,
  disableSubscriber: PropTypes.func.isRequired,
  changeUserClaim: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  processingRequest: PropTypes.bool,
}

export default connect(null, mapDispatchToProps)(UserCard)
