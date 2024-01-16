import firebase from 'firebase'
import { db } from './firebase'

export const createUser = async (userId, email) => {
  try {
    const user = await db.collection('users').doc(userId).get()
    if (!user.exists) {
      db.collection('users').doc(userId).set({
        email,
        userId,
        claims: {},
        reads: [],
      })
    }
    return user.exists
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getAllUsers = async superAdminEmail => {
  let allUsers = []

  try {
    const users = await db.collection('users').get()
    if (users.empty) {
      console.log('No matching documents.')
    } else {
      users.forEach(doc => {
        allUsers = [...allUsers, doc.data()]
      });
    }
  } catch (err) {
    throw new Error(err)
  }
  return allUsers.filter(user => user.email !== superAdminEmail)
}

export const setUserClaims = async (userId, claim) => {
  try {
    const user = await db.collection('users').doc(userId).get()
    const userClaims = user.data().claims
    await db.collection('users').doc(userId).update({ claims: { ...userClaims, ...claim } })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const saveRead = async (userId, read) => {
  try {
    // const user = await db.collection('users').doc(userId).get()
    // const userReads = user.data().reads
    // await db.collection('users').doc(userId).update({ reads: [...userReads, read] })
    await db.collection('users').doc(userId).update({
      reads: firebase.firestore.FieldValue.arrayUnion(read),
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const removeRead = async (userId, read) => {
  try {
    await db.collection('users').doc(userId).update({
      reads: firebase.firestore.FieldValue.arrayRemove(read),
    })
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getSavedReads = async userId => {
  let userReads

  try {
    const user = await db.collection('users').doc(userId).get()
    userReads = user.data().reads.sort((a, b) => ((a.date > b.date) ? 1 : -1))
  } catch (err) {
    throw new Error(err)
  }

  return userReads
}

export const getReadByDate = async (userId, readDate) => {
  try {
    const user = await db.collection('users').doc(userId).get()
    const userReads = user.data().reads
    return userReads.filter(read => read.date === readDate)
  } catch (err) {
    throw new Error(err.message)
  }
}
