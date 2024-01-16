import firebase from 'firebase'
import * as vars from '../utilities/appVars'

export const firebaseApp = firebase.initializeApp(vars.FIREBASE_CONFIG)

export const db = firebaseApp.firestore()

export const dbFunctions = firebase.functions()
