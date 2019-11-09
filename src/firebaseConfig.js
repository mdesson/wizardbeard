import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// note: Not secret, firebase api keys are public by default, and must run clientside
const firebaseConfig = {
  apiKey: 'AIzaSyC5GpQmo3KOM_ZHhXygAZAJJASg0RNWtxE',
  authDomain: 'wizardbeard-73dbf.firebaseapp.com',
  databaseURL: 'https://wizardbeard-73dbf.firebaseio.com',
  projectId: 'wizardbeard-73dbf',
  storageBucket: 'wizardbeard-73dbf.appspot.com',
  messagingSenderId: '62817658947',
  appId: '1:62817658947:web:dc8e87a653519d3cc90cf6',
  measurementId: 'G-7BSV9EX3RP'
}

firebase.initializeApp(firebaseConfig)

// set language for OAuth
firebase.auth().languageCode = 'en'
firebase.auth().useDeviceLanguage()

// firestore
export const db = firebase.firestore()

// Google OAuth
export const provider = new firebase.auth.GoogleAuthProvider()

// Auth
export const auth = firebase.auth()

export default firebase
