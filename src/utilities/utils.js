import React from 'react'

import DashboardIcon from '@material-ui/icons/Dashboard'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import LayersIcon from '@material-ui/icons/Layers'
import LensIcon from '@material-ui/icons/Lens'

import {
  MajorIcon, CupsIcon, SwordsIcon, PentaclesIcon, WandsIcon,
} from '../layout/CustomIcons'

export const updateObj = (oldObj, updatedProps) => ({
  ...oldObj,
  ...updatedProps,
})

export const shuffleArray = array => {
  const adjustedArray = array
  let currentIndex = adjustedArray.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = adjustedArray[currentIndex];
    adjustedArray[currentIndex] = adjustedArray[randomIndex];
    adjustedArray[randomIndex] = temporaryValue;
  }

  return adjustedArray
}

export const customIcons = (suitName, color, size, className) => {
  switch (suitName) {
    case 'swords': return <SwordsIcon color={color} fontSize={size || null} className={className || null} />
    case 'pentacles': return <PentaclesIcon color={color} fontSize={size || null} className={className || null} />
    case 'wands': return <WandsIcon color={color} fontSize={size || null} className={className || null} />
    case 'cups': return <CupsIcon color={color} fontSize={size || null} className={className || null} />
    default: return <MajorIcon color={color} fontSize={size || null} className={className || null} />
  }
}

export const navIcons = (linkFor, color, size, className) => {
  switch (linkFor) {
    case 'cardsList': return <LayersIcon color={color} fontSize={size || null} className={className || null} />
    case 'readsList': return <DashboardIcon color={color} fontSize={size || null} className={className || null} />
    case 'customRead': return <AddToPhotosIcon color={color} fontSize={size || null} className={className || null} />
    default: return <LensIcon color={color} fontSize={size || null} className={className || null} />
  }
}
