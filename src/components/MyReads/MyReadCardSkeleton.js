import React from 'react'

import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const MyReadCardSkeleton = () => (
  <ListItem>
    <ListItemAvatar>
      <Skeleton animation="wave" variant="circle" width={20} height={20} />
    </ListItemAvatar>
    <ListItemText
      primary={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 3 }} />}
      secondary={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 3 }} />}
    />
  </ListItem>
)

export default MyReadCardSkeleton
